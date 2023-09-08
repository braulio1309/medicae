<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $recipient;
    public $appointment;

    public function __construct($recipient, Reservation $appointment)
    {
        $this->recipient = $recipient;
        $this->appointment = $appointment;
    }

    public function build()
    {
        return $this->markdown('emails.appointmentReminder')
            ->with('appointment', $this->appointment)
            ->subject('Recordatorio de cita');
    }
}
