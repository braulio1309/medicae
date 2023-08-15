@component('mail::message')
# Notificación de Cita

Estimado(a) Sr./Sra. Braulio Zapata,

Usted ha agendado una cita para el día {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }} a la hora {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Detalles de la cita:
- Doctor: Braulio Zapata,
- Fecha: {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }}.
- Hora: {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Por favor, asegúrese de estar disponible y preparado(a) para la cita.

¡Gracias!

Atentamente,
{{ config('app.name') }}
@endcomponent
