<?php

namespace App\Console\Commands;

use App\Mail\AppointmentReminder;
use App\Models\Reservation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendAppointmentReminders extends Command
{
    protected $signature = 'send:appointment-reminders';

    protected $description = 'Send appointment reminders to patients and doctors.';

    public function handle()
    {
        $appointments = Reservation::where('date', now()->addHour())->get();

        foreach ($appointments as $appointment) {
            // Envía el correo electrónico al paciente
            Mail::to($appointment->patient->email)
                ->send(new AppointmentReminder($appointment->patient, $appointment));

            // Envía el correo electrónico al doctor
            Mail::to($appointment->appointment->doctor->email)
                ->send(new AppointmentReminder($appointment->appointment->doctor, $appointment));
        }

        $this->info('Appointment reminders sent successfully.');
    }
}
