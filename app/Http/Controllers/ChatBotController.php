<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ChatBotController extends Controller
{
    public function listenToReplies(Request $request)
    {
        $from = $request->input('From');
        $body = trim($request->input('Body'));

        // Verificar si el usuario está registrado por su número de teléfono
        $user = User::where('phone', $from)->first();


        if (!$user) {
            // Usuario no registrado, esperar el saludo
            if (strpos(strtolower($body), 'hola') !== false || strpos(strtolower($body), 'saludos') !== false) {
                $message = "¡Hola! Soy el chatbot Medicae. ¿Cómo puedo ayudarte hoy? Por favor, dime tu nombre y apellido para empezar.";
                $user = New User();
                $user->password =  Hash::make('1234');
                $user->role_id = 4;
                $user->phone = $from;
                $user->save();
            } else {
                $message = "¡Hola! Soy el chatbot Medicae. Para empezar, por favor saluda con 'Hola' o 'Saludos'.";
            }
        } else {
            
            if ($user->firstname == null) {
                // Usuario registrado pero sin nombre, separar nombre y apellido
                $nameParts = explode(' ', $body);
                
                if (count($nameParts) >= 2) {
                    // Se encontró al menos un espacio, separe el nombre y el apellido
                    $user->firstname = $nameParts[0];
                    $user->lastname = $nameParts[1];
                    $user->save();
                    $message = "Gracias, {$user->firstname}. Ahora, por favor, dime tu correo electrónico para completar tu registro.";
                   
                } else {
                    // No se encontró un espacio, solicitar nuevamente el nombre completo
                    $message = "Por favor, proporciona tu nombre completo (nombre y apellido) para continuar.";
                }

            } elseif ($user->email == null) {
                // Usuario registrado pero sin correo electrónico, solicitar el correo electrónico
                $user->email = $body;
                $user->save();
                //Quickreplies
                $message = "¡Gracias! Te has registrado correctamente en el chatbot médico. ¿Deseas agendar una cita con uno de nuestros doctores? Por favor, responde con 'Sí' o 'No'.";
            } else {
                // Usuario registrado con nombre y correo electrónico, responder a las consultas
                $message = "¡Hola, {$user->firstname}! ¿En qué puedo ayudarte hoy?";
                //Poner quickReplies quizas
                //Agendar
                if ($body === 'Sí') {
                    // El usuario quiere agendar una cita, preguntar por el nombre del doctor
                    $message = "Por favor, proporciona el nombre del doctor con el que deseas agendar.";
                    
                    // Guardar el estado actual del usuario para que pueda responder con el nombre del doctor
                    $user->update(['waiting_for_doctor' => true]);
        
                    $this->sendWhatsAppMessage($message, $from);
        
                    return;
                } elseif ($user->waiting_for_doctor) {
                    // El usuario proporcionó el nombre del doctor, buscar doctores por nombre (hasta 5 coincidencias)
                    $doctorName = $body;
                    $doctors = User::where('firstname', 'LIKE', "%{$doctorName}%")
                    ->where('role_id', 2)
                    ->take(5)
                    ->get();
        
                    if ($doctors->isEmpty()) {
                        // No se encontraron doctores con ese nombre
                        $message = "No se encontraron doctores con el nombre '{$doctorName}'. Por favor, intenta con otro nombre.";
                    } else {
                        // Mostrar opciones de doctores encontrados
                        $message = "Selecciona un doctor para agendar una cita:\n";
                        foreach ($doctors as $index => $doctor) {
                            $message .= ($index + 1) . ". {$doctor->firstname}\n";
                        }
        
                        // Guardar los doctores encontrados en el estado del usuario
                        $user->update(['doctor_options' => $doctors->pluck('id')->toArray()]);
                        $user->update(['waiting_for_doctor_selection' => true]);
                        $user->update(['waiting_for_doctor' => false]);
                    }
        
                    $this->sendWhatsAppMessage($message, $from);
        
                    return;
                } elseif ($user->waiting_for_doctor_selection) {

                    // El usuario seleccionó un doctor de la lista
                    $selectedDoctorIndex = (int) $body;
        
                    if ($selectedDoctorIndex >= 1 && $selectedDoctorIndex <= 5) {
                        $selectedDoctorName = $user->doctor_options[$selectedDoctorIndex - 1];
        
                        // Generar un enlace acortado para que el usuario haga la reserva
                         $longUrl = "https://medicae.tiendogs/app/dates/date2?id={$selectedDoctorName}";
                       // $shortUrl = $this->shortenUrl($longUrl);
        
                        // Enviar el enlace al usuario
                        $message = "Has seleccionado al Dr. {$selectedDoctorName}. Puedes hacer tu reserva en el siguiente enlace: {$longUrl}";

                        $this->sendWhatsAppMessage($message, $from);

                        // Restablecer el estado del usuario
                        $user->update(['waiting_for_doctor' => false]);
                        $user->update(['waiting_for_doctor_selection' => false]);
                        $user->update(['doctor_options' => null]);

        
                        return;
                    }
                }
            }
        }

        $this->sendWhatsAppMessage($message, $from);

        return;
    }


    /**
     * Sends a WhatsApp message  to user using
     * @param string $message Body of sms
     * @param string $recipient Number of recipient
     */
    public function sendWhatsAppMessage($message, $recipient)
    {
        $twilio_whatsapp_number = getenv('TWILIO_FROM');
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_TOKEN");

        $client = new Client($account_sid, $auth_token);
        return $client->messages->create( $recipient, array('from' => "whatsapp:$twilio_whatsapp_number", 'body' => $message));
    }
}