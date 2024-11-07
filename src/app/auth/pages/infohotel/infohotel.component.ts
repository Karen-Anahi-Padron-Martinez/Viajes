import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HotelesService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine'; // Ensure this import is correct and installed

@Component({
  selector: 'app-infohotel',
  templateUrl: './infohotel.component.html',
  styleUrls: ['./infohotel.component.css']
})
export class InfohotelComponent implements OnInit, AfterViewInit {
  public hotel?: Hotel;
  private map?: L.Map;
  private destinationMarker?: L.Marker;
  private routingControl?: any;

  constructor(
    private hotelesService: HotelesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(({ id }) => this.hotelesService.getHotelById(id)),
    )
    .subscribe(hotel => {
      if (!hotel) {
        this.router.navigate(['/auth/atractivos']); // Corrected: No return needed
        return; // Exit early if hotel is not found
      }

      this.hotel = hotel; // Set the hotel data
      console.log(hotel); // Log the hotel for debugging purposes
    });
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
      iconUrl: '/assets/icons/marker-icon-2x.png',
      shadowUrl: '/assets/icons/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: L.LatLngTuple = [position.coords.latitude, position.coords.longitude];

        L.marker(userLocation, { icon: defaultIcon }).addTo(this.map!)
          .bindPopup('Ubicación actual').openPopup();

        if (this.hotel?.coordenadas) {
          const [lat, lng] = this.hotel.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
          const destinationLocation: L.LatLngTuple = [lat, lng];

          this.updateDestinationMarker(destinationLocation);

          // Use "any" to bypass TypeScript's type checking for Routing
          const Routing: any = (L as any).Routing;

          this.routingControl = Routing.control({
            waypoints: [
              L.latLng(userLocation),
              L.latLng(destinationLocation)
            ],
            createMarker: () => null // Disable default waypoint markers
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

  goBack(): void {
    this.router.navigateByUrl('auth/listalugar');
  }
}
