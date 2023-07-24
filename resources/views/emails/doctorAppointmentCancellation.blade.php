@component('mail::message')
# Cancelación de Cita

Estimado(a) Dr./Dra. {{ $appointment->appointment->doctor->firstname.' '.$appointment->appointment->doctor->lastname }},

Lamentamos informarle que la siguiente cita ha sido cancelada:

- Paciente: {{ $appointment->patient->firstname.' '.$appointment->patient->lastname }}
- Fecha: {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }}.
- Hora: {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Por favor, tenga en cuenta esta cancelación en su agenda.

Gracias por su comprensión.

Atentamente,
{{ config('app.name') }}
@endcomponent
