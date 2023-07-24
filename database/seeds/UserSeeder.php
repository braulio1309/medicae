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
                'firstname' => 'William',
                'lastname' => 'Castillo',
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
                'firstname' => 'YACREA',
                'lastname' => 'YACREA',
                'username' => 'YACREA',
                'email' => 'yacrea@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '1123456789',
                'role_id' => 2,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 3,
                'firstname' => 'Fisioterapeuta',
                'lastname' => 'Fisioterapeuta',
                'username' => 'Fisioterapeuta',
                'email' => 'fisio@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '2123456789',
                'role_id' => 3,
                'user_id' => 2,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 4,
                'firstname' => 'Company',
                'lastname' => 'Company',
                'username' => 'Company',
                'email' => 'company@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '3123456789',
                'role_id' => 2,
                'user_id' => 2,
                'statut' => 1,
            )
        );
        
        DB::table('users')->insert(
            array(
                'id' => 5,
                'firstname' => 'Jose',
                'lastname' => 'Salazar',
                'username' => 'jose_s',
                'email' => 'paciente@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'phone' => '4123456789',
                'role_id' => 4,
                'user_id' => 4,
                'statut' => 1,
            )
        );
    }
}
