<?php

namespace Drupal\ljarestapi\Controller;

use Drupal\Core\Controller\ControllerBase;

class CertificatesController extends ControllerBase {

    public function form() {

        return array(
            '#theme' => 'certificates',
            '#variables' => array(
                'test' => 'dasdsa'
            )
        );

    }

    private $apiUrl = 'https://dmz-api-01.lja.lv:5443/app_dev.php/api/';
    private $apiToken = '2f75a1f6fc5cc4ffa3c43b1199ee303c';

    public function getCertificate($certificateNumber, $name, $surname)
    {
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $certificateNumber . '/certificate.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');                                                              
        return $response;
    }
    
    public function getCertificateAndEndrosement($certificateNumber, $endorsementNumber, $name, $surname)
    {
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $certificateNumber . '/certificates/' . $endorsementNumber . '/endorsement.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function getEndorsement($endorsementNumber, $name, $surname)
    {
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $endorsementNumber . '/endorsement.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function requestApi($url) {

//        print_r($url); die();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);                                                                                            
        curl_setopt($ch, CURLOPT_VERBOSE, 1);                                       
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);                                                 

        $headers = [
            'apitoken: ' . $this->apiToken
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $server_output = curl_exec($ch);

        curl_close($ch);

        return $server_output;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    }

}