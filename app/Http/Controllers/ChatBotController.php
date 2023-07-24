<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Models\User;

class ChatBotController extends Controller
{
    public function listenToReplies(Request $request)
    {
        $from = $request->input('From');
        $body = $request->input('Body');            
        
        /// Verificar si el usuario está registrado por su número de teléfono
        $user = User::where('phone', $from)->first();

        if(!$user) {
            // Usuario no registrado, esperar el saludo y solicitar información
            if (strpos($body, 'hola') !== false || strpos($body, 'saludos') !== false) {
                $responseMessage = "¡Hola! Parece que eres nuevo por aquí. Para registrarte, por favor envía tu información de la siguiente forma(sin comillas): 'Registro:Nombre, Apellido, Email' .";
            } else
                if(strpos($body, 'Registro:') !== false) {
                // Si el usuario no saluda, pedirle que lo haga
                    list($name, $lastName, $email) = explode(',', $body);

                    $user = new User();
                    $user->name = trim($name);
                    $user->lastname = trim($lastName);
                    $user->username = trim($name) + ' ' +trim($lastName);
                    $user->email = trim($email);
                    $user->phone = $from;
                    $user->statut = 1;
                    $user->save();
        
                    $responseMessage = "¡Hola, {$user->name}! Te has registrado correctamente en el chatbot.";
                }
        } else {
            // Usuario registrado, dar la bienvenida
            $responseMessage = "¡Hola, {$user->name}! Bienvenido de vuelta al chatbot.";   
        }
        
        $this->sendWhatsAppMessage($responseMessage, $from);
           
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