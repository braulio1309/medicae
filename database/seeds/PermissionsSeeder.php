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
				'name' => 'appointments_delete',
			],
			[
				'id' => 10,
				'name' => 'appointments_view',
			],
			[
				'id' => 11,
				'name' => 'appointments_edit',
			],
			[
				'id' => 12,
				'name' => 'appointments_add',
			],
			[
				'id' => 13,
				'name' => 'reservations_view',
			],
			[
				'id' => 14,
				'name' => 'reservations_edit',
			],
			[
				'id' => 15,
				'name' => 'reservations_delete',
			],
			[
				'id' => 16,
				'name' => 'reservations_add',
			],
			[
				'id' => 17,
				'name' => 'users_fisio_view',
			],
			[
				'id' => 18,
				'name' => 'users_fisio_edit',
			],
			[
				'id' => 19,
				'name' => 'users_fisio_delete',
			],
			[
				'id' => 20,
				'name' => 'users_fisio_add',
			],
			[
				'id' => 21,
				'name' => 'users_patients_view',
			],
			[
				'id' => 22,
				'name' => 'users_patients_edit',
			],
			[
				'id' => 23,
				'name' => 'users_patients_delete',
			],
			[
				'id' => 24,
				'name' => 'users_patients_add',
			],
			[
				'id' => 25,
				'name' => 'setting_system',
			],
			[
				'id' => 26,
				'name' => 'reports_fisio',
			],
			[
				'id' => 27,
				'name' => 'reports_reservas',
			],
			[
				'id' => 28,
				'name' => 'reports_patients',
			],
			[
				'id' => 29,
				'name' => 'reports_company',
			]	
			)
		);
    }
}
