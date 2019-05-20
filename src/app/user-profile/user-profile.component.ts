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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  Usuario= {
 
            user: '',
            pass: '',
            Edad: '',
            genero: '',
            tema:'',
            estado: ''};
    generos= [{"genero":"Hombre", "id":"Hombre"},              {"genero":"Otro", "id":"Otro"},
               {"genero":"Mujer", "id":"Mujer"},     
            ];
             mis_temas: Array<any>;
estados=[{"estado":"Soltero/a", "id":"Soltero"},              {"estado":"Comprometido/a", "id":"Comprometido"},
               {"estado":"En Relación", "id":"Relacion"}, {"estado":"Casado/a", "id":"Casado"},              
               {"estado":"Unión libre", "id":"Union libre"},
               {"estado":"Separado/a", "id":"Separado"},  {"estado":"Divorciado/a", "id":"Divorciado"},
               {"estado":"Viudo/a", "id":"Viudo"}  ];
  
  userForm: FormGroup;

  constructor() { }

  ngOnInit() {

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

}
