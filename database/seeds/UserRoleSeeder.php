<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert some stuff
        DB::table('role_user')->insert(
            array(
                'id'      => 1,
                'user_id' => 1,
                'role_id' => 1,
            )
        );
       
        // Insert some stuff
        DB::table('role_user')->insert(
            array(
                'id'      => 2,
                'user_id' => 2,
                'role_id' => 2,
            )
        );

        DB::table('role_user')->insert(
            array(
                'id'      => 3,
                'user_id' => 3,
                'role_id' => 3,
            )
        );

        DB::table('role_user')->insert(
            array(
                'id'      => 4,
                'user_id' => 4,
                'role_id' => 4,
            )
        );
        
    }
}
