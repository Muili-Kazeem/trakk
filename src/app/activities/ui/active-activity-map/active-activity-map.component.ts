import { AfterViewInit, Component, Input } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { IGeoJson } from '../../utils/models/i-geojson';

@Component({
  selector: 'app-active-activity-map',
  templateUrl: './active-activity-map.component.html',
  styleUrls: ['./active-activity-map.component.scss']
})
export class ActiveActivityMapComponent implements AfterViewInit {

  constructor() {
    mapboxgl.accessToken = env.mapbox.accessToken;
  }

  @Input() geoJson!: IGeoJson;

  map: any;

  ngAfterViewInit(): void {
    // initialize map
    this.map = new mapboxgl.Map({
      container: 'active-map',
      style: "mapbox://styles/kazeem18/cle4x2jpd001x01qmhitbc586",
      projection: 'globe',
      zoom: -0.1,
      center: [-90, 40]
    });

    // add fullscreen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // --- follow user point presence
    this.map.on('load', () => {
      const geojson = getLocation();

      // Add the location as a source.
      this.map.addSource('locate', {
        type: 'geojson',
        data: geojson
      });

      // Add the rocket symbol layer to the map.
      this.map.addLayer({
        'id': 'locate',
        'type': 'symbol',
        'source': 'locate',
        'layout': {
          'icon-image': 'rocket'
        }
      });

      // Update the source from the API every 2 seconds.
      const updateSource = setInterval( () => {
        const geojson = getLocation(updateSource);
        this.map.getSource('locate').setData(geojson);
      }, 2000);
    })

    const getLocation = (updateSource?: any) => {
      navigator.geolocation.getCurrentPosition(
        ({coords: { latitude: latitude, longitude: longitude }}) => {

          // Fly the map to the location.
          this.map.flyTo({
            center: [longitude, latitude],
            speed: 0.5
          });

          // Return the location of the user as GeoJSON.
          return {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [longitude, latitude]
                }
              }
            ]
          };
        },
        error => {
          // If the updateSource interval is defined, clear the interval to stop updating the source.
          if (updateSource) clearInterval(updateSource);
          throw new Error(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    }

    // --- Animate user track
    this.map.on('load', () => {
      const coordinates = this.geoJson.features[0].geometry.coordinates;

      // start by showing just the first coordinate
      this.geoJson.features[0].geometry.coordinates = [coordinates[0]];

      // add it to the map
      this.map.addSource('trace', { type: 'geojson', data: this.geoJson });
      this.map.addLayer({
        'id': 'trace',
        'type': 'line',
        'source': 'trace',
        'paint': {
          'line-color': 'yellow',
          'line-opacity': 0.75,
          'line-width': 5
        }
      });

      // setup the viewport
      this.map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
      this.map.setPitch(30);

      // update user track
      let i = 0;
      const timer = setInterval(() => {
        if (i < coordinates.length) {
          this.geoJson.features[0].geometry.coordinates.push(coordinates[i]);
          this.map.getSource('trace').setData(this.geoJson);
          this.map.panTo(coordinates[i]);
          i++;
        } else {
          window.clearInterval(timer);
        }
      }, 1000)
    })
  }

}
