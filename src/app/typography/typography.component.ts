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
import * as jsPDF from 'jspdf';

export class Reporte 
{
  constructor(
 
    public nota: string, 
 
 
 
    ) {  }

}



@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
op;
op2;
  constructor(private router: Router, private http: Http) { }
x=localStorage.getItem("id");
v;
qu;
  ngOnInit() {


  	  	let url = `http://localhost:8081/tecwebBackEnd/usuario/get/endpoint2.php`;
let search = new URLSearchParams();
    search.set('function', 'getPublicacionesForDropdown');
      search.set('idUsu', this.x);
    this.http.get(url, {search}).subscribe(res =>this.llenado(res.json()));
 
  search = new URLSearchParams();
    search.set('function', 'getReporte');
    this.http.get(url, {search}).subscribe(res =>this.llenadoX(res.json()));

 search = new URLSearchParams();
    search.set('function', 'getUsuarios');

    this.http.get(url, {search}).subscribe(res =>this.llenadoU(res.json()));

       url = `http://localhost:8081/tecwebBackEnd/temas/get/endpoint2.php`;
search = new URLSearchParams();
    search.set('function', 'getTemasForDropdown');

    this.http.get(url, {search}).subscribe(res =>this.llenadoT(res.json()));

          this.reporteForm = new FormGroup({
      'nota': new FormControl(this.Reporte.nota, Validators.required), 
                       
                                      });
  }

  get nota() { return this.reporteForm.get('nota'); }
  
  Reporte= {
 
            nota: '',
          };
vas;
adyz;
ka;
pa;
  mis_usuarios: Array<any>;
  reporteForm: FormGroup;
 mis_publicaciones: Array<any>;
 mis_reportes: Array<any>;
  mis_temas: Array<any>;
    llenado(resp: any){
 
 
         this.mis_publicaciones= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_publicaciones[_i]=resp[_i];
     // console.log(this.mis_temas[_i]);
    }
  }

      llenadoX(resp: any){
 
 
         this.mis_reportes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_reportes[_i]=resp[_i];
     // console.log(this.mis_temas[_i]);
    this.qu=resp.length;
    }
  }
      llenadoT(resp: any){
 
 
         this.mis_temas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_temas[_i]=resp[_i];
     // console.log(this.mis_temas[_i]);
    }
  }
   co = 50;
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
pageHeight;
  downloadPDF(){

    for (var _i = 0; _i < this.mis_publicaciones.length; _i++ )
    {
      if(this.mis_publicaciones[_i].idPublicaciones==this.reporteForm.value.nota)
        {     this.op =this.mis_publicaciones[_i].Nombre;
              this.op2 =this.mis_publicaciones[_i].Temas_idTemas;
        }

  
    }
    for (var _i = 0; _i < this.mis_temas.length; _i++ )
    {
      if(this.mis_temas[_i].idTemas==this.op2)
        {     this.v =this.mis_temas[_i].Nombre;}

  
    }
    //this.op=this.reporteForm.value.nota;
    console.log(this.reporteForm.value.nota);
    console.log(this.mis_publicaciones);
    console.log(this.mis_reportes);
    console.log();
    //console.log(this.mis_publicaciones[this.op].Nombre);
    var doc = new jsPDF();
   this.pageHeight= doc.internal.pageSize.height;
   //y = 500
 console.log(this.vas );
     console.log(this.adyz );
      console.log(this.ka );
       console.log(this.pa );
   
        //doc.text(20, y, "value");
        doc.text(20, 20, 'Reporte sobre  la publicacion:' );
        doc.setFontType("bold");
        doc.text(20, 30,this.op);
        doc.setFontType("normal");
        doc.text(20, 40, 'Tema: '+ this.v);  
         for (var _i = 0; _i < this.qu; _i++ ){
 for (var _i = 0; _i < this.mis_usuarios.length; _i++ )
    {
      if(this.mis_usuarios[_i].idUser==this.mis_reportes[this.qu-1].idUsuario)
        {     this.vas =this.mis_usuarios[_i].User;
              this.adyz =this.mis_usuarios[_i].Genero;
              this.ka =this.mis_usuarios[_i].EstadoC;
              this.pa =this.mis_usuarios[_i].Edad;

        }

  
    }
        doc.text(20, this.co, 'Usuario: '+ this.vas);    
        doc.text(20, this.co+10, 'Genero: '+ this.adyz );
        doc.text(20, this.co+20, 'Edad: '+ this.pa +' años' );
        doc.text(20, this.co+30, 'Estado civil: '+ this.ka); 
        doc.text(20, this.co+40, 'Valoracion: '+ this.mis_reportes[this.qu-1].Valoracion);
        this.co= this.co+30;
        if (this.co >=  this.pageHeight)
{
  doc.addPage();
  this.co = 20 // Restart height position
}  
        }
        doc.save('Reporte.pdf');
             

  }
      

}
