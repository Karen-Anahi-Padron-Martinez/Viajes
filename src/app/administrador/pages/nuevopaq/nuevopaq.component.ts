import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaquetesService } from '../../services/paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Paquete } from '../../interfaces/paquete.interface';

@Component({
  selector: 'app-nuevopaq',
  templateUrl: './nuevopaq.component.html',
  styles: []
})
export class NuevopaqComponent implements OnInit {
  public hoteles: any[] = [];
  public restaurantes: any[] = [];
  public experiencias: any[] = [];

  // Formulario reactivo
  public paqueteForm = new FormGroup({
    id: new FormControl<number>(0),
    nombre: new FormControl<string>(''),

    descripcion: new FormControl<string>(''),
    dia: new FormControl<number>(0),
    noche: new FormControl<number>(0),
    hotel: new FormControl<string>(''),
    restaurante: new FormControl<string>(''),
    experiencia: new FormControl<string>(''),
    actividad: new FormControl<string>(''),
    costo: new FormControl<number>(0),
    alt_img: new FormControl<string>(''),
  });

  constructor(
    private paquetesService: PaquetesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  get currentPaquete(): Paquete {
    const paquete = this.paqueteForm.value as unknown as Paquete;
    return paquete;
  }

  ngOnInit(): void {
    this.paquetesService.getHoteles().subscribe(data => this.hoteles = data);
    this.paquetesService.getRestaurantes().subscribe(data => this.restaurantes = data);
    this.paquetesService.getExperiencias().subscribe(data => this.experiencias = data);

    if (!this.router.url.includes('editarpaq')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paquetesService.getPaqueteById(id)),
      ).subscribe(paquete => {
        if (!paquete) {
          return this.router.navigateByUrl('/');
        }
        const paqueteFormData = {
      id: paquete.id,
      nombre: paquete.nombre,
      descripcion: paquete.descripcion,
      dia: paquete.dia,
      noche: paquete.noche,
      hotel: paquete.hotel,
      restaurante: paquete.restaurante,
      experiencia: paquete.experiencia,
      actividad: paquete.actividad,
      costo: paquete.costo,
      alt_img: paquete.alt_img,
    };
    this.paqueteForm.patchValue(paqueteFormData);
    return;
      });
  }

  onSubmit(): void {
    if (this.paqueteForm.invalid) return;

    if (this.currentPaquete.id) {
      this.paquetesService.updatePaquete(this.currentPaquete)
        .subscribe(paquete => {
          this.showSnackbar(`${paquete.nombre} updated`);
        });
      return;
    }

    this.paquetesService.addPaquete(this.currentPaquete)
      .subscribe(paquete => {
        this.router.navigate(['/administrador/editarpaq', paquete.id]);
        this.showSnackbar(`${paquete.nombre} created`);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  onDeletePaquete(): void {
    if (!this.currentPaquete.id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Paquete',
        message: `¿Estás seguro de eliminar el paquete ${this.currentPaquete.nombre}?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paquetesService.deletePaqueteById(this.currentPaquete.id)
          .subscribe(() => {
            this.showSnackbar(`Paquete eliminado`);
            this.router.navigateByUrl('/administrador');
          });
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/administrador');
  }
}
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { PaquetesService } from '../../services/paquete.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { filter, switchMap, tap } from 'rxjs';
// import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
// import { Paquete } from '../../interfaces/paquete.interface';

// @Component({
//   selector: 'app-nuevopaq',
//   templateUrl: './nuevopaq.component.html',
//   styles: []
// })
// export class NuevopaqComponent implements OnInit {
//   public hoteles: any[] = [];
//   public restaurantes: any[] = [];
//   public experiencias: any[] = [];

//   // Formulario reactivo
//   public paqueteForm = new FormGroup({
//     id: new FormControl<string>(''),
//     nombre: new FormControl<string>(''),
//     descripcion: new FormControl<string>(''),
//     hotel: new FormControl<string>(''),
//     restaurante: new FormControl<string>(''),
//     experiencia: new FormControl<string>(''),
//     actividad: new FormControl<string>(''),
//     alt_img: new FormControl<string>(''),
//   });

//   constructor(
//     private paquetesService: PaquetesService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//     private snackbar: MatSnackBar,
//     private dialog: MatDialog,
//   ){}

//   get currentPaquete(): Paquete {
//     const paquete = this.paqueteForm.value as Paquete;
//     return paquete;
//   }

//   ngOnInit(): void {
//     this.paquetesService.getHoteles().subscribe(data => this.hoteles = data);
//     this.paquetesService.getRestaurantes().subscribe(data => this.restaurantes = data);
//     this.paquetesService.getExperiencias().subscribe(data => this.experiencias = data);

//     if (!this.router.url.includes('editarpaq')) return;

//     this.activatedRoute.params
//       .pipe(
//         switchMap(({ id }) => this.paquetesService.getPaqueteById(id)),
//       ).subscribe(paquete => {
//         if (!paquete) {
//           return this.router.navigateByUrl('/');
//         }
//         this.paqueteForm.patchValue(paquete);
//         return;
//       });
//   }

//   onSubmit(): void {
//     if (this.paqueteForm.invalid) return;

//     if (this.currentPaquete.id) {
//       this.paquetesService.updatePaquete(this.currentPaquete)
//         .subscribe(paquete => {
//           this.showSnackbar(`${paquete.nombre} updated`);
//         });
//       return;
//     }

//     this.paquetesService.addPaquete(this.currentPaquete)
//       .subscribe(paquete => {
//         this.router.navigate(['/administrador/editarpaq', paquete.id]);
//         this.showSnackbar(`${paquete.nombre} created`);
//       });
//   }

//   showSnackbar(message: string): void {
//     this.snackbar.open(message, 'done', {
//       duration: 2500,
//     });
//   }
//   onDeletePaquete(): void {
//     if (!this.currentPaquete.id) return;

//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       data: {
//         title: 'Eliminar Paquete',
//         message: `¿Estás seguro de eliminar el paquete ${this.currentPaquete.nombre}?`,
//       },
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.paquetesService.deletePaqueteById(this.currentPaquete.id)
//           .subscribe(() => {
//             this.showSnackbar(`Paquete eliminado`);
//             this.router.navigateByUrl('/administrador');
//           });
//       }
//     });
//   }

//   goBack(): void {
//     this.router.navigateByUrl('/administrador');
//   }
// }

