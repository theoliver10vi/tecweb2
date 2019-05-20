import { Component, OnInit } from '@angular/core';
//import { DataService } from "../../data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Rx';
//import { Global } from "../../interfaces/int.Global";
import { HttpClient, HttpParams,HttpEventType }    from '@angular/common/http';

@Component({
  selector: 'app-insertar-foto',
  templateUrl: './insertar-foto.component.html',
  styleUrls: ['./insertar-foto.component.scss']
})
export class InsertarFotoComponent implements OnInit {
   
  id: string;
  crearMessage: string= "";
  crearMessageCargando: string= "";
  value= 0;

  constructor(private router: Router, 
              private http: HttpClient, 
              private http2: Http, 
 
              private route: ActivatedRoute) { }

  ngOnInit() {
 
  }

  fileToUpload: File = null; //Variable default para un archivo seleccionado.

  cancelar()
  {
    this.router.navigate(['soporte/crear-nota']);
  }
  
  
  handleFileInput(files: FileList) {   
	 if(files.length > 0){
 
    let url = `http://localhost:8081/tecwebBackEnd/usuario/post/endpoint.php`;
	 	this.fileToUpload = files[0];
	 	let formData:FormData = new FormData();
	 	formData.append('uploadFile', this.fileToUpload, this.fileToUpload.name);
    formData.append('function', 'upLoadFoto');
 
 
	 	console.log(formData);
    let search = new HttpParams();
    search.set('function', 'upLoadFoto');
 
    this.crearMessageCargando="Cargando...";
		this.http.post(url, formData, { params: search, reportProgress: true, observe: 'events'})
			.subscribe(
				event =>{
                   if(event.type ===HttpEventType.UploadProgress){
                     this.crearMessageCargando='UploadProgress: ' + Math.round(event.loaded / event.total * 100) + "%";
                                   this.value =Math.round(event.loaded / event.total * 100);
                   }else if(event.type ===HttpEventType.Response){
                     this.doIt(event.body);
                   }
                },
                error =>{
                   console.log(error);
                }
               )
	 }

  }
  doIt(objeto : any){
    console.log(objeto);
    if(objeto.error==0){
      this.crearMessage=""
      this.crearMessageCargando=objeto.estatus;
      console.log(objeto);
      setTimeout(()=>{ this.router.navigate(['soporte/crear-nota'])}, 1500)
       
    }else{
      this.crearMessageCargando="";
      window.alert(objeto.estatus);
      switch (objeto.error) {
        case 1:
          
          this.crearMessage=objeto.estatus;
          window.alert(this.crearMessage);
          console.log(objeto);
           
          break;
        case 2:
          this.crearMessage=objeto.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
  }
} 


