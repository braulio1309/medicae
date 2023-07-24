<?php

namespace App\Http\Controllers;

use App\Mail\DoctorAppointmentCancellation;
use App\Mail\PatientAppointmentCancellation;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getReservationsByCompany()
    {
        $data = Reservation::join('users', 'reservations.user_id', '=', 'users.id')
            ->where('users.user_id', '=', \Auth::user()->id)
            ->get();

        return response()->json([
            'data' => $data
        ]);
    }

    public function getReservationsByFisio()
    {
        $data = Reservation::join('appointments', 'reservations.turnId', '=', 'appointments.id')
            ->join('users', 'appointments.user_id', '=', 'users.id')
            ->where('users.id', '=', \Auth::user()->id)
            ->get();

        return response()->json([
            'data' => $data
        ]);
    }

    public function getReservationsTurn($id)
    {

        $data = Reservation::where('turnId', '=', $id)->select('date')->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function cancelReservation(Request $request)
    {
        //dd($request->all()['date']);
        $horaObjetivo = new \DateTime($request->all()['date']);

        // Obtener la fecha y hora actual
        $horaActual = new \DateTime();

        // Calcular la diferencia en minutos
        $intervalo = $horaActual->diff($horaObjetivo);
        $totalSegundosDiferencia = ($intervalo->days * 24 * 60 * 60) + ($intervalo->h * 60 * 60) + ($intervalo->i * 60) + $intervalo->s;

        // Verificar si quedan menos de 30 minutos
        if ($totalSegundosDiferencia < 1800) {
            return response()->json([
                'status' => 400,
                'msg' => 'error',
            ], 400);
        } 

        $reservation = Reservation::find($request->all()['turnId']);
        $reservation->canceled = 1;
        $reservation->save();

        // Envía el correo electrónico al doctor
        $doctor = $reservation->appointment->doctor;
        Mail::to($doctor->email)
            ->send(new DoctorAppointmentCancellation($reservation));

        // Envía el correo electrónico al paciente
        $patient = $reservation->patient;
        Mail::to($patient->email)
            ->send(new PatientAppointmentCancellation($reservation));

        return response()->json([
            'data' => 'Cancelada con exito'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function reserveAppointment(Request $request)
    {
        // Obtener los datos de la cita a reservar desde la solicitud HTTP
        $doctorId = $request->input('doctorId');
        $date = $request->input('date');
        $time = $request->input('time');

        // Verificar si la fecha aún está disponible
        $isAvailable = !Reservation::where('doctor_id', $doctorId)
            ->where('date', $date)
            ->where('canceled', false)
            ->exists();

        if ($isAvailable) {
            // Crear una nueva reserva
            $appointment = Appointment::where('doctor_id', $doctorId)
                ->where('day', strtolower(date('l', strtotime($date))))
                ->where('time', $time)
                ->first();

            if ($appointment) {
                $reservation = new Reservation();
                $reservation->appointment_id = $appointment->id;
                $reservation->date = $date;
                $reservation->user_id = auth()->user()->id;
                $reservation->canceled = false;
                $reservation->save();

                return response()->json(['success' => true, 'message' => 'Cita reservada exitosamente']);
            } else {
                return response()->json(['success' => false, 'message' => 'No se encontró la cita seleccionada']);
            }
        } else {
            return response()->json(['success' => false, 'message' => 'La fecha seleccionada ya ha sido reservada']);
        }
    }
}
