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
                'name'  => 'Owner',
                'label' => 'Owner',
                'status' => 1,
                'description' => 'Owner',
            ])
        );
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 2,
                'name'  => 'Empresa',
                'label' => 'Empresa',
                'status' => 1,
                'description' => 'Empresa',
            ])
        );
        // Insert some stuff
	    DB::table('roles')->insert(
            array([
                'id'    => 3,
                'name'  => 'Fisioterapeuta',
                'label' => 'Fisioterapeuta',
                'status' => 1,
                'description' => 'Fisioterapeuta',
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
