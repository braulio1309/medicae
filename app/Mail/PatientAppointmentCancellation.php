<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PatientAppointmentCancellation extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Reservation $appointment)
    {
        $this->appointment = $appointment;
    }

    public function build()
    {
        return $this->markdown('emails.patientAppointmentCancellation')
            ->with('appointment', $this->appointment)
            ->subject('Cita cancelada');
    }
}
