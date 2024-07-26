<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $all_roles = Role::all()->keyBy('id');

        $permissions = [
            'basic-user' => [Role::ROLE_USER],
            'entreprise-user' => [Role::ROLE_ENTREPRISE],
        ];

        foreach ($permissions as $key => $roles) {
            $permission = Permission::create(['name' => $key]);
            foreach ($roles as $role) {
                $all_roles[$role]->permissions()->attach($permission->id);
            }
        }
    }
}
