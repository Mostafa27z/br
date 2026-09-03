<?php

namespace App\Policies;

use App\Models\Assistance;
use App\Models\User;

class AssistancePolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Filtered in Controller
    }

    public function view(User $user, Assistance $assistance): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $assistance->socialCase->assigned_to === $user->id;
    }

    public function create(User $user): bool
    {
        return true; // Any user can create assistance, but employee is limited to assigned cases (validated in request/controller)
    }

    public function delete(User $user, Assistance $assistance): bool
    {
        return $user->isAdmin();
    }
}
