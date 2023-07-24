<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DoctorAppointmentNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Reservation $appointment)
    {
        $this->appointment = $appointment;
    }

    public function build()
    {
        return $this->markdown('emails.doctorAppointmentNotification')
            ->subject('Se ha agendado una cita con usted');
    }
}
