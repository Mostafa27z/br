<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SocialCase;
use App\Models\FamilyMember;
use App\Models\Assistance;
use App\Models\Task;
use App\Models\Visit;
use App\Models\CaseActivity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users
        $admin = User::create([
            'name' => 'عبد الله العتيبي',
            'email' => 'admin@birr.org',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '0500000001',
            'avatar_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
        ]);

        $employee1 = User::create([
            'name' => 'سارة الحربي',
            'email' => 'emp1@birr.org',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'phone' => '0500000002',
            'avatar_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
        ]);

        $employee2 = User::create([
            'name' => 'أحمد الشمري',
            'email' => 'emp2@birr.org',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'phone' => '0500000003',
            'avatar_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
        ]);

        // 2. Create Cases
        $case1 = SocialCase::create([
            'name' => 'عائلة الأحمدي',
            'national_id' => '1029384756',
            'phone' => '0501234567',
            'assigned_to' => $employee1->id,
            'income_source' => 'ضمان اجتماعي وتقاعد بسيط',
            'governorate' => 'الرياض',
            'district' => 'النسيم الغربي',
            'detailed_address' => 'شارع سبأ، خلف أسواق السدحان، فيلا قديمة دور أرضي',
            'marital_status' => 'متزوج',
            'income' => 3200.00,
            'medical_condition' => 'الأب مصاب بجلطة دماغية تعوقه عن العمل وعجز جزئي',
            'housing_type' => 'مستأجر - شعبي',
            'notes' => 'العائلة بحاجة ماسة لمساعدات مالية شهرية ومواد غذائية وسداد فواتير الكهرباء المتراكمة.',
            'status' => 'تحت الدراسة',
            'priority' => 'عالية',
        ]);

        $case2 = SocialCase::create([
            'name' => 'أمينة البقمي',
            'national_id' => '1092837465',
            'phone' => '0559876543',
            'assigned_to' => $employee2->id,
            'income_source' => 'حساب المواطن ومساعدة الضمان',
            'governorate' => 'مكة المكرمة',
            'district' => 'الشوقية',
            'detailed_address' => 'شارع عبد الله بن العباس، عمارة 14، الشقة 3',
            'marital_status' => 'أرملة',
            'income' => 1900.00,
            'medical_condition' => 'ربو مزمن ومشاكل في المفاصل تمنع الحركة الطويلة',
            'housing_type' => 'مستأجر - شقة',
            'notes' => 'لديها ابن مصاب بمرض سكري أطفال ويحتاج لرعاية ومتابعة صحية مستمرة وأجهزة علاجية.',
            'status' => 'مقبول',
            'priority' => 'حرجة',
        ]);

        $case3 = SocialCase::create([
            'name' => 'خالد الدوسري',
            'national_id' => '1038475629',
            'phone' => '0534567890',
            'assigned_to' => $employee1->id,
            'income_source' => 'عمل موسمي متقطع',
            'governorate' => 'الشرقية',
            'district' => 'الدمام - حي بدر',
            'detailed_address' => 'شارع عمر بن الخطاب، جوار مسجد التقوى',
            'marital_status' => 'مطلق',
            'income' => 1200.00,
            'medical_condition' => 'سليم معافى',
            'housing_type' => 'ملك - بيت شعبي قديم',
            'notes' => 'يعول طفلين بعد طلاق زوجته ويعمل بأجر يومي غير مستقر مما يسبب تذبذباً شديداً في الدخل.',
            'status' => 'جديد',
            'priority' => 'منخفضة',
        ]);

        // 3. Create Family Members
        FamilyMember::create([
            'case_id' => $case1->id,
            'name' => 'فهد الأحمدي',
            'national_id' => '1122334455',
            'relationship' => 'ابن',
            'age' => 12,
            'medical_condition' => 'سليم',
        ]);

        FamilyMember::create([
            'case_id' => $case1->id,
            'name' => 'نورة الأحمدي',
            'national_id' => '1133445566',
            'relationship' => 'ابنة',
            'age' => 8,
            'medical_condition' => 'حساسية صدر وربو',
        ]);

        FamilyMember::create([
            'case_id' => $case1->id,
            'name' => 'مريم الأحمدي',
            'national_id' => '1055667788',
            'relationship' => 'زوجة',
            'age' => 38,
            'medical_condition' => 'سليم',
        ]);

        FamilyMember::create([
            'case_id' => $case2->id,
            'name' => 'ياسر البقمي',
            'national_id' => '1188990011',
            'relationship' => 'ابن',
            'age' => 15,
            'medical_condition' => 'سكري أطفال النوع الأول',
        ]);

        // 4. Create Assistances
        Assistance::create([
            'case_id' => $case1->id,
            'user_id' => $employee1->id,
            'type' => 'financial',
            'description' => 'مساعدة مالية عاجلة لمصاريف الشتاء وكسوة الأبناء',
            'amount' => 1500.00,
            'date' => '2026-08-01',
        ]);

        Assistance::create([
            'case_id' => $case2->id,
            'user_id' => $employee2->id,
            'type' => 'non_financial',
            'description' => 'توفير وتوصيل أجهزة كهربائية أساسية (ثلاجة LG وغسالة توب لودينج)',
            'amount' => 3200.00,
            'date' => '2026-08-05',
        ]);

        // 5. Create Tasks
        Task::create([
            'title' => 'زيارة ميدانية للتحقق من وضع السكن',
            'description' => 'الذهاب لموقع العائلة وتوثيق حالة المنزل ومطابقتها للشروط والتقاط صور للأضرار لتقديمها للجنة الترميم.',
            'case_id' => $case1->id,
            'user_id' => $employee1->id,
            'created_by' => $admin->id,
            'priority' => 'عالية',
            'status' => 'معلقة',
            'due_date' => '2026-08-20',
        ]);

        Task::create([
            'title' => 'تسليم أجهزة كهربائية وتأكيد الاستلام',
            'description' => 'التنسيق مع المورد لتوصيل الأجهزة للمستفيدة في منزلها والتوقيع على نموذج الاستلام المعتمد وإرفاق المستندات.',
            'case_id' => $case2->id,
            'user_id' => $employee2->id,
            'created_by' => $admin->id,
            'priority' => 'متوسطة',
            'status' => 'مكتملة',
            'due_date' => '2026-08-10',
            'updates' => 'تم تسليم الثلاجة والغسالة والتحقق من تشغيلهما بنجاح، ووقعت المستفيدة على نموذج الاستلام.',
        ]);

        // 6. Create Visits
        Visit::create([
            'case_id' => $case1->id,
            'user_id' => $employee1->id,
            'visit_date' => '2026-08-10',
            'status' => 'تمت',
            'notes' => 'تمت زيارة منزل عائلة الأحمدي ورصدنا شقوقاً جدارية خطيرة في الصالة ومطبخ متهالك وتسربات مياه.',
        ]);

        // 7. Case Activities / Timeline
        CaseActivity::create([
            'case_id' => $case1->id,
            'user_id' => $admin->id,
            'type' => 'case_created',
            'title' => 'إنشاء ملف الحالة',
            'description' => 'قام المدير بإنشاء ملف الحالة وتسجيل البيانات الأساسية برقم وطني 1029384756.',
        ]);

        CaseActivity::create([
            'case_id' => $case1->id,
            'user_id' => $admin->id,
            'type' => 'assignment_changed',
            'title' => 'تعيين الباحثة الاجتماعية',
            'description' => 'تم تعيين الحالة للباحثة سارة الحربي لدراستها وإعداد التقرير الميداني الأول.',
        ]);

        CaseActivity::create([
            'case_id' => $case1->id,
            'user_id' => $employee1->id,
            'type' => 'assistance_added',
            'title' => 'تسجيل مساعدة مالية',
            'description' => 'تم صرف مساعدة شتاء بمبلغ 1500 ريال سعودي نقداً لتأمين الأساسيات.',
        ]);

        CaseActivity::create([
            'case_id' => $case1->id,
            'user_id' => $employee1->id,
            'type' => 'visit_added',
            'title' => 'إجراء زيارة ميدانية',
            'description' => 'قامت سارة الحربي بزيارة ميدانية وتقييم حالة المسكن المتدهور للاستعجال بقرار الدعم.',
        ]);

        CaseActivity::create([
            'case_id' => $case2->id,
            'user_id' => $admin->id,
            'type' => 'case_created',
            'title' => 'إنشاء وتعميد الحالة',
            'description' => 'تم تسجيل المستفيدة أمينة البقمي والتحقق من هويتها الوطنية وحالتها الاجتماعية كأرملة.',
        ]);

        CaseActivity::create([
            'case_id' => $case2->id,
            'user_id' => $employee2->id,
            'type' => 'assistance_added',
            'title' => 'تسليم مساعدة عينية',
            'description' => 'تم تسليم ثلاجة وغسالة ملابس جديدة بالتنسيق مع المندوب وتوقيع المستندات.',
        ]);
    }
}
