<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Insert some stuff
	   DB::table('permissions')->insert(
			array([
				'id' => 1,
				'name' => 'users_company_view',
			],
			[
				'id' => 2,
				'name' => 'users_company_edit',
			],
			[
				'id' => 3,
				'name' => 'users_company_delete',
			],
			[
				'id' => 4,
				'name' => 'users_company_add',
			],
			[
				'id' => 5,
				'name' => 'permissions_edit',
			],
			[
				'id' => 6,
				'name' => 'permissions_view',
			],
			[
				'id' => 7,
				'name' => 'permissions_delete',
			],
			[
				'id' => 8,
				'name' => 'permissions_add',
			],
			[
				'id' => 9,
				'name' => 'patients_delete',
			],
			[
				'id' => 10,
				'name' => 'patients_view',
			],
			[
				'id' => 11,
				'name' => 'patients_edit',
			],
			[
				'id' => 12,
				'name' => 'patients_add',
			],
			[
				'id' => 13,
				'name' => 'doctor_view',
			],
			[
				'id' => 14,
				'name' => 'doctor_edit',
			],
			[
				'id' => 15,
				'name' => 'doctor_delete',
			],
			[
				'id' => 16,
				'name' => 'doctor_add',
			],
			[
				'id' => 17,
				'name' => 'setting_system',
			],
			[
				'id' => 18,
				'name' => 'reports_fisio',
			],
			[
				'id' => 19,
				'name' => 'reports_reservas',
			],
			[
				'id' => 20,
				'name' => 'reports_patients',
			],
			[
				'id' => 21,
				'name' => 'reports_company',
			],	
			[
				'id' => 22,
				'name' => 'reservations_view',
			],	
			[
				'id' => 23,
				'name' => 'reservations_add',
			],	
			[
				'id' => 24,
				'name' => 'reservations_edit',
			],	
			[
				'id' => 25,
				'name' => 'reservations_delete',
			],	
			)
		);
    }
}
