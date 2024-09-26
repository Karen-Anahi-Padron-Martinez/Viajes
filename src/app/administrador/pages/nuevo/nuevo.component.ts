import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hotel } from '../../interfaces/hotel.interface';
import { HotelesService } from '../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styles: ``
})
export class NuevoComponent
implements OnInit {
  // formulario reactivo
  public hotelForm = new FormGroup({
    id: new FormControl<string>(''),
    nombre: new FormControl<string>(''),
    categoria: new FormControl<string>(''),
    tipologia: new FormControl<string>(''),
    localizacion: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    accesibilidad: new FormControl<string>(''),
    num_habitaciones: new FormControl<string>(''),
    actividades: new FormControl<string>(''),
    servicios: new FormControl<string>(''),
    num_visitante_ideal: new FormControl<string>(''),
    fecha_ideal_visita: new FormControl<string>(''),
    segmento_mercado_potencial: new FormControl<string>(''),
    costo: new FormControl<string>(''),
    contacto: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  constructor(
    private hotelesService: HotelesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  get currentHotel(): Hotel {
    const hotel = this.hotelForm.value as Hotel;
    return hotel;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.hotelesService.getHotelById(id)),
      )
      .subscribe(hotel => {
        if (!hotel) {
          return this.router.navigateByUrl('/');
        }
        this.hotelForm.reset(hotel);
        return;
      });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) return;
    if (this.currentHotel.id) {
      this.hotelesService.updateHotel(this.currentHotel)
        .subscribe(() => {
          this.showSnackbar(`Hotel Actualizado Correctamente`);
        });
      return;
    }
    this.hotelesService.addHotel(this.currentHotel)
      .subscribe(hotel => {
        this.router.navigate(['/administrador/listado']);
        this.showSnackbar(`Hotel Guardado Correctamente`);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Listo', {
      duration: 2500,
    });
  }

  onDeleteHotel() {
    if (!this.currentHotel.id) throw Error('Hotel id es required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Paquete',
        message: `¿Está seguro de eliminar el paquete?`,
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.hotelesService.deleteHotelById(this.currentHotel.id)),
        tap(wasDeleted => console.log({ wasDeleted })),
      )
      .subscribe(() => {
        this.router.navigate(['administrador/listado']);
        this.showSnackbar(`Hotel Eliminado Correctamente`);
      });
  }

  goBack(): void {
    this.router.navigateByUrl('administrador/listado');
  }
}
