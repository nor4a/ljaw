<?php

namespace Drupal\ljarestapi\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class ConfigForm extends ConfigFormBase {

    public function getFormId() {
        return 'lja_config_form';
    }

    public function buildForm(array $form, FormStateInterface $form_state) {

        $form = parent::buildForm($form, $form_state);

        $config = $this->config('lja.settings');

        $texts = array(
           'heading' => 'Heading',
           'button-certificate-only' => 'Button - certificate only',
           'button-certificate-with-endorsment' => 'Button - certificate with endorsment',
           'button-endrosement-only' => 'Button - endorsement only',
           'button-submit' => 'Button - submit',
           'help' => 'Help',
           'help-certificate-only' => 'Help - certificate only',
           'help-certificate-with-endorsment' => 'Help - certificate with endorsment',
           'help-endrosement-only' => 'Help - endorsement only',
           'description-functions' => 'Description - functions',
           'description-capacities' => 'Description - capacities',
           'error' => 'Error'
        );

        $form['captcha'] = array(
           '#type' => 'fieldset',
           '#title' => 'Captcha',
           '#collapsible' => TRUE,
           '#collapsed' => TRUE,
           '#description' => 'Configuration of reCaptcha'
        );

        $form['captcha']['public_key'] = array(
            '#type' => 'textfield',
            '#title' => 'Public key',
            '#default_value' => $config->get('captcha.public_key'),
            '#required' => FALSE,
        );

        $form['captcha']['secret_key'] = array(
            '#type' => 'textfield',
            '#title' => 'Secret key',
            '#default_value' => $config->get('captcha.secret_key'),
            '#required' => FALSE,
        );

        $form['texts'] = array(
            '#type' => 'fieldset',
            '#title' => 'Texts',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE
        );

        foreach($texts as $text => $label) {
            $form['texts'][$text] = array(
                '#type' => 'textarea',
                '#title' => $label,
                '#default_value' => $config->get('texts.' . $text),
                '#required' => FALSE,
            );
        }

        return $form;

    }

    public function submitForm(array &$form, FormStateInterface $form_state) {

        $config = $this->config('lja.settings');

        $texts = array(
            'heading' => 'Heading',
            'button-certificate-only' => 'Button - certificate only',
            'button-certificate-with-endorsment' => 'Button - certificate with endorsment',
            'button-endrosement-only' => 'Button - endorsement only',
            'button-submit' => 'Button - submit',
            'help' => 'Help',
            'help-certificate-only' => 'Help - certificate only',
            'help-certificate-with-endorsment' => 'Help - certificate with endorsment',
            'help-endrosement-only' => 'Help - endorsement only',
            'description-functions' => 'Description - functions',
            'description-capacities' => 'Description - capacities',
            'error' => 'Error'
        );

        foreach($texts as $text => $label) {
            $config->set('texts.' . $text, $form_state->getValue($text));
        }

        $config->set('captcha.public_key', $form_state->getValue('public_key'));
        $config->set('captcha.secret_key', $form_state->getValue('secret_key'));
        $config->save();

        return parent::submitForm($form, $form_state);

    }

    protected function getEditableConfigNames() {
        return [
            'lja.settings',
        ];
    }

}