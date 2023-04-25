import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment as env } from '../../../../environments/environment';
import { IActivity } from '../../utils/models/iactivity';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;
  constructor() { mapboxgl.accessToken = env.mapbox.accessToken; }

  // Map display helper functions
  buildMap(activity: IActivity) {
    this.map = new mapboxgl.Map({
      container: 'mapping',
      style: "mapbox://styles/kazeem18/cle4x2jpd001x01qmhitbc586",
      projection: 'globe',
      zoom: -0.1,
      center: [50, 0],
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.on('load', () => {
          let activityGeo = JSON.parse(activity.navigatingCoords!);
          this.map.addSource('route', { "type": 'geojson', "data": activityGeo });
          this.map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': { 'line-join': 'round', 'line-cap': 'round' },
            'paint': { 'line-color': 'blue', 'line-width': 5, 'line-opacity': 0.3, }
          });
          // Geographic coordinates of the LineString
          const coordinates = activityGeo!.features[0].geometry.coordinates;

          // Adding Markers
          const marker1 = new mapboxgl.Marker({ scale: 0.7 }).setLngLat(coordinates[0]).addTo(this.map);
          const finishingJson = this.returnGeojson(coordinates[coordinates.length - 1]);
          this.map.addSource('finishing', { type: 'geojson', data: finishingJson });
          // Add the finishing flag symbol layer to the map.
          this.map.addLayer({
            'id': 'finishing',
            'type': 'symbol',
            'source': 'finishing',
            'layout': { 'icon-image': 'flag' }
          })

          // Create a 'LngLatBounds' with both corners at the first coordinate.
          const bounds = new mapboxgl.LngLatBounds( coordinates[0], coordinates[0] );
          // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
          for (const coord of coordinates) { bounds.extend(coord); };
          this.map.fitBounds(bounds, { padding: 150 });
    });
  }

  private returnGeojson(pointCoords: any) {
    return ({
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': pointCoords
          }
        }
      ]
    })
  }

  // ANIMATE LINE
  lineAnimate(activity: IActivity) {
    let activityGeo = JSON.parse(activity.navigatingCoords!);
    const coordinates = activityGeo!.features[0].geometry.coordinates;
    // start by showing just the first coordinate
    activityGeo!.features[0].geometry.coordinates = [coordinates[0]];

    // setup the viewport
    this.map.flyTo({ 'center': coordinates[0], 'zoom': 20 });
    this.map.setPitch(30);

    // start animating
    let i = 0;
    const timer = setInterval(() => {
      if (i < coordinates.length) {
        activityGeo!.features[0].geometry.coordinates.push(coordinates[i]);
        this.map.getSource('route').setData(activityGeo);
        this.map.panTo(coordinates[i]);
        i++;
      } else {
        window.clearInterval(timer);
      }
    }, 500)
  }
}
