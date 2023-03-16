import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MushinGeo } from "../../../assets/mushin";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;

  constructor() {
    mapboxgl.accessToken = env.mapbox.accessToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/kazeem18/cle4x2jpd001x01qmhitbc586",
      center: [3.3461766889265903, 6.528719841982394],
      zoom: 9
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.map.addSource('route', {
          "type": 'geojson',
          "data": MushinGeo
        }
      )
    });
  }

  geo() {
    this.map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
        'line-color': '#292',
        'line-width': 7
      }
    });
  }
}
