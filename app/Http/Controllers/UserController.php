<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use App\Models\Document;
use App\Models\Patient;
use App\Models\Reservation;
use App\Models\role_user;
use App\utils\helpers;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\ImageManagerStatic as Image;
use Maatwebsite\Excel\Facades\Excel;
use DB;


class UserController extends BaseController
{
    //------------- GET ALL USERS---------\\

    public function index(request $request)
    {
       
        $this->authorizeForUser($request->user('api'), 'view', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'username', 1 => 'statut', 2 => 'phone', 3 => 'email');
        $param = array(0 => 'like', 1 => '=', 2 => 'like', 3 => 'like');
        $data = array();
        
        $Role = Auth::user()->roles()->first();
        $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');

        $users = User::where(function ($query) use ($ShowRecord) {
            if (!$ShowRecord) {
                return $query->where('id', '=', Auth::user()->id);
            }
        });

        
        $roles = Role::where('deleted_at', null)->get(['id', 'name']);

        //Multiple Filter
        $Filtred = $helpers->filter($users, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('username', 'LIKE', "%{$request->search}%")
                        ->orWhere('firstname', 'LIKE', "%{$request->search}%")
                        ->orWhere('lastname', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%")
                        ->orWhere('phone', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $Filtred->count();
        $users = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        $roles = Role::where('deleted_at', null)->get(['id', 'name']);

        return response()->json([
            'users' => $users,
            'roles' => $roles,
            'totalRows' => $totalRows,
        ]);
    }

    public function getUserByRole(Request $request, string $rol){
        
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'username', 1 => 'statut', 2 => 'phone', 3 => 'email');
        $param = array(0 => 'like', 1 => '=', 2 => 'like', 3 => 'like');
        $data = array();
        
        $rols = Role::where('label', $rol)->pluck('id')->toArray();

        $users = User::whereIn('role_id', $rols)->with('roles')->get();   
        
        //Multiple Filter
        /*$Filtred = $helpers->filter($users, $columns, $param, $request)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('username', 'LIKE', "%{$request->search}%")
                        ->orWhere('firstname', 'LIKE', "%{$request->search}%")
                        ->orWhere('lastname', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%")
                        ->orWhere('phone', 'LIKE', "%{$request->search}%");
                });
            });*/

            
        //$totalRows = $users->count();
        
        /*$users = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();*/

        $roles = Role::where('deleted_at', null)->get(['id', 'name']);

        return response()->json([
            'users' => $users,
            'roles' => $roles,
            'totalRows' => count($users),
        ]);
    }

    

    //------------- GET USER Auth ---------\\

    public function GetUserAuth(Request $request)
    {
        $helpers = new helpers();
        $user['avatar'] = Auth::user()->avatar;
        $user['username'] = Auth::user()->username;
        $user['currency'] = $helpers->Get_Currency();
        $user['logo'] = Setting::first()->logo;
        $user['default_language'] = Setting::first()->default_language;
        $user['footer'] = Setting::first()->footer;
        $user['developed_by'] = Setting::first()->developed_by;
        $permissions = Auth::user()->roles()->first()->permissions->pluck('name');
      

        return response()->json([
            'success' => true,
            'user' => $user,
            'permissions' => $permissions,
        ]);
    }

    //------------- GET USER ROLES ---------\\

    public function GetUserRole(Request $request)
    {

        $roles = Auth::user()->roles()->with('permissions')->first();

        $data = [];
        if ($roles) {
            foreach ($roles->permissions as $permission) {
                $data[] = $permission->name;

            }
            return response()->json(['success' => true, 'data' => $data]);
        }

    }

    //------------- STORE NEW USER ---------\\

    public function store(Request $request)
    {
        //$this->authorizeForUser($request->user('api'), 'create', User::class);
        $this->validate($request, [
            'email' => 'required|unique:users',
        ], [
            'email.unique' => 'This Email already taken.',
        ]);
        \DB::transaction(function () use ($request) {
         
            $User = new User;
            $User->firstname = $request['firstname'];
            $User->lastname  = $request['lastname'];
            $User->username  = $request['username'];
            $User->email     = $request['email'];
            $User->phone     = $request['phone'];
            $User->password  = Hash::make($request['password']);
            // $User->avatar    = $filename;
            $User->user_id   = auth()->user()->id;
            $User->role_id   = $request['role'];
            $User->save();

            $role_user = new role_user;
            $role_user->user_id = $User->id;
            $role_user->role_id = $request['role'];
            $role_user->save();
    
        }, 10);

        return response()->json(['success' => true]);
    }

    //------------ function show -----------\\
    public function show($id)
    {
        $Patient = User::where('id', $id)->get();
        return response()->json(['patient' => (count($Patient) == 0)? null: $Patient[0]], 201);
    }

    //------------- UPDATE  USER ---------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', User::class);
        
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'email' => Rule::unique('users')->ignore($id),
        ], [
            'email.unique' => 'This Email already taken.',
        ]);

        \DB::transaction(function () use ($id ,$request) {
            $user = User::findOrFail($id);
            $current = $user->password;

            if ($request->NewPassword != 'null') {
                if ($request->NewPassword != $current) {
                    $pass = Hash::make($request->NewPassword);
                } else {
                    $pass = $user->password;
                }

            } else {
                $pass = $user->password;
            }

            $currentAvatar = $user->avatar;
            if ($request->avatar != $currentAvatar) {

                $image = $request->file('avatar');
                $path = public_path() . '/images/avatar';
                $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(128, 128);
                $image_resize->save(public_path('/images/avatar/' . $filename));

                $userPhoto = $path . '/' . $currentAvatar;
                if (file_exists($userPhoto)) {
                    if ($user->avatar != 'no_avatar.png') {
                        @unlink($userPhoto);
                    }
                }
            } else {
                $filename = $currentAvatar;
            }

            User::whereId($id)->update([
                'firstname' => $request['firstname'],
                'lastname' => $request['lastname'],
                'username' => $request['username'],
                'email' => $request['email'],
                'phone' => $request['phone'],
                'password' => $pass,
                'avatar' => $filename,
                'statut' => $request['statut'],
                'role_id' => $request['role'],
            ]);

            role_user::where('user_id' , $id)->update([
                'user_id' => $id,
                'role_id' => $request['role'],
            ]);

        }, 10);
        
        return response()->json(['success' => true]);

    }

    //------------- Export USERS to EXCEL ---------\\

    public function exportExcel(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', User::class);

        return Excel::download(new UsersExport, 'Users.xlsx');
    }

    //------------- UPDATE PROFILE ---------\\

    public function updateProfile(Request $request, $id = null)
    {
        $id = ($id == null)? Auth::user()->id: $id;
        $user = User::findOrFail($id);
        $current = $user->password;

        if ($request->NewPassword != 'undefined') {
            if ($request->NewPassword != $current) {
                $pass = Hash::make($request->NewPassword);
            } else {
                $pass = $user->password;
            }

        } else {
            $pass = $user->password;
        }

        $currentAvatar = $user->avatar;
        /*if ($request->avatar != $currentAvatar) {

            $image = $request->file('avatar');
            $path = public_path() . '/images/avatar';
            $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

            $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(128, 128);
            $image_resize->save(public_path('/images/avatar/' . $filename));

            $userPhoto = $path . '/' . $currentAvatar;

            if (file_exists($userPhoto)) {
                if ($user->avatar != 'no_avatar.png') {
                    @unlink($userPhoto);
                }
            }
        } else {
            $filename = $currentAvatar;
        }*/

        User::whereId($id)->update([
            'firstname' => $request['firstname'],
            'lastname' => $request['lastname'],
            'username' => $request['username'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'password' => $pass,
            //'avatar' => $filename,

        ]);

        return response()->json(['avatar' => null, 'user' => $request['username']]);

    }

    public function getUserWithDocuments($userId)
    {
        $user = User::with('documents')->find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $userWithDocuments = $user->toArray();
        foreach ($userWithDocuments['documents'] as &$document) {
            $document['download_link'] = route('download', ['documentId' => $document['id']]);
        }

        return response()->json($userWithDocuments);
    }

    public function download($documentId)
    {
        $document = Document::findOrFail($documentId);

        return response()->download(storage_path('app/uploads/').$document->name, $document->name);
    }   

    public function updateProfilePatience(Request $request, $id = null)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            //Guardar documentos
            if ($request->hasFile('file')) {
                
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $document = Document::create([
                    'name'           => $fileName,
                    'reservation_id' => $id,
                    'path' => ''
                ]);
                
                $file->storeAs('uploads', $fileName);
                $document->save();
            }
        
            return response()->json(['avatar' => null, 'user' => $request['username']]);
        } catch (\Exception $e) {
            response()->json(['success' => false, 'msg' => $e->getMessage()]);
        }
       

    }

    //----------- IsActivated (Update Statut User) -------\\

    public function IsActivated(request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'update', User::class);

        $user = Auth::user();
        if ($request['id'] !== $user->id) {
            User::whereId($id)->update([
                'statut' => $request['statut'],
            ]);
            return response()->json([
                'success' => true,
            ]);
        } else {
            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function GetPermissions()
    {
        $roles = Auth::user()->roles()->with('permissions')->first();
        $data = [];
        if ($roles) {
            foreach ($roles->permissions as $permission) {
                $item[$permission->name]['slug'] = $permission->name;
                $item[$permission->name]['id'] = $permission->id;

            }
            $data[] = $item;
        }
        return $data[0];

    }

    //------------- GET USER Auth ---------\\

    public function GetInfoProfile(Request $request)
    {
        $data = User::findorfail(Auth::user()->id);
        
        return response()->json(['success' => true, 'user' => $data]);
    }

    public function getInfoProfilePatient($id) {
        $data = User::join("roles","roles.id","users.role_id")
                                ->with([
                                    'reservations.appointment.doctor',
                                    'reservations.documents',
                                    'reservations_pending.appointment.doctor',
                                    'reservations_pending.documents',
                                    'reservations_past.documents'
                                ])
                                ->select('users.*','roles.name as name_role', \DB::raw("DATE_FORMAT(users.created_at,'%d-%m-%Y') as registration_date"))
                                ->where('users.id', $id)->first();

        return response()->json(['success' => true, 'user' => $data]);
    }

    public function getInformationUsers(){
        return response()->json([
            'total_patients' => User::where('role_id',Role::where('name','Paciente')->first()->id)->count(),
            'total_companies' => User::where('role_id',Role::where('name','Empresa')->first()->id)->count(),
            'total_fisios' => User::where('role_id',Role::where('name','Fisioterapeuta')->first()->id)->count(),
        ]);
    }
    
    public function getInformationUsersDoctor(){
        $roleIds = Role::whereIn('name', ['Fisioterapeuta', 'Owner'])->pluck('id');


        $doctors = User::whereIn('role_id', $roleIds)->first()->id
                        ->select("users.*",DB::raw("CONCAT(firstname,' ',lastname) as fullname"))
                        ->get();
        return response()->json($doctors);
    }

    public function getRecipeProfile(Request $request){

        $patient = User::find($request->id);
        $fpdf = new Fpdf;

        $fpdf->AddPage("P","Letter");

        $fpdf->Image('images/background_medicae.png', 0, 0,216,281);
        
        $fpdf->setXY(45,20);
        $fpdf->SetFont('Times', '', 28);
        $fpdf->Cell(30, 5, 'MD. PETER LEWIS');
        
        $fpdf->SetTextColor(108,164,204);
        $fpdf->setXY(45,27);
        $fpdf->SetFont('Arial', 'B', 12);
        $fpdf->Cell(30, 5, 'NEUROLOGIST DOCTOR');
        
        $fpdf->SetTextColor(0,0,0);
        $fpdf->setXY(53,65);
        $fpdf->SetFont('Helvetica', '', 12);
        $fpdf->Cell(25, 5, $patient->firstname.' '.$patient->lastname);
        // $fpdf->Cell(25, 5, "Braulio Zapata");
        
        $fpdf->setXY(145,76);
        $fpdf->SetFont('Helvetica', '', 10);
        $fpdf->Cell(25, 5, now());
    
        $fpdf->setXY(43,76);
        $fpdf->SetFont('Helvetica', '', 12);
        $fpdf->Cell(25, 5, utf8_decode("22 años"));
        

        $fpdf->setXY(21,53);
        $fpdf->SetFont('Helvetica', 'I', 12);
        // $fpdf->Cell(173, 5, "Cannabis");
        $fpdf->Cell(173, 5, $request->recipe);

        $fpdf->setXY(45,110);
        $fpdf->SetFont('Helvetica', 'I', 14);
        // $fpdf->MultiCell(150, 5, "Cannabis");
        $fpdf->Cell(150, 5, $request->diagnosic);


        // $fpdf->Line($fpdf->GetPageWidth() -70, $fpdf->GetPageHeight() - 30, $fpdf->GetPageWidth() - 10, $fpdf->GetPageHeight() - 30);
        // $fpdf->SetFont('Arial', '', 12);
        // $fpdf->Text($fpdf->GetPageWidth() - 55, $fpdf->GetPageHeight() - 37, "Tu Love");



        return $fpdf->Output();
        exit;
    }
}
