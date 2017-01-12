<?php

namespace Drupal\ljarestapi\Controller;

use Drupal\Core\Controller\ControllerBase;

class CertificatesController extends ControllerBase {

    public function form() {

        $config = $this->config('lja.settings');

        return array(
            '#theme' => 'certificates',
            '#variables' => array(
                'texts' => $config->get('texts'),
                'captcha_key' => $config->get('captcha')['public_key'],
                'timestamp' => time(),
                'time' => date()
            ),
            '#attached' => array(
                'drupalSettings' => array(
                    'ljarestapi' => array(
                        'texts' => $config->get('texts'),
                        'captcha_key' => $config->get('captcha')['public_key']
                    )
                )
            )
        );

    }

    private $apiUrl = 'https://dmz-api-01.lja.lv:5443/app_dev.php/api/';
    private $apiToken = '2f75a1f6fc5cc4ffa3c43b1199ee303c';

    public function getCertificate($certificateNumber, $name, $surname)
    {
        if(!$this->validateCaptcha()) {
            return $this->captchaInvalidResponse();
        }
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $certificateNumber . '/certificate.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    
    public function getCertificateAndEndrosement($certificateNumber, $endorsementNumber, $name, $surname)
    {
        if(!$this->validateCaptcha()) {
            return $this->captchaInvalidResponse();
        }
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $certificateNumber . '/certificates/' . $endorsementNumber . '/endorsement.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function getEndorsement($endorsementNumber, $name, $surname)
    {
        if(!$this->validateCaptcha()) {
            return $this->captchaInvalidResponse();
        }
        $response = $this->requestApi($this->apiUrl . 'certificates/' . $name . '/names/' . $surname . '/surnames/' . $endorsementNumber . '/endorsement.json');
        if(!$response) $response = [];
        $response = new \Symfony\Component\HttpFoundation\Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function validateCaptcha() {

        $config = $this->config('lja.settings');
        $secretKey = $config->get('captcha')['secret_key'];

        if(!$secretKey) {
            return true;
        }

        if(isset($_GET['captcha']) && $_GET['captcha']) {
            $recaptcha = new \ReCaptcha\ReCaptcha($secretKey);
            if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                $ip = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } else {
                $ip = $_SERVER['REMOTE_ADDR'];
            }
            $resp = $recaptcha->verify($_GET['captcha'], $ip);
            if ($resp->isSuccess()) {
                return true;
            }
        }

        return false;

    }

    private function captchaInvalidResponse() {
        $response = new \Symfony\Component\HttpFoundation\Response(json_encode(array('error' => 'Incorrect captcha token.')));
        $response->setStatusCode(401);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function requestApi($url) {

//        print_r($url); die();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        $headers = [
            'apitoken: ' . $this->apiToken
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $server_output = curl_exec($ch);

        curl_close($ch);

        return $server_output;

    }

}