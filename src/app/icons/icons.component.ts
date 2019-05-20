import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
 
export class Tema 
{
  constructor(
 
    public nota: string, 
 
 
 
    ) {  }

}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
hidden=false;
auxiliar= localStorage.getItem("idTemas");

 encabezado=" ";
contenido=" ";
autor=" ";
img;
valP=0;
valN=0;
un;
auxiliar1;
auxiliar4;
  mis_publicaciones2: Array<any>;
  mis_publicaciones: Array<any>;
  mis_usuarios: Array<any>;
  random;
id;
   api="http://localhost/tecwebBackEnd";
   constructor(private router: Router, private http: Http,private route: ActivatedRoute) { }

  ngOnInit() {
  	 let url = `${this.api}/temas/get/endpoint2.php`;
let search = new URLSearchParams();
    search.set('function', 'getTemasForDropdown');
    search.set('Tema',  this.auxiliar);
    this.http.get(url, {search}).subscribe(res =>this.llenadoP(res.json()));


url = `${this.api}/usuario/get/endpoint2.php`;
    search = new URLSearchParams();
    search.set('function', 'getUsuarios');

    this.http.get(url, {search}).subscribe(res =>this.llenadoU(res.json()));

          this.TemasForm = new FormGroup({
      'nota': new FormControl(this.Tema.nota, Validators.required), 
  
                       
                                      });
  }

get nota() { return this.TemasForm.get('nota'); }

 Tema= {
 
            nota: '',
          };
llenadoO(resp: any)
  {
    console.log(resp);
    this.mis_publicaciones= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones[_i]=resp[_i];
      this.auxiliar1=resp.length;
    }

   this.id=setInterval(() => {
    this.aleatorio(); 
  }, 5000);

  }


ngOnDestroy() {
  if (this.id) {
    clearInterval(this.id);
  }
}

  aleatorio()
{
this.random= Math.floor(Math.random() * this.auxiliar1)  ;
console.log(this.random);
    console.log( this.mis_publicaciones[this.random].Descripcion );
    this.contenido=this.mis_publicaciones[this.random].Descripcion;
    this.encabezado=this.mis_publicaciones[this.random].Nombre;
    this.valP=this.mis_publicaciones[this.random].ValoracionPositiva;
    this.valN=this.mis_publicaciones[this.random].ValoracionNegativa;
     this.auxiliar4=this.mis_publicaciones[this.random].idPublicaciones;
         this.un= this.mis_publicaciones[this.random].UrlImagen.indexOf("https"); 
    if(this.un!=-1)
{this.img=this.mis_publicaciones[this.random].UrlImagen;}
else
{this.img=this.api+"/"+this.mis_publicaciones[this.random].UrlImagen;}
   
//this.autor =this.mis_publicaciones[this.random].idUser;

    for (var _i = 0; _i < this.mis_usuarios.length; _i++ )
    {
      if(this.mis_publicaciones[this.random].idUser==this.mis_usuarios[_i].idUser)
        {     this.autor =this.mis_usuarios[_i].User;
          console.log(this.autor);
        }

  
    }
}

  TemasForm: FormGroup;

  llenadoP(resp: any)
  {
   // console.log(resp);
    this.mis_publicaciones2= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones2[_i]=resp[_i];
    }
 
    //console.log( this.mis_publicaciones );
    //console.log(this.mis_publicaciones.length);
         //this.auxiliar1=this.mis_publicaciones.length;
 
  }

llenadoU(resp: any)
  {
    console.log(resp);
    this.mis_usuarios= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_usuarios[_i]=resp[_i];
    }
 
    console.log( this.mis_usuarios);
  }

cambio( )

{
 
    this.hidden=!this.hidden;
     let url = `${this.api}/usuario/get/endpoint2.php`;
    let search = new URLSearchParams();
    search.set('function', 'getPublicacionesById2');
search.set('idPublicacion',  this.TemasForm.value.nota);
    this.http.get(url, {search}).subscribe(res => this.llenadoO(res.json() ));

}

}
