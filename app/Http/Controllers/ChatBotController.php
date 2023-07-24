<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Twilio\Rest\Client;

class ChatBotController extends Controller
{
    public function listenToReplies(Request $request)
    {
        $from = $request->input('From');
        $body = $request->input('Body');            
            
        $message = 'hola registrado';
        $this->sendWhatsAppMessage($message, $from);
           
        
        return;
    }

    /**
     * Sends a WhatsApp message  to user using
     * @param string $message Body of sms
     * @param string $recipient Number of recipient
     */
    public function sendWhatsAppMessage($message)
    {
        $twilio_whatsapp_number = getenv('TWILIO_FROM');
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_TOKEN");

        $client = new Client($account_sid, $auth_token);
        return $client->messages->create("+584249287567", array('from' => "whatsapp:$twilio_whatsapp_number", 'body' => $message));
    }
}