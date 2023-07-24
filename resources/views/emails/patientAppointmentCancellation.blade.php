@component('mail::message')
# Cancelación de Cita

Estimado(a) Sr./Sra. {{ $appointment->patient->firstname.' '.$appointment->patient->lastname }},

Lamentamos informarle que su siguiente cita ha sido cancelada:

- Doctor: {{ $appointment->appointment->doctor->firstname.' '.$appointment->appointment->doctor->lastname }}
- Fecha: {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }}.
- Hora: {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Por favor, tenga en cuenta esta cancelación.

Gracias por su comprensión.

Atentamente,
{{ config('app.name') }}
@endcomponent
