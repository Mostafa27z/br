<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialCase extends Model
{
    use HasFactory;

    protected $table = 'cases';

    protected $fillable = [
        'name',
        'national_id',
        'phone',
        'assigned_to',
        'income_source',
        'governorate',
        'district',
        'detailed_address',
        'marital_status',
        'income',
        'medical_condition',
        'housing_type',
        'notes',
        'status',
        'priority',
    ];

    public function assignedEmployee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class, 'case_id');
    }

    public function assistances()
    {
        return $this->hasMany(Assistance::class, 'case_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'case_id');
    }

    public function visits()
    {
        return $this->hasMany(Visit::class, 'case_id');
    }

    public function activities()
    {
        return $this->hasMany(CaseActivity::class, 'case_id');
    }
}
