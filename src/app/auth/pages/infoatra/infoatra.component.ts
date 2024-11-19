import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { AtractivosService } from '../../services/atractivo.service';
@Component({
  selector: 'app-infoatra',
  templateUrl: './infoatra.component.html',
  styleUrl: './infoatra.component.css'
})
export class InfoatraComponent implements OnInit{
  public atractivo?: Atractivo;
  private map?: L.Map;
  private destinationMarker?: L.Marker;
  private routingControl?: any;
  constructor(
    private atractivosService:AtractivosService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.atractivosService.getAtractivoById(id) ),
      )
      .subscribe( atractivo => {
        if ( !atractivo) return this.router.navigate(['/auth/experiencias']);

        this.atractivo = atractivo;
        console.log(atractivo);
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

        if (this.atractivo?.coordenadas) {
          const [lat, lng] = this.atractivo.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
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


