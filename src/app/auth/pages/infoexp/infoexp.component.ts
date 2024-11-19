import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Experiencia } from '../../interfaces/experiencia.interface';
import { ExperienciasService } from '../../services/experiencias.service';
@Component({
  selector: 'app-infoexp',
  templateUrl: './infoexp.component.html',
  styleUrl: './infoexp.component.css'
})
export class InfoexpComponent
implements OnInit{
  public experiencia?: Experiencia;
  private map?: L.Map;
  private destinationMarker?: L.Marker;
  private routingControl?: any;
  constructor(
    private experienciasService:ExperienciasService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.experienciasService.getExperienciaById(id) ),
      )
      .subscribe( experiencia => {
        if ( !experiencia) return this.router.navigate(['/auth/experiencias']);

        this.experiencia = experiencia;
        console.log(experiencia);
        return;
      })
  }

  ngAfterViewInit(): void {
    // Ensure the map is properly initialized
    this.map = L.map('map', {
      boxZoom: false
    }).setView([21.153870815136134, -100.93065831029644], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const defaultIcon = L.icon({
      iconUrl: 'assets/icons/here.png',
      shadowUrl: 'assets/icons/here1.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: L.LatLngTuple = [position.coords.latitude, position.coords.longitude];

        L.marker(userLocation, { icon: defaultIcon }).addTo(this.map!)
          .bindPopup('Ubicación actual').openPopup();

        if (this.experiencia?.coordenadas) {
          const [lat, lng] = this.experiencia.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
          const destinationLocation: L.LatLngTuple = [lat, lng];
          this.updateDestinationMarker(destinationLocation);
          const Routing: any = (L as any).Routing;
          this.routingControl = Routing.control({
            waypoints: [
              L.latLng(userLocation),
              L.latLng(destinationLocation)
            ],
            createMarker: () => null
          }).addTo(this.map!);

          this.map!.fitBounds(this.routingControl.getWaypoints().map((waypoint: any) => waypoint.latLng));
        }
      }, () => {
        alert('Error al obtener la ubicación. Asegúrate de que los servicios de ubicación están habilitados.');
      });
    } else {
      alert('Geolocalización no es soportada en este navegador.');
    }
  }

  private updateDestinationMarker(destinationLocation: L.LatLngTuple): void {
    if (this.destinationMarker) {
      this.destinationMarker.setLatLng(destinationLocation);
    } else {
      this.destinationMarker = L.marker(destinationLocation).addTo(this.map!)
        .bindPopup('Ubicación de destino').openPopup();
    }
  }
  goBack():void{
    this.router.navigateByUrl('auth/experiencias')
  }

}
