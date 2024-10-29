import { Component, OnInit } from '@angular/core';
import { VimeoService } from '../../services/vimeo.service';
//import { VimeoService } from './vimeo.service'; // Asegúrate de que la ruta esté correcta

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  //styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  videos: any[] = [];

  constructor(private vimeoService: VimeoService) { }

  ngOnInit(): void {
    this.searchTourismVideos();
  }

  searchTourismVideos() {
    this.vimeoService.searchVideos('tourism').subscribe(response => {
      this.videos = response.data;  // Vimeo devuelve los videos en la propiedad "data"
    }, error => {
      console.error('Error al buscar videos de turismo:', error);
    });
  }
}

