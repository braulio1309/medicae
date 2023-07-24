<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Auth\Access\HandlesAuthorization;

class AppointmentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Appointment  $appointment
     * @return mixed
     */
    public function view(User $user)
    {
        $permission = Permission::where('name', 'reservations_view')->first();
        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        $permission = Permission::where('name', 'reservations_add')->first();
        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Appointment  $appointment
     * @return mixed
     */
    public function update(User $user)
    {
        $permission = Permission::where('name', 'reservations_edit')->first();
        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Appointment  $appointment
     * @return mixed
     */
    public function delete(User $user)
    {
        $permission = Permission::where('name', 'reservations_delete')->first();
        return $user->hasRole($permission->roles);
    }

    public function barcode(User $user)
    {
        $permission = Permission::where('name', 'barcode_view')->first();
        return $user->hasRole($permission->roles);
    }

    public function Stock_Alerts(User $user)
    {
        $permission = Permission::where('name', 'Reports_quantity_alerts')->first();
        return $user->hasRole($permission->roles);
    }

    public function WarehouseStock(User $user)
    {
        $permission = Permission::where('name', 'Warehouse_report')->first();
        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Appointment  $appointment
     * @return mixed
     */
    public function restore(User $user, Appointment $appointment)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Appointment  $appointment
     * @return mixed
     */
    public function forceDelete(User $user, Appointment $appointment)
    {
        //
    }
}
