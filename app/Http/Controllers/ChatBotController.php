<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Models\User;

class ChatBotController extends Controller
{
    public function listenToReplies(Request $request)
    {
        $from = $request->input('From');
        $body =  trim($request->input('Body'));           
        
        /// Verificar si el usuario está registrado por su número de teléfono
        $user = User::where('phone', $from)->first();
       
        if(!$user) {
            // Usuario no registrado, esperar el saludo y solicitar información
            if (strpos(strtolower($body), 'hola') !== false || strpos(strtolower($body), 'saludos') !== false) {
                $message = "¡Hola! Parece que eres nuevo por aquí. Para registrarte, por favor envía tu información de la siguiente forma(sin comillas): 'Registro:Nombre, Apellido, Email' .";
            } else
                if(strpos(strtolower($body), 'registro:') !== false) {
                    $body = substr($body, 9);
                    list($name, $lastName, $email) = explode(',', $body);
                   
                    $user = new User();
                    $user->firstname = trim($name);
                    $user->lastname = trim($lastName);
                    $user->username = trim($name) . ' ' .trim($lastName);
                    $user->email = trim($email);
                    $user->phone = $from;
                    $user->statut = 1;
                    $user->save();
 
                    $message = "¡Hola, {$user->firstname}! Te has registrado correctamente en el chatbot.";
                }
        } else {
           
            $message = "¡Hola, {$user->firstname}! Bienvenido de vuelta al chatbot.";   
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