@component('mail::message')
# Notificación de Cita

Estimado(a) Dr./Dra. Braulio Zapata.

Se ha agendado una cita con usted para el día {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }} a la hora {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Detalles de la cita:
- Paciente: Admin Test
- Fecha: {{ \Carbon\Carbon::parse($appointment->date)->format("d-m-Y") }}.
- Hora: {{ \Carbon\Carbon::parse($appointment->date)->format('H:i') }}.

Por favor, asegúrese de estar disponible y preparado(a) para la cita.

¡Gracias!

Atentamente,
{{ config('app.name') }}
@endcomponent
