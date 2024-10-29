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
  
  constructor(private twitchService: TwitchService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getLiveStreams();
  }

  // Llama al servicio para obtener los streams en vivo
  getLiveStreams() {
    const gameId = '33214'; // ID del juego, ejemplo: 33214 es el ID para "Travel & Outdoors"
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
}


