<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 1,
                'name'  => 'Admin',
                'label' => 'Administrador',
                'status' => 1,
                'description' => 'Administrador',
            ])
        );
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 2,
                'name'  => 'Doctor (BASIC PLAN)',
                'label' => 'Doctor',
                'status' => 1,
                'description' => 'Doctor',
            ])
        );
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 3,
                'name'  => 'Doctor (PREMIUM PLAN)',
                'label' => 'Doctor',
                'status' => 1,
                'description' => 'Doctor',
            ])
        );
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 4,
                'name'  => 'Paciente',
                'label' => 'Paciente',
                'status' => 1,
                'description' => 'Paciente',
            ])
        );
    }
}
