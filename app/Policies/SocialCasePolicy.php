<?php

namespace App\Policies;

use App\Models\SocialCase;
use App\Models\User;

class SocialCasePolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Filters will be applied in Controller/Query builder
    }

    public function view(User $user, SocialCase $socialCase): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $socialCase->assigned_to === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, SocialCase $socialCase): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $socialCase->assigned_to === $user->id;
    }

    public function delete(User $user, SocialCase $socialCase): bool
    {
        return $user->isAdmin();
    }

    public function assign(User $user): bool
    {
        return $user->isAdmin();
    }
}
