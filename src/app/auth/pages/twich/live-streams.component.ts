import { Component, OnInit } from '@angular/core';
import { TwitchService } from '../../services/twitch.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-live-streams',
  templateUrl: './live-streams.component.html',
  styleUrls: ['./live-streams.component.css']
})
export class LiveStreamsComponent implements OnInit {
  liveStreams: any[] = [];
  streamStatus: string = '';
  streamUrl: SafeResourceUrl | null = null;
  
  constructor(private twitchService: TwitchService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getLiveStreams();
    this.verificarStream('karenj2405');
  }

  // Llama al servicio para obtener los streams en vivo
  getLiveStreams() {
    const gameId = '509672'; // ID del juego, ejemplo: 33214 es el ID para "Travel & Outdoors"
    this.twitchService.getLiveStreams(gameId).subscribe(
      (response: any) => {
        this.liveStreams = response.data;
        console.log(this.liveStreams); // Verifica que los datos lleguen correctamente
      },
      (error) => {
        console.error('Error obteniendo transmisiones en vivo:', error);
      }
    );
  }

  // Sanitiza la URL del stream para usarla en un iframe
  getSafeUrl(channelName: string): SafeResourceUrl {
    const url = `https://player.twitch.tv/?channel=${channelName}&parent=localhost`; // Reemplaza 'localhost' con tu dominio
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  verificarStream(username: string): void {
    this.twitchService.getStreamStatus(username).subscribe(response => {
      if (response.data.length > 0) {
        console.log('El usuario está en vivo', response.data);
        this.streamUrl = this.getSafeUrl(username);
      } else {
        console.log('El usuario no está en vivo');
      }
    }, error => {
      this.streamStatus = 'Error al obtener el estado del stream';
      console.error('Error al obtener el estado del stream', error);
    });
  }
}


