<?php

namespace App\Http\Controllers;

use App\Exports\ApoointmentExport;
use App\Models\Appointment;
use App\Models\Reservation;
use App\utils\helpers;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use App\Mail\DoctorAppointmentNotification;
use App\Mail\PatientAppointmentNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Hashids\Hashids;


class AppointmentsController extends BaseController
{

    //------------ Get ALL Apoointment --------------\\

    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Appointment::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'name', 1 => 'category_id', 2 => 'brand_id', 3 => 'code');
        $param = array(0 => 'like', 1 => '=', 2 => '=', 3 => 'like');
        $data = array();

        $appointments = Appointment::with('unit', 'category', 'brand')
            ->where('deleted_at', '=', null);

        //Multiple Filter
        $Filtred = $helpers->filter($appointments, $columns, $param, $request)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('products.name', 'LIKE', "%{$request->search}%")
                        ->orWhere('products.code', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $Filtred->count();
        $appointments = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($appointments as $appointment) {
            $item['id'] = $appointment->id;
            $item['code'] = $appointment->code;
            $item['name'] = $appointment->name;
            $item['category'] = $appointment['category']->name;
            $item['brand'] = $appointment['brand'] ? $appointment['brand']->name : 'N/D';
            $item['unit'] = $appointment['unit']->ShortName;
            $item['price'] = $appointment->price;


            $total_qty = 1;

            $item['quantity'] = $total_qty;

            $firstimage = explode(',', $appointment->image);
            $item['image'] = $firstimage[0];

            $data[] = $item;
        }

        return response()->json([
            'products' => $data,
            'totalRows' => $totalRows,
        ]);
    }

    public function getAvailableTurns()
    {
        return response()->json([
            'data' => Appointment::join('users', 'appointments.userId', '=', 'users.id')
                ->select('appointments.id as turnId', 'appointments.*', 'users.*')->get()
        ]);
    }

    public function reserveTurn(Request $request)
    {
        $data = $request->all();
        $turn = Appointment::where('id', '=', $data['turnId'])->first();
        if ($turn->status == 0) {
            return response()->json([
                'status' => 422,
                'msg' => 'Esta cita fue agendada',
            ], 422);
        }
        $reserva = Reservation::create([
            'user_id' => auth()->user()->id,
            'turnId' => $data['turnId'],
            'date' => $data['date'],
        ]);

        $turn->status = 0;
        $turn->save();
        //$doctor = $reserva->appointment->doctor;
        Mail::to('brauliozapataweb@gmail.com')
            ->send(new DoctorAppointmentNotification($reserva));

        // Envía el correo electrónico al paciente
        $patient = $reserva->patient;
        Mail::to($patient->email)
            ->send(new PatientAppointmentNotification($reserva));
        //Enviar whatsapp

        return response()->json(['success' => true]);
    }

    public function reserveTurn2(Request $request)
    {
        $data = $request->all();
        $hashids = new Hashids(1234578);

        $time = Appointment::find($request->input('turnId'))->time;
        $datetime = Carbon::parse($request->input('date'))->setTimeFromTimeString($time);
        $turn = Appointment::where('id', '=', $data['turnId'])->first();
        $turn->status = 0;
        $turn->save();
        $reserva = Reservation::create([
            'user_id' => $hashids->decode($data['patientId'])[0],
            'turnId' => $data['turnId'],
            'date' => $datetime->format('Y-m-d H:i:s'),
        ]);
        $doctor = $reserva->appointment->doctor;
        //Enviar whatsapp al doctor
        Mail::to($doctor->email)
            ->send(new DoctorAppointmentNotification($reserva));

        //Envía whatsapp al paciente
        $patient = $reserva->patient;
        Mail::to($patient->email)
            ->send(new PatientAppointmentNotification($reserva));

        return response()->json(['success' => true]);
    }
    //-------------- Store new  Product  ---------------\\

    public function getTurns(Request $request)
    {
        $userId = Auth::user()->id;

        $appointments = \DB::table('appointments')
            ->select('day', \DB::raw('MIN(CASE WHEN status = 1 THEN DATE_FORMAT(time, "%H:%i") END) as startHour'), \DB::raw('MAX(CASE WHEN status = 1 THEN DATE_FORMAT(time, "%H:%i") END) as finalHour'), \DB::raw('MIN(CASE WHEN status = 0 THEN DATE_FORMAT(time, "%H:%i") END) as startHourRest'), \DB::raw('MAX(CASE WHEN status = 0 THEN DATE_FORMAT(time, "%H:%i") END) as finalHourRest'))
            ->where('userId', $userId)
            ->where('appointments.userId', $userId)
            ->whereIn('status', [0, 1]) // Filtrar por status 0 y 1
            ->groupBy('day')
            ->orderBy('day', 'ASC')
            ->get();


        return response()->json(['turns' => $appointments]);
    }

    public function getLastReservation()
    {
        $user = Auth::user(); // Obtener el usuario logueado

        $lastThreeReservations = Reservation::join('appointments', 'reservations.turnId', '=', 'appointments.id')
        ->join('users', 'users.id', '=', 'reservations.user_id')
        ->select('reservations.*', 'users.*')
        ->orderBy('reservations.date', 'desc')
        ->where('appointments.userId', $user->id)
        ->limit(3)
        ->get();

        return response()->json(['data' => $lastThreeReservations]);
    }

    //-------------- Store new  Product  ---------------\\

    public function store(Request $request)
    {
        //$this->authorizeForUser($request->user('api'), 'create', Appointment::class);
        Appointment::where('userId', Auth::user()->id)->delete();
        $appointment = new Appointment();

        $hours = $request->all()['hours'];
        $duration = $request->all()['duration'];

        if (isset($hours['Lunes'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Lunes'][0], 'Lunes');

        if (isset($hours['Martes'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Martes'][0], 'Martes');

        if (isset($hours['Miercoles'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Miercoles'][0], 'Miercoles');

        if (isset($hours['Jueves'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Jueves'][0], 'Jueves');

        if (isset($hours['Viernes'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Viernes'][0], 'Viernes');

        if (isset($hours['Sabado'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Sabado'][0], 'Sabado');

        if (isset($hours['Domingo'][0]))
            $appointment->getAppointmentsByDuration(60, $hours['Domingo'][0], 'Domingo');

        return response()->json(['success' => true]);
    }
    //-------------- Update Product  ---------------\\
    //-----------------------------------------------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Appointment::class);
        try {
            $this->validate($request, [
                'code' => 'required|unique:appointments',
                'code' => Rule::unique('appointments')->ignore($id)->where(function ($query) {
                    return $query->where('deleted_at', '=', null);
                }),
                'name' => 'required',
                'Type_barcode' => 'required',
                'price' => 'required',
                'category_id' => 'required',
                'cost' => 'required',
                'unit_id' => 'required',
            ], [
                'code.unique' => 'This code already used. Generate Now',
                'code.required' => 'This field is required',
            ]);

            \DB::transaction(function () use ($request, $id) {

                $Product = Appointment::where('id', $id)
                    ->where('deleted_at', '=', null)
                    ->first();

                //-- Update Product
                $Product->name = $request['name'];
                $Product->code = $request['code'];
                $Product->Type_barcode = $request['Type_barcode'];
                $Product->price = $request['price'];
                $Product->category_id = $request['category_id'];
                $Product->brand_id = $request['brand_id'] == 'null' ? Null : $request['brand_id'];
                $Product->TaxNet = $request['TaxNet'];
                $Product->tax_method = $request['tax_method'];
                $Product->note = $request['note'];
                $Product->cost = $request['cost'];
                $Product->unit_id = $request['unit_id'];
                $Product->unit_sale_id = $request['unit_sale_id'] ? $request['unit_sale_id'] : $request['unit_id'];
                $Product->unit_purchase_id = $request['unit_purchase_id'] ? $request['unit_purchase_id'] : $request['unit_id'];
                $Product->stock_alert = $request['stock_alert'];
                $Product->is_variant = $request['is_variant'] == 'true' ? 1 : 0;

                $Product->save();
            }, 10);

            return response()->json(['success' => true]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 422,
                'msg' => 'error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    //-------------- Remove Product  ---------------\\
    //-----------------------------------------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Appointment::class);

        \DB::transaction(function () use ($id) {

            $Product = Appointment::findOrFail($id);
            $Product->deleted_at = Carbon::now();
            $Product->save();

            foreach (explode(',', $Product->image) as $img) {
                $pathIMG = public_path() . '/images/products/' . $img;
                if (file_exists($pathIMG)) {
                    if ($img != 'no-image.png') {
                        @unlink($pathIMG);
                    }
                }
            }
        }, 10);

        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Appointment::class);

        \DB::transaction(function () use ($request) {
            $selectedIds = $request->selectedIds;
            foreach ($selectedIds as $product_id) {

                $Product = Appointment::findOrFail($product_id);
                $Product->deleted_at = Carbon::now();
                $Product->save();

                foreach (explode(',', $Product->image) as $img) {
                    $pathIMG = public_path() . '/images/products/' . $img;
                    if (file_exists($pathIMG)) {
                        if ($img != 'no-image.png') {
                            @unlink($pathIMG);
                        }
                    }
                }
            }
        }, 10);

        return response()->json(['success' => true]);
    }

    //-------------- Export All Product to EXCEL  ---------------\\

    public function export_Excel(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Appointment::class);

        return Excel::download(new ApoointmentExport, 'List_Apoointment.xlsx');
    }

    //--------------  Show Product Details ---------------\\

    public function Get_Apoointment_Details(Request $request, $id)
    {

        $data = [];

        return response()->json($data[0]);
    }

    //------------ Get products By Warehouse -----------------\\

    public function Apoointment_by_Warehouse(request $request, $id)
    {
        $data = [];

        return response()->json($data);
    }

    //------------ Get product By ID -----------------\\

    public function show($id)
    {
        $data = [];

        return response()->json($data[0]);
    }


    //---------------- Show Form Create Product ---------------\\

    public function create(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'create', Appointment::class);

        $list = array(
            'mon' => array(
                'title' => 'Lun',
                'name' => 'Lunes',
            ),
            'tue' => array(
                'title' => 'Mar',
                'name' => 'Martes',
            ),
            'wed' => array(
                'title' => 'Mié',
                'name' => 'Miércoles',
            ),

            'thu' => array(
                'title' => 'Jue',
                'name' => 'Jueves',
            ),
            'fri' => array(
                'title' => 'Vie',
                'name' => 'Viernes'
            ),
            'sat' => array(
                'title' => 'Sáb',
                'name' => 'Sábado',
            ),
            'sun' => array(
                'title' => 'Dom',
                'name' => 'Domingo',
            ),
        );

        return response()->json([
            'days' => $list,
        ]);
    }

    //---------------- Show Form Edit Product ---------------\\

    public function edit(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'update', Appointment::class);

        $Product = Appointment::where('deleted_at', '=', null)->findOrFail($id);

        $item['id'] = $Product->id;
        $item['code'] = $Product->code;
        $item['Type_barcode'] = $Product->Type_barcode;
        $item['name'] = $Product->name;
        $item['tax_method'] = $Product->tax_method;
        $item['price'] = $Product->price;
        $item['cost'] = $Product->cost;
        $item['stock_alert'] = $Product->stock_alert;
        $item['TaxNet'] = $Product->TaxNet;
        $item['note'] = $Product->note ? $Product->note : '';
        $item['images'] = [];
        if ($Product->image != '' && $Product->image != 'no-image.png') {
            foreach (explode(',', $Product->image) as $img) {
                $path = public_path() . '/images/products/' . $img;
                if (file_exists($path)) {
                    $itemImg['name'] = $img;
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data = file_get_contents($path);
                    $itemImg['path'] = 'data:image/' . $type . ';base64,' . base64_encode($data);

                    $item['images'][] = $itemImg;
                }
            }
        } else {
            $item['images'] = [];
        }

        $data = $item;

        return response()->json([
            'product' => $data,
        ]);
    }

    // import Apoointment
    public function import_products(Request $request)
    {
        try {
            \DB::transaction(function () use ($request) {
                $file_upload = $request->file('products');
                $ext = pathinfo($file_upload->getClientOriginalName(), PATHINFO_EXTENSION);
                if ($ext != 'csv') {
                    return response()->json([
                        'msg' => 'must be in csv format',
                        'status' => false,
                    ]);
                } else {
                    $data = array();
                    $rowcount = 0;
                    if (($handle = fopen($file_upload, "r")) !== false) {

                        $max_line_length = defined('MAX_LINE_LENGTH') ? MAX_LINE_LENGTH : 10000;
                        $header = fgetcsv($handle, $max_line_length);
                        $header_colcount = count($header);
                        while (($row = fgetcsv($handle, $max_line_length)) !== false) {
                            $row_colcount = count($row);
                            if ($row_colcount == $header_colcount) {
                                $entry = array_combine($header, $row);
                                $data[] = $entry;
                            } else {
                                return null;
                            }
                            $rowcount++;
                        }
                        fclose($handle);
                    } else {
                        return null;
                    }
                }
            }, 10);
            return response()->json([
                'status' => true,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'msg' => 'error',
                'errors' => $e->errors(),
            ]);
        }
    }

    public function getAvailableTimes(Request $request)
    {
        $hashids = new Hashids(1234578);

        $doctorId = $request->input('doctorId');
        $doctorId = $hashids->decode($doctorId);
        $date = date('Y-m-d', strtotime($request->input('date')));
        // Obtener los horarios disponibles del doctor y fecha específicos
        $availableTimes = Appointment::where('appointments.userId', $doctorId)
            ->where('day', $this->getSpanishDay($date))
            ->leftJoin('reservations', function ($join) use ($date) {
                $join->on('appointments.id', '=', 'reservations.turnId')
                    ->where("reservations.date", 'like', '%' . $date . '%');
            })
            ->select('appointments.*', DB::raw('IF(reservations.id IS NULL, false , true) AS disabled'))
            ->get();

        return response()->json($availableTimes);
    }

    public function getReserved()
    {
        $reservationsOcupadas = DB::table('reservations')
            ->join('appointments', 'reservations.turnId', '=', 'appointments.id')
            ->join('users', 'reservations.user_id', '=', 'users.id')
            ->where('appointments.userId', auth()->user()->id)
            ->select('reservations.*', 'users.*', 'appointments.*')
            ->get();

        return  response()->json(['data' => $reservationsOcupadas]);
    }

    function getSpanishDay($date)
    {
        $englishDay = strtolower(date('l', strtotime($date)));

        switch ($englishDay) {
            case 'monday':
                return 'Lunes';
            case 'tuesday':
                return 'Martes';
            case 'wednesday':
                return 'Miercoles';
            case 'thursday':
                return 'Jueves';
            case 'friday':
                return 'Viernes';
            case 'saturday':
                return 'Sabado';
            case 'sunday':
                return 'Domingo';
            default:
                return '';
        }
    }

    public function checkAvailability(Request $request)
    {
        $doctorId = $request->input('doctorId');
        $date = $request->input('date');
        $time = Appointment::find($request->input('time'))->time;

        $datetime = Carbon::parse($date)->setTimeFromTimeString($time);

        // Verificar si la fecha específica ya ha sido reservada
        $isAvailable = !Reservation::where('user_id', $doctorId)
            ->where('date', $datetime->format('Y-m-d H:i:s'))
            ->where('canceled', false)
            ->exists();
        return response()->json(['isAvailable' => $isAvailable]);
    }

    public function getTodayTurns()
    {
        $today = Carbon::now()->format('Y-m-d');
        $userId = auth()->user()->id;

        $reservations = Reservation::join('appointments', 'appointments.id', '=', 'reservations.turnId')
            ->join('users', 'users.id', '=', 'reservations.user_id')
            ->where('appointments.userId', $userId)
            ->whereDate('reservations.date',  Carbon::today()->toDateString())
            ->get();
        //dd($reservations);
        return response()->json(['turns' => $reservations]);
    }
}
