import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
//import { DataService } from "../data.service";
//import { LoginResp } from "../interfaces/int.LoginResp";
//import { Global } from "../interfaces/int.Global";

//import 'rxjs/Rx';
/*Este import es para redirestadocionar iniciar sesion a Dashboard*/
export class Usuario 
{
  constructor(
 
    public user: string, 
    public pass: string, 
    public Edad: string, 
    public genero: string,
    public estado: string,
 
    ) {  }

}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ]
})
export class LoginComponent implements OnInit {
  loginMessage: string= "";
 mis_temas: Array<any>;
  cargando= 0;
hidden=false;
hidden2=false;
hidden3=false;
boton2="Registrarse";
boton3="Iniciar Sesion";
    generos= [{"genero":"Hombre", "id":"Hombre"},              {"genero":"Otro", "id":"Otro"},
               {"genero":"Mujer", "id":"Mujer"},     
            ];
estados=[{"estado":"Soltero/a", "id":"Soltero"},              {"estado":"Comprometido/a", "id":"Comprometido"},
               {"estado":"En Relación", "id":"Relacion"}, {"estado":"Casado/a", "id":"Casado"},              
               {"estado":"Unión libre", "id":"Union libre"},
               {"estado":"Separado/a", "id":"Separado"},  {"estado":"Divorciado/a", "id":"Divorciado"},
               {"estado":"Viudo/a", "id":"Viudo"}     
            ];
 
  Usuario= {
 
            user: '',
            pass: '',
            Edad: '',
            genero: '',
            tema:'',
            estado: ''};

  
  userForm: FormGroup;

  constructor(private router: Router, private http: Http ) { }

  ngOnInit() {
let url = `http://localhost:8081/tecwebBackEnd/temas/get/endpoint2.php`;
let search = new URLSearchParams();
    search.set('function', 'getTemasForDropdown');
    this.http.get(url, {search}).subscribe(res =>this.llenado(res.json()));
//this.llenado(res.json())

         this.userForm = new FormGroup({
      'user': new FormControl(this.Usuario.user, Validators.required), 
      'pass': new FormControl(this.Usuario.pass, Validators.required), 
      'Edad': new FormControl(this.Usuario.Edad,  Validators.required), 
      'genero': new FormControl(this.Usuario.genero,), 
      'estado': new FormControl(this.Usuario.estado,  Validators.required),
        'tema':       new FormControl( this.Usuario.tema,  Validators.required),                                
                                      });
 
  }


    get user() { return this.userForm.get('user'); }

  get pass() { return this.userForm.get('pass'); }

  get Edad() { return this.userForm.get('Edad'); }

  get genero() { return this.userForm.get('genero'); }

  get estado() { return this.userForm.get('estado'); }
 
 get tema() { return this.userForm.get('tema'); }

  register( )
  {
        let url = `http://localhost:8081/tecwebBackEnd/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertUsuario');
    formData.append('user', this.userForm.value.user);
    formData.append('pass', this.userForm.value.pass);
    formData.append('Edad', this.userForm.value.Edad);
    formData.append('genero', this.userForm.value.genero);
    formData.append('estado', this.userForm.value.estado);
    this.http.post(url, formData).subscribe(res => this.diplay2(res.json()));


    
  }


  register2( )
  {
        let url = `http://localhost:8081/tecwebBackEnd/temas/post/endpoint2.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertTemasu');
    formData.append('user', this.userForm.value.tema);
 
    this.http.post(url, formData).subscribe(res => this.display(res));


    
  }

display(res: any)
{
   console.log(res);
   location.reload();
    if(res.error==0){
     
      
    }else{
 
      this.loginMessage=res.estado;
    }
}


  login( ){
 
      let url = `http://localhost:8081/tecwebBackEnd/usuario/get/endpoint2.php`;
      console.log(url);
      let search = new URLSearchParams();
      search.set('function', 'login');
      search.set('user', this.userForm.value.user);
      search.set('constrasena', this.userForm.value.pass);
      this.http.get(url, {search}).subscribe(res =>  this.diplay(res.json()));
    /*
     console.log(res)  
      let formData:FormData = new FormData();
      formData.append('function', 'insertUsuario');
    */
  }

  llenado(resp: any){
 
 
         this.mis_temas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_temas[_i]=resp[_i];
     // console.log(this.mis_temas[_i]);
    }
  }
  ocultar(){
    this.hidden=!this.hidden;
 this.hidden3=!this.hidden3;
  }
    ocultar2(){
    this.hidden2=!this.hidden2;
    //this.hidden=!this.hidden;
    this.hidden3=!this.hidden3;
  }

ver()
{
            console.log(this.userForm.value.estado);
       console.log(this.userForm.value.user);
        console.log(this.userForm.value.pass);
         console.log(this.userForm.value.Edad);
          console.log(this.userForm.value.genero);
console.log(this.userForm.value.tema);
}
  diplay2(res: any){
    console.log(res);

    if(res.error==0){
      console.log(res);

 
     window.alert('Exito en el registro.')
     setTimeout(()=>{ this.router.navigate(['login'])}, 1500);
    }else{
 
      this.loginMessage=res.estado;
    }

  }

  diplay(res: any){
 

    if(res.error==0){
      console.log(res);
      localStorage.setItem("id",res.idUser);
localStorage.setItem("EC",res.EstadoC);
localStorage.setItem("Gen",res.Genero);
         this.router.navigate([ "soporte/dashboard"]);
    }else{
 
      this.loginMessage=res.estado;
    }
  }
}



