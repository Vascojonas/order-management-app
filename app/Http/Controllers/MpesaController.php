<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Paymentsds\MPesa\Client;
use Illuminate\Support\Facades\Validator;

class MpesaController extends Controller
{
    

    //Receive Money from mobile acount
    public function receiveMoney(Request $request){
        
        try {
            $validator = Validator::make($request->all(),[
                'from'=>'required|min:9',
                'valor'=>'required',
            ]);
    
            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validate_err'=> $validator->errors(),
                ]);
            }
            else
            {
               $privateKey="42i64czxc9tpb7v56fson0vfr7vfo7vc";

               $publicKey="MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==";
                        
            
               $client = new Client([
                   'apiKey' => $privateKey,             // API Key
                   'publicKey' => $publicKey,          // Public Key
                   'serviceProviderCode' =>171717 // Service Provider Code
                ]);
                
                $paymentData = [
                    'from' => '258'.$request->input('from'),       // Customer MSISDN
                    'reference' => '111PA2D',      // Third Party Reference
                    'transaction' => 'T12344C', // Transaction Reference
                    'amount' => $request->input('valor'),            // Amount
                ];

                try {
                    $result = $client->receive($paymentData);
                    //code...
                } catch (Exception $e) {
                    return response()->json([
                        'status'=> 422,
                        'validate_err'=> $e,
                    ]);
                }
                
                
                                
                    if ($result->success) {
                        return response()->json([
                            'status'=> 200,
                            'message'=>'Transaco efectuada com sucesso!',
                        ]);
                    } else {
                        return response()->json([
                            'status'=> 422,
                            'message'=>'erro',
                        ]);
                    }  
            }
        } catch (Exception $e) {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $e,
            ]);
        }

      
    }

    //sending money from mobile account
    public function sendMoney(){

        [$privateKey, $publicKey] = (new Spatie\Crypto\RsaKeyPair())->generate();
        $client = new Client([
            'apiKey' => $privateKey,             // API Key
            'publicKey' => $publicKey,          // Public Key
            'serviceProviderCode' => 20121231 
         ]);
         
         $paymentData = [
            'to' => '841234567',       // Customer MSISDN
            'reference' => '11114',      // Third Party Reference
            'transaction' => 'T12344CC', // Transaction Reference
            'amount' => '10'             // Amount
         ];
         
         $result = $client->send($paymentData);
         
         if ($result->success) {
            // Handle success scenario
         } else {
            // Handle failure scenario
         }
    }
    
    /*
    function config(){
        $conf = 'http://example.com/mpesa/confirm?secret=some_secret_hash_key';
        $val = 'http://example.com/mpesa/validate?secret=some_secret_hash_key';
    
        $response = Registrar::register(600000)
            ->onConfirmation($conf)
            ->onValidation($val)
            ->submit();
    
       // $response = Registrar::submit(600000, $conf, $val);
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
        */
    
}
