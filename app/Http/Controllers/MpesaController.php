<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SmoDav\Mpesa\Laravel\Facades\Registrar;

class MpesaController extends Controller
{
    
    function config(){
        $conf = 'http://example.com/mpesa/confirm?secret=some_secret_hash_key';
        $val = 'http://example.com/mpesa/validate?secret=some_secret_hash_key';
    
        $response = Registrar::register(600000)
            ->onConfirmation($conf)
            ->onValidation($val)
            ->submit();
        
        /****** OR ********/
        $response = Registrar::submit(600000, $conf, $val);
    }


    public function generateAcessToken(){
        $consumer_key = env('CONSUMER_KEY');
        $consumer_secret=env('CONSUMER_SECRET');
        $credentials= base64_decode($consumer_key.":".$consumer_secret);
        $url = "https://api.sfaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL, $url);
        curl_setopt($curl,CURLOPT_HTTPHEADER, array("Authorization: Basic ".$credentials));
        curl_setopt($curl,CURLOPT_HEADER, false);

    }

    
}
