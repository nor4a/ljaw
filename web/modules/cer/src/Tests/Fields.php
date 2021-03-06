<?php

namespace Drupal\cer\Tests;

use Drupal\simpletest\WebTestBase;

/**
 * Tests integration with the field API.
 *
 * @group cer
 *
 */

class CerFieldTestCase extends WebTestBase {

  public static $modules = array('field', 'cer');

  public function setUp() {
    parent::setUp();

    field_create_field(array(
      'field_name' => 'field_user',
      'type' => 'entityreference',
      'cardinality' => -1,
      'settings' => array(
        'target_type' => 'user',
      ),
    ));
    field_create_field(array(
      'field_name' => 'field_node',
      'type' => 'entityreference',
      'cardinality' => -1,
      'settings' => array(
        'target_type' => 'node',
      ),
    ));

    field_create_instance(array(
      'field_name' => 'field_user',
      'entity_type' => 'node',
      'bundle' => 'page',
    ));
    field_create_instance(array(
      'field_name' => 'field_node',
      'entity_type' => 'user',
      'bundle' => 'user',
    ));
    
    ctools_include('export');

    $preset = ctools_export_crud_new('cer');
    $preset->entity_types_content_fields = 'node*page*field_user*user*user*field_node';
    $preset->enabled = TRUE;

    ctools_export_crud_save('cer', $preset);
  }

  public function testFieldInstanceDelete() {
    field_delete_instance(field_info_instance('user', 'field_node', 'user'));

    $preset = cer_preset_load('node*page*field_user*user*user*field_node');
    $this->assertNull($preset, 'Deleting a field instance clears CER presets for that instance.');
  }

  public function testFieldDelete() {
    field_delete_field('field_user');

    $preset = cer_preset_load('node*page*field_user*user*user*field_node');
    $this->assertNull($preset, 'Deleting a field clears CER presets for that field.');
  }

}
