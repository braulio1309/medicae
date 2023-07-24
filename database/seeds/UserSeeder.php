<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Insert some stuff
        DB::table('users')->insert(
            array(
                'id' => 1,
                'firstname' => 'Admin',
                'lastname' => 'Admin',
                'username' => 'William Castillo',
                'email' => 'admin@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '0123456789',
                'role_id' => 1,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 2,
                'firstname' => 'Doctor BASICO',
                'lastname' => 'Test',
                'username' => 'doctorbasico',
                'email' => 'doctorbasico@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '1123456789',
                'role_id' => 2,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 3,
                'firstname' => 'Doctor Premium',
                'lastname' => 'TEST',
                'username' => 'doctorpremium',
                'email' => 'doctorpremium@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '2123456789',
                'role_id' => 3,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 4,
                'firstname' => 'Paciente',
                'lastname' => 'Test',
                'username' => 'paciente',
                'email' => 'paciente@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '3123456789',
                'role_id' => 4,
                'statut' => 1,
            )
        );
        
    }
}
