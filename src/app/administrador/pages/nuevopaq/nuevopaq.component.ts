
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
    id: new FormControl<string>(''),
    nombre: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    dia: new FormControl<string>(''),
    noche: new FormControl<string>(''),
    hotel: new FormControl<string>(''),
    restaurante: new FormControl<string>(''),
    experiencia: new FormControl<string>(''),
    actividad: new FormControl<string>(''),
    costo: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  constructor(
    private paquetesService: PaquetesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  get currentPaquete(): Paquete {
    const paquete = this.paqueteForm.value as Paquete;
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
        this.paqueteForm.patchValue(paquete);
        return;
      });
  }

  onSubmit(): void {
    if (this.paqueteForm.invalid) return;

    if (this.currentPaquete.id) {
      this.paquetesService.updatePaquete(this.currentPaquete)
        .subscribe(() => {
          this.showSnackbar(`Paquete Actualizado Correctamente`);
        });
      return;
    }

    this.paquetesService.addPaquete(this.currentPaquete)
      .subscribe(() => {
        this.router.navigate(['/administrador/listpaq']);
        this.showSnackbar(`Paquete Guardado Correctamente`);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Listo', {
      duration: 2500,
    });
  }

  onDeletePaquete(): void {
    if (!this.currentPaquete.id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Paquete',
        message: `¿Está seguro de eliminar el paquete?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paquetesService.deletePaqueteById(this.currentPaquete.id)
          .subscribe(() => {
            this.showSnackbar(`Paquete Eliminado Correctamente`);
            this.router.navigateByUrl('/administrador/listpaq');
          });
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/administrador/listpaq');
  }
}
