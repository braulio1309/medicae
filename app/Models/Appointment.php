<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class Appointment extends Model
{

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id', 'userId', 'day', 'time', 'status'
    ];

    public function doctor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getAppointmentsByDuration($duration, $hours, $day){
        $startHour = $hours['startHour'];
        $finalHour = $hours['finalHour'];
        $startHourRest = $hours['startHourRest'];
        $finalHourRest = $hours['finalHourRest'];
        
        $format = "Y-m-d\TH:i:s.v\Z";
        $startHour = Carbon::createFromFormat($format, $startHour);
        $finalHour = Carbon::createFromFormat($format, $finalHour);
        $startHourRest = Carbon::createFromFormat($format, $startHourRest);
        $finalHourRest = Carbon::createFromFormat($format, $finalHourRest);
        
        $dates = [];

        if ($startHour->lt($finalHour)) {
            $actualHour = $startHour->copy();
        
            while ($actualHour->lt($finalHour)) {
                // Agregar la cita solo si está fuera del rango de descanso
                if ($actualHour->lt($startHourRest) || $actualHour->gte($finalHourRest->copy()->subMinutes($duration))) {
                    // Agregar la cita en el formato que desees (puedes ajustar esto según tus necesidades)
                    $date = [
                        'time' => $actualHour->format('H:i'),
                        'duration' => $duration,
                        'day' => $day,
                        'userId' => Auth::user()->id
                    ];
        
                    Appointment::create($date);
        
                    $dates[] = $date;
                }
        
                // Avanzar a la siguiente hora para la siguiente cita
                $actualHour->addMinutes($duration);
            }

            Appointment::create([
                'time' => $startHourRest->format('H:i'),
                'duration' => $duration,
                'day' => $day,
                'userId' => Auth::user()->id,
                'status' => 0
            ]);

            Appointment::create([
                'time' => $finalHourRest->format('H:i'),
                'duration' => $duration,
                'day' => $day,
                'userId' => Auth::user()->id,
                'status' => 0
            ]);
            

        }
        // Devolver las citas creadas 
        return $dates;
    }

}
