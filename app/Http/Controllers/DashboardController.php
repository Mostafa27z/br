<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index()
    {
        $stats = $this->dashboardService->getStats();
        return Inertia::render('Dashboard/Main', [
            'stats' => $stats,
        ]);
    }

    public function socialStats()
    {
        $stats = $this->dashboardService->getStats();
        return Inertia::render('Dashboard/Social', [
            'stats' => $stats,
        ]);
    }

    public function financialStats()
    {
        $stats = $this->dashboardService->getStats();
        return Inertia::render('Dashboard/Financial', [
            'stats' => $stats,
        ]);
    }
}
