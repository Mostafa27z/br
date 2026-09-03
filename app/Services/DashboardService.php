<?php

namespace App\Services;

use App\Models\SocialCase;
use App\Models\Assistance;
use App\Models\FamilyMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardService
{
    public function getStats()
    {
        $totalCases = SocialCase::count();
        $activeCases = SocialCase::where('status', 'تحت الدراسة')->count();
        $acceptedCases = SocialCase::where('status', 'مقبول')->count();
        $newCases = SocialCase::where('status', 'جديد')->count();

        $totalAssistance = Assistance::sum('amount');
        
        $monthlyAssistance = Assistance::where('date', '>=', Carbon::now()->startOfMonth())
            ->sum('amount');

        // Cases by governorate
        $byGovernorate = SocialCase::select('governorate', DB::raw('count(*) as count'))
            ->groupBy('governorate')
            ->get()
            ->pluck('count', 'governorate')
            ->toArray();

        // Cases by marital status
        $byMaritalStatus = SocialCase::select('marital_status', DB::raw('count(*) as count'))
            ->groupBy('marital_status')
            ->get()
            ->pluck('count', 'marital_status')
            ->toArray();

        // Medical conditions count (cases + family members needing medical care)
        $caseMedicalCount = SocialCase::whereNotNull('medical_condition')
            ->where('medical_condition', '!=', '')
            ->where('medical_condition', '!=', 'معافى')
            ->where('medical_condition', '!=', 'سليم')
            ->count();

        $familyMedicalCount = FamilyMember::whereNotNull('medical_condition')
            ->where('medical_condition', '!=', '')
            ->where('medical_condition', '!=', 'معافى')
            ->where('medical_condition', '!=', 'سليم')
            ->count();

        $medicalCases = $caseMedicalCount + $familyMedicalCount;

        // Family statistics
        $totalFamilyMembers = FamilyMember::count();
        $avgFamilySize = $totalCases > 0 ? round($totalFamilyMembers / $totalCases, 1) : 0;

        return [
            'total_cases' => $totalCases,
            'active_cases' => $activeCases,
            'accepted_cases' => $acceptedCases,
            'new_cases' => $newCases,
            'total_assistance' => (float)$totalAssistance,
            'monthly_assistance' => (float)$monthlyAssistance,
            'by_governorate' => $byGovernorate,
            'by_marital_status' => $byMaritalStatus,
            'medical_cases' => $medicalCases,
            'total_family_members' => $totalFamilyMembers,
            'avg_family_size' => $avgFamilySize,
        ];
    }
}
