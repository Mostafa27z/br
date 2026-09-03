<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Cases
        Schema::create('cases', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('national_id', 15)->unique()->index();
            $table->string('phone', 20)->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->string('income_source')->nullable();
            $table->string('governorate');
            $table->string('district');
            $table->text('detailed_address');
            $table->string('marital_status');
            $table->decimal('income', 10, 2)->default(0);
            $table->string('medical_condition')->nullable();
            $table->string('housing_type')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('جديد'); // جديد, تحت الدراسة, مقبول, مرفوض, مغلق
            $table->string('priority')->default('متوسطة'); // منخفضة, متوسطة, عالية, حرجة
            $table->timestamps();
        });

        // Family Members
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_id')->constrained('cases')->onDelete('cascade');
            $table->string('name');
            $table->string('national_id', 15)->nullable();
            $table->string('relationship'); // ابن, ابنة, زوجة, إلخ
            $table->integer('age');
            $table->string('medical_condition')->nullable();
            $table->timestamps();
        });

        // Assistances
        Schema::create('assistances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_id')->constrained('cases')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // The employee who added it
            $table->enum('type', ['financial', 'non_financial'])->default('financial');
            $table->string('description');
            $table->decimal('amount', 12, 2)->default(0); // For non-financial, this is the estimated value
            $table->date('date');
            $table->text('attachments')->nullable();
            $table->timestamps();
        });

        // Tasks
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('case_id')->constrained('cases')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Assigned employee
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Admin who created it
            $table->string('priority')->default('متوسطة'); // منخفضة, متوسطة, عالية, حرجة
            $table->string('status')->default('معلقة'); // معلقة, قيد التنفيذ, مكتملة, ملغاة
            $table->date('due_date')->nullable();
            $table->text('updates')->nullable();
            $table->text('attachments')->nullable();
            $table->timestamps();
        });

        // Visits
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_id')->constrained('cases')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Visitor/Employee
            $table->date('visit_date');
            $table->string('status')->default('مخطط لها'); // مخطط لها, تمت, ملغاة
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Case Activities / Timeline
        Schema::create('case_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_id')->constrained('cases')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Actor
            $table->string('type'); // case_created, case_updated, assistance_added, visit_added, note_added, task_updated, assignment_changed
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_activities');
        Schema::dropIfExists('visits');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('assistances');
        Schema::dropIfExists('family_members');
        Schema::dropIfExists('cases');
    }
};
