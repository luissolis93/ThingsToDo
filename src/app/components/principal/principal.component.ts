import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForDoService } from '../../service/for-do.service';
import { ContentThing, Thing } from 'src/app/interface/thing.interface';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  public Formulario:FormGroup;
  public Things:ContentThing[];

  constructor(private _forDoService:ForDoService) { 
    this.ShowThings();
  }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm(){

    this.Formulario= new FormGroup({
      thing:new FormControl(null,[Validators.required,Validators.minLength(10)])
    })
  }

  public ObtenerThing(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      })
     this._forDoService.PostThing(this.Formulario.value).subscribe((data)=>{    
      Toast.fire({
        icon: 'success',
        title: 'Guardado Correctamente'
      })
      this.Formulario.reset();
  });

  }

  public ShowThings(){
    this._forDoService.GetThings().subscribe(
      (data:Thing)=>{
        // console.log(data);
        this.Things=data.Things;        
      }
    )
  }

  public CambiarStatus(thing:ContentThing){
    // console.log(thing);
    thing.complete=!thing.complete
    // console.log(thing.complete);
    this._forDoService.PutThing(thing).subscribe(
      (data)=>{},
      error=>{console.log(error.statusText)}
    );
    

  }

  public EliminarTarea(thingID){
    Swal.fire({
      title: '¿Deseas eliminar la tarea?',
      text: "No se podra revertir la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this._forDoService.DeleteThing(thingID).subscribe(
          ()=>{
            Swal.fire(
              'Eliminada!',
              'Tu tarea ha sido eliminada.',
              'success'
            )
          }
        );        
      }
    })

    
    
  }

}
