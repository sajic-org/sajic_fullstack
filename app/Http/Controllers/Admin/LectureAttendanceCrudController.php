<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LectureAttendanceRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class LectureAttendanceCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class LectureAttendanceCrudController extends CrudController
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
        CRUD::setModel(\App\Models\LectureAttendance::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/lecture-attendance');
        CRUD::setEntityNameStrings('presença na palestra', 'presenças nas palestras');
    }

    protected function setupListOperation()
    {
        CRUD::setFromDb();

        CRUD::removeColumn('lecture_id');
        CRUD::removeColumn('user_id');

        CRUD::column('lecture')
            ->attribute('title')
            ->label('Palestra');

        CRUD::column('user')
            ->attribute('name')
            ->label('Usuário');

        CRUD::column('showed_up')
            ->type('boolean')
            ->options([
                0 => 'Faltou',
                1 => 'Presente'
            ])
            ->label('Compareceu?');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(LectureAttendanceRequest::class);
        CRUD::setFromDb();

        CRUD::removeField('lecture_id');
        CRUD::removeField('user_id');

        CRUD::field('lecture_id')
            ->type('select')
            ->entity('lecture')
            ->model('App\Models\Lecture')
            ->attribute('title')
            ->label('Palestra');

        CRUD::field('user_id')
            ->type('select')
            ->entity('user')
            ->model('App\Models\User')
            ->attribute('name')
            ->label('Usuário');

        CRUD::field('showed_up')
            ->type('switch')
            ->label('Compareceu?');
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
        CRUD::setFromDb(); // set columns from db columns.

        CRUD::column('id')->label('id');
        CRUD::column('lecture_id')->label('id da palestra');
        CRUD::column('user_id')->label('id do usuário');

        CRUD::column('lecture')
            ->attribute('title')
            ->label('Palestra');

        CRUD::column('user')
            ->attribute('name')
            ->label('Usuário');

        CRUD::column('showed_up')
            ->type('boolean')
            ->options([
                0 => 'Não',
                1 => 'Sim'
            ])
            ->label('Compareceu?');

        CRUD::column('created_at')->label('Criado em');
        CRUD::column('updated_at')->label('Atualizado em');
    }
}
