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

export class Busca 
{
  constructor(
 
    public nombre: string, 
 
 
    ) {  }

}
 
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'files_single-copy-04', class: '' },
    { path: 'relevancia', title: 'Relevancia',  icon:'ui-1_check', class: '' },


    { path: 'crear-nota', title: 'Crear Nota',  icon:'design_bullet-list-67', class: '' },
    { path: 'reporte', title: 'Reporte',  icon:'files_paper', class: '' }, 
    { path: 'soporte/login', title: 'Log Out',  icon:'media-1_button-power', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
 

 
  auxiliars;
  
     api="http://localhost/tecwebBackEnd"
  buscaForm: FormGroup;



  Busca= {
 
            nombre: '',
            }; 


    constructor(  private router: Router, private http: Http) {
     }
 

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
     this.buscaForm = new FormGroup({
          'nombre': new FormControl(this.Busca.nombre, Validators.required), 
                                
                                      });
  }

     get nombre() { return this.buscaForm.get('nombre'); }

    onEnter( ) {
                    let url = `${this.api}/temas/get/endpoint2.php`;
    let search = new URLSearchParams();
    search.set('function', 'getTemasForSearch');
 search.set('Tema', this.buscaForm.value.nombre);
    this.http.get(url, {search}).subscribe(res =>this.redirecciona(res.json()));
 
 }
 


redirecciona(res: any){
  
    if(res.error==0){
     //
   console.log(res.idTemas.idTemas);
      this.auxiliars=res.idTemas.idTemas;
    localStorage.setItem("idTemas",this.auxiliars);
         this.router.navigate([ "soporte/respuesta"]);
    }else{
       window.alert(res.estado);
       

    }
}

  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
