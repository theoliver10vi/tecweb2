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
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(private router: Router,
private http: Http,private route: ActivatedRoute) { }

  ngOnInit() {
              let url = `${this.api}/usuario/get/endpoint2.php`;
let search = new URLSearchParams();
    search.set('function', 'getPublicacionesForSearch');
    search.set('Tema',  this.auxiliar);
    this.http.get(url, {search}).subscribe(res =>this.llenadoP(res.json()));

    search = new URLSearchParams();
    search.set('function', 'getUsuarios');

    this.http.get(url, {search}).subscribe(res =>this.llenadoU(res.json()));

          this.TemasForm = new FormGroup({
      'nota': new FormControl(this.Tema.nota, Validators.required), 
                       
                                      });
  }
auxiliar= localStorage.getItem("idTemas");
hidden=false;
 encabezado=" ";
contenido=" ";
autor=" ";
img;
valP=0;
valN=0;
  mis_publicaciones2: Array<any>;
  mis_publicaciones: Array<any>;
  mis_usuarios: Array<any>;
   api="http://localhost:8081/tecwebBackEnd";

  llenadoP(resp: any)
  {
   // console.log(resp);
    this.mis_publicaciones= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones[_i]=resp[_i];
    }
 
    //console.log( this.mis_publicaciones );
    //console.log(this.mis_publicaciones.length);
         //this.auxiliar1=this.mis_publicaciones.length;
 
  }


  get nota() { return this.TemasForm.get('nota'); }

 Tema= {
 
            nota: '',
          };

  
  TemasForm: FormGroup;

cambio( )

{
 
    this.hidden=!this.hidden;
     let url = `${this.api}/usuario/get/endpoint2.php`;
    let search = new URLSearchParams();
    search.set('function', 'getPublicacionesById');
search.set('idPublicacion',  this.TemasForm.value.nota);
    this.http.get(url, {search}).subscribe(res => this.llenadoO(res.json() ));

}

llenadoO(resp: any)
  {
    console.log(resp);
    this.mis_publicaciones2= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones2[_i]=resp[_i];
    }
 
    console.log( this.mis_publicaciones2 );
    //console.log(this.mis_publicaciones.length);
         //this.auxiliar1=this.mis_publicaciones.length;
 this.contenido=this.mis_publicaciones2[0].Descripcion;
    this.encabezado=this.mis_publicaciones2[0].Nombre;
    this.valP=this.mis_publicaciones2[0].ValoracionPositiva;
    this.valN=this.mis_publicaciones2[0].ValoracionNegativa;
this.img= this.mis_publicaciones2[0].UrlImagen.indexOf("https"); 
    if(this.img!=-1)
{this.img=this.mis_publicaciones2[0].UrlImagen;}
else
{this.img=this.api+"/"+this.mis_publicaciones2[0].UrlImagen;}
    for (var _i = 0; _i < this.mis_usuarios.length; _i++ )
    {
      if(this.mis_publicaciones2[0].idUser==this.mis_usuarios[_i].idUser)
        {     this.autor =this.mis_usuarios[_i].User;}

  
    }

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

}
