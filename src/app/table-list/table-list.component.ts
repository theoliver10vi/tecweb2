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

export class Nota 
{
  constructor(
 
    public encabezado: string, 
    public contenido: string,
 
 
    ) {  }

}


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
x=localStorage.getItem("id");

 mis_temas: Array<any>;
  constructor(private router: Router, private http: Http) { }
  Nota= {
 
            encabezado: '',
            contenido: '',
            tema:'',
            img:''
         };

  
  notaForm: FormGroup;
  ngOnInit() {
  	let url = `http://localhost:8081/tecwebBackEnd/temas/get/endpoint2.php`;
let search = new URLSearchParams();
    search.set('function', 'getTemasForDropdown');
    this.http.get(url, {search}).subscribe(res =>this.llenado(res.json()));

       this.notaForm = new FormGroup({
      'encabezado': new FormControl(this.Nota.encabezado, Validators.required), 
      'contenido': new FormControl(this.Nota.contenido, Validators.required), 
      'tema':       new FormControl( this.Nota.tema,  Validators.required),  
      'img':       new FormControl( this.Nota.img,  Validators.required),                         
                                      });
  }

  registerN( )
  {
        let url = `http://localhost:8081/tecwebBackEnd/usuario/post/endpoint2.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertPublicacion');
    formData.append('encabezado', this.notaForm.value.encabezado);
    formData.append('contenido', this.notaForm.value.contenido);
    formData.append('tema', this.notaForm.value.tema);
    formData.append('idUsuario', this.x);
    formData.append('img', this.notaForm.value.img);
 
    this.http.post(url, formData).subscribe(res => this.diplay2(res.json()));


    
  }
  diplay2(res: any){
    console.log(res);

    if(res.error==0){
      console.log(res);
      //this.data.changeGlobal(new Global(loginresp.id_usuario,loginresp.token,"http://lacocsmex.com.mx/laboratorio/API", "http://lacocsmex.com.mx/laboratorio/", loginresp.rol));
     // this.router.navigate([res.root+"/"]); this.diplay2(res.json())
     window.alert('Exito en el registro.')
     setTimeout(()=>{ this.router.navigate(['soporte/inserta-foto'])}, 1500);
    }else{
 window.alert('Verifica tus datos')
     // this.loginMessage=res.estado;
    }

  }
    get encabezado() { return this.notaForm.get('encabezado'); }

  get contenido() { return this.notaForm.get('contenido'); }

 get tema() { return this.notaForm.get('tema'); }

 get img() { return this.notaForm.get('img'); }

ver()
{
            console.log(this.notaForm.value.encabezado);
       console.log(this.notaForm.value.contenido);
  
console.log(this.notaForm.value.tema);
   //setTimeout(()=>{ this.router.navigate(['soporte/inserta-foto'])}, 1500);
}
    llenado(resp: any){
 
 
         this.mis_temas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_temas[_i]=resp[_i];
     // console.log(this.mis_temas[_i]);
    }
  }

}
