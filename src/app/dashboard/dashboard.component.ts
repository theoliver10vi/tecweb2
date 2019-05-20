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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  api="http://localhost:8081/tecwebBackEnd"
  encabezado=" ";
contenido=" ";
autor=" ";
img=" ";
id;
random=2;
auxiliar1=1;
auxiliar2=9;
auxiliar3;
auxiliar4;
auxiliar5;
auxiliar6;
auxiliar7;
auxiliar8;
auxiliar9;
un;
valP=0;
valN=0;
   mis_publicaciones: Array<any>;
   mis_usuarios: Array<any>;
  constructor(private router: Router,
private http: Http,private route: ActivatedRoute) { }

  ngOnInit() { 


    this.mostrar();
  }

mostrar()
{
      let url = `${this.api}/usuario/get/endpoint2.php`;
    let search = new URLSearchParams();
    search.set('function', 'getPublicaciones');

    this.http.get(url, {search}).subscribe(res =>this.llenadoP(res.json()));


    search = new URLSearchParams();
    search.set('function', 'getUsuarios');

    this.http.get(url, {search}).subscribe(res =>this.llenadoU(res.json()));


  this.id=setInterval(() => {
    this.aleatorio(); 
  }, 5000);
  //setInterval(this.cambio(), 3000);
 // setInterval(this.cambio(), 3000);
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

    for (var _i = 0; _i < this.auxiliar1; _i++ )
    {
      if(this.mis_publicaciones[this.random].idUser==this.mis_usuarios[_i].idUser)
        {     this.autor =this.mis_usuarios[_i].User;}

  
    }
}

 positivo(){
   this.reporte("positivo");
   this.auxiliar2=  Math.floor(Number(this.valP)) +2;
 this.auxiliar3=this.auxiliar2;

    let url = `${this.api}/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'positivo');
    formData.append('puntos', this.auxiliar3);
    formData.append('idPublicacion', this.auxiliar4);  

    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });


    
  }

     respuestaSwitch(res: any){
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
          //this.cargando=0;
          clearInterval(this.id);
          console.log("exito");
              this.mostrar();
       //window.alert("Insertado con exito.");
     }
   }

        respuestaSwitch2(res: any){
     if(res.error!= 0){
       window.alert("fallo reporte");
       location.reload();
     }
     else{
          //this.cargando=0;
          console.log("exito");
               
       //window.alert("Insertado con exito.");
     }
   }

     notannegativo(){
       this.reporte("negativo")
     this.auxiliar2=  Math.floor(Number(this.valN)) +1;
  this.auxiliar3=this.auxiliar2;
     let url = `${this.api}/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'negativo');
    formData.append('puntos', this.auxiliar3);
    formData.append('idPublicacion', this.auxiliar4);  

    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });

  }

 negativo(){
   this.reporte("muy negativo")
     this.auxiliar2=  Math.floor(Number(this.valN)) +2;
  this.auxiliar3=this.auxiliar2;
     let url = `${this.api}/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'negativo');
    formData.append('puntos', this.auxiliar3);
    formData.append('idPublicacion', this.auxiliar4);  

    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
  }


 reporte(valtio: any)
{
        this.auxiliar5=localStorage.getItem("id");
this.auxiliar6=localStorage.getItem("EC");
this.auxiliar7=localStorage.getItem("Gen");
     let url = `${this.api}/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'reporte');
    formData.append('idUsuario', this.auxiliar5);
    formData.append('Genero', this.auxiliar7); 
    formData.append('EstadoC', this.auxiliar6);
    formData.append('idPublicacion', this.auxiliar4);
    formData.append('Valoracion', valtio);  
            

    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch2(res.json());
                                            });
  }


  llenadoP(resp: any)
  {
    console.log(resp);
    this.mis_publicaciones= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones[_i]=resp[_i];
    }
 
    console.log( this.mis_publicaciones );
    //console.log(this.mis_publicaciones.length);
         this.auxiliar1=this.mis_publicaciones.length;
 
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
