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

}