// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ItinerariosService } from '../../services/itinerario.service';
// import { switchMap } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Actividad } from '../../interfaces/actividad.interface';
// import { Itinerario } from '../../interfaces/itinerario.interface';

// @Component({
//   selector: 'app-nuevoiti',
//   templateUrl: './nuevoiti.component.html',
//   styles: ``
// })
// export class NuevoitiComponent implements OnInit{

//   public form:FormGroup | undefined;
//   public actividadesArray:Actividad[] | undefined


//   constructor(
//     private fb:FormBuilder,
//     private itinerariosService:ItinerariosService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//   )
//     {
//     this.formInit();
//   }
//   // ngAfterViewInit(): void {
//   // this.actividadesArray!.forEach(itinerario=> this.fillActividad(itinerario))
//   // }

//   ngOnInit(): void {

//     if (!this.router.url.includes('editariti')) return;

//     this.activatedRoute.params
//       .pipe(
//         switchMap(({ id }) => this.itinerariosService.getItinerarioById(id)),
//       ).subscribe(itinerario => {
//         if (!itinerario) {
//           return this.router.navigateByUrl('/');
//         }
//         console.log(itinerario);

//         // this.form!.patchValue(itinerario);
//         this.actividadesArray = itinerario.actividades;
//         // itinerario.actividades.forEach(itinerario=> this.fillActividad(itinerario))
//         this.form!.patchValue({nombre:itinerario.nombre,actividades:itinerario.actividades})

//         return;
//       });

//   }

//   private formInit(){
//     this.form = this.fb.group({
//       nombre: ['',[Validators.required]],
//       actividades: this.fb.array([
//         this.fb.group({
//           actividad:['', [Validators.required]],
//           dia:['', [Validators.required]],
//           hora:['', [Validators.required]]
//         })
//       ])
//     });
//   }

//   public get actividades(){
//     return this.form!.get('actividades') as FormArray;
//   }

//   // get currentItinerario(): Itinerario {
//   //   const paquete = this.form!.value as Itinerario;
//   //   return paquete;
//   // }

//   public addActividad(){
//     const actividad = this.fb.group({
//       actividad:['', [Validators.required]],
//       dia:['', [Validators.required]],
//       hora:['', [Validators.required]]
//     })
//     this.actividades.push(actividad)
//   }

//   public fillActividad(actividad:Actividad){
//     const objetoactividad = this.fb.group({
//       actividad:[`${actividad.actividad}`, [Validators.required]],
//       dia:[`${actividad.dia}`, [Validators.required]],
//       hora:[`${actividad.hora}`, [Validators.required]]
//     })
//     this.actividades.push(actividad)
//   }

//   public removeActividad(index: number){
//     this.actividades.removeAt(index)
//   }

//   public submitForm(){
//     console.log(this.form);
//     console.log(this.form!.getRawValue());
//     this.itinerariosService.addItinerario(this.form!.value)
//     .subscribe(
//       itinerario => console.log(itinerario)
//     )
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItinerariosService } from '../../services/itinerario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Itinerario } from '../../interfaces/itinerario.interface';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nuevoiti',
  templateUrl: './nuevoiti.component.html',
  styles: ``
})
export class NuevoitiComponent implements OnInit{
  //formulario reactivo
  public itinerarioForm = new FormGroup({
    id: new FormControl<string>(''),
    nombre: new FormControl<string>(''),
    dia_1: new FormControl<string>(''),
    actividades_dia_1: new FormControl<string>(''),
    dia_2: new FormControl<string>(''),
    actividades_dia_2: new FormControl<string>(''),
    dia_3: new FormControl<string>(''),
    actividades_dia_3: new FormControl<string>(''),
    dia_4: new FormControl<string>(''),
    actividades_dia_4: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });
  constructor(
    private itinerariosService: ItinerariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  get currentItinerario():Itinerario{
    const itinerario = this.itinerarioForm.value as Itinerario;
    return itinerario;
  }

  ngOnInit():void {

    if (!this.router.url.includes('editariti') ) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.itinerariosService.getItinerarioById( id) ),
    ).subscribe(itinerario =>{

      if ( !itinerario ) {
        return this.router.navigateByUrl('/');
      }
      this.itinerarioForm.reset( itinerario );
      return;
    });

  }
  onSubmit():void {
    if ( this.itinerarioForm.invalid ) return;
    if ( this.currentItinerario.id) {
      this.itinerariosService.updateItinerario(this.currentItinerario)
      .subscribe( itinerario => {
        this.showSnackbar(`Itinerario Actualizado Correctamente`);
      } );
      return;
    }
    this.itinerariosService.addItinerario( this.currentItinerario )
    .subscribe(() => {
      this.router.navigate(['/administrador/listpaq']);
      this.showSnackbar(`Itinerario Guardado Correctamente`);
    });

  }
  showSnackbar(message: string ):void{
    this.snackbar.open( message, 'Listo',{
      duration: 2500,
    })
  }
  // onDeleteItinerario(){
  //   if ( !this.currentItinerario.id ) throw Error('Itinerario id es required')
  //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //       data:this.itinerarioForm.value
  //     });

  //     dialogRef.afterClosed()
  //      .pipe(
  //       filter((result: boolean) => result),
  //       switchMap( () => this.itinerariosService.deleteItinerarioById( this.currentItinerario.id)),
  //       tap( wasDeleted => console.log({ wasDeleted})),
  //      )
  //      .subscribe(result =>{
  //         this.router.navigate(['administrador/listpaq'])
  //      })
  // }
  onDeleteItinerario(): void {
    if (!this.currentItinerario.id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Itinerario',
        message: `¿Está seguro de eliminar el itinerario?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itinerariosService.deleteItinerarioById(this.currentItinerario.id)
          .subscribe(() => {
            this.showSnackbar(`Itinerario Eliminado Correctamente`);
            this.router.navigateByUrl('/administrador/listpaq');
          });
      }
    });
  }

  goBack():void{
    this.router.navigateByUrl('administrador/listpaq')
  }

}


