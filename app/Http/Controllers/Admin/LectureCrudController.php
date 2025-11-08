<?php
namespace App\Http\Controllers\Admin;

use App\Http\Requests\LectureRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class LectureCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class LectureCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Lecture::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/lecture');
        CRUD::setEntityNameStrings('palestra', 'palestras');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::setFromDb();

        CRUD::removeColumn('type_id');
        CRUD::removeColumn('speaker_id');

        CRUD::column('id')->label('id');
        CRUD::column('title')->label('Título');
        CRUD::column('date')->label('Data');
        CRUD::column('starts')->label('Início');
        CRUD::column('ends')->label('Fim');
        CRUD::column('room_number')->label('Sala');

        CRUD::column('type')
            ->attribute('title')
            ->label('Tipo');

        CRUD::column('speaker')
            ->attribute('name')
            ->label('Palestrante');

        CRUD::column('is_active')
            ->type('boolean')
            ->options([
                0 => 'Inativa',
                1 => 'Ativa'
            ])
            ->label('Ativa?');

        CRUD::column('finished')
            ->type('boolean')
            ->options([
                0 => 'Não',
                1 => 'Sim'
            ])
            ->label('Finalizada?');

        CRUD::column('is_open_for_enrollment')
            ->type('boolean')
            ->options([
                0 => 'Fechada',
                1 => 'Aberta'
            ])
            ->label('Inscrições abertas?');
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(LectureRequest::class);
        CRUD::setFromDb();

        CRUD::removeField('type_id');
        CRUD::removeField('speaker_id');

        CRUD::field('title')->label('Título');
        CRUD::field('date')->label('Data');
        CRUD::field('starts')->label('Horário de início');
        CRUD::field('ends')->label('Horário de término');

        CRUD::field('room_number')
            ->type('select')
            ->entity('room')
            ->model('App\Models\Room')
            ->attribute('number')
            ->label('Sala');

        CRUD::field('type_id')
            ->type('select')
            ->entity('type')
            ->model('App\Models\LectureType')
            ->attribute('title')
            ->label('Tipo de palestra');

        CRUD::field('speaker_id')
            ->type('select')
            ->entity('speaker')
            ->model('App\Models\Speaker')
            ->attribute('name')
            ->label('Palestrante principal');

        CRUD::field('is_active')
            ->type('switch')
            ->label('Palestra ativa?');

        CRUD::field('finished')
            ->type('switch')
            ->label('Palestra finalizada?');

        CRUD::field('is_open_for_enrollment')
            ->type('switch')
            ->label('Inscrições abertas?');
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    /**
     * Define what happens when the Show operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-show
     * @return void
     */
    protected function setupShowOperation()
    {
        CRUD::setFromDb();

        // Remove colunas de IDs
        CRUD::column('type_id')->label('id do tipo');
        CRUD::column('speaker_id')->label('id do palestrante');

        // Traduz colunas
        CRUD::column('id')->label('id');
        CRUD::column('title')->label('Título');
        CRUD::column('date')->label('Data');
        CRUD::column('starts')->label('Início');
        CRUD::column('ends')->label('Fim');
        CRUD::column('room_number')->label('Sala');

        // Relacionamentos
        CRUD::column('type')
            ->attribute('title')
            ->label('Tipo');

        CRUD::column('speaker')
            ->attribute('name')
            ->label('Palestrante');

        // Booleanos
        CRUD::column('is_active')
            ->type('boolean')
            ->options([
                0 => 'Inativa',
                1 => 'Ativa'
            ])
            ->label('Ativa?');

        CRUD::column('finished')
            ->type('boolean')
            ->options([
                0 => 'Não',
                1 => 'Sim'
            ])
            ->label('Finalizada?');

        CRUD::column('is_open_for_enrollment')
            ->type('boolean')
            ->options([
                0 => 'Fechada',
                1 => 'Aberta'
            ])
            ->label('Inscrições abertas?');

        CRUD::column('created_at')->label('Criado em');
        CRUD::column('updated_at')->label('Atualizado em');
    }
}
