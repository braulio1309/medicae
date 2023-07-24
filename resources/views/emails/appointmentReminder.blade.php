@component('mail::message')
# Recordatorio de cita

Estimado(a) {{ $recipient->name }},

Este es un recordatorio de que tienes una cita programada para el día {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }} a la hora {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }} 

Detalles de la cita:
- Paciente: {{ $appointment->patient->firstname.' '.$appointment->patient->lastname }}
- Doctor: {{ $appointment->appointment->doctor->firstname.' '.$appointment->appointment->doctor->lastname }}

Por favor, asegúrate de estar presente a tiempo para tu cita.

¡Gracias!

Atentamente,
{{ config('app.name') }}
@endcomponent
