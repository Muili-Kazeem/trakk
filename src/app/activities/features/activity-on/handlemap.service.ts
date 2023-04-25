import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { resolvedGeoJson$ } from "../../utils/funcs/PositionTracker";

@Injectable({
  providedIn: 'root'
})
export class HandlemapService {

  constructor() {
    mapboxgl.accessToken = env.mapbox.accessToken;
  }

  sub!: Subscription;
  map: any;

  buildMap() {
    // initialize map
    this.map = new mapboxgl.Map({
      container: 'activeMap',
      style: "mapbox://styles/kazeem18/cle4x2jpd001x01qmhitbc586",
      projection: 'globe',
      zoom: -0.1,
      center: [-90, 40]
    });

    // add fullscreen control
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    // --- follow user point presence
    this.map.on('load', async () => {
      try {
        const geojson = this.returnGeojson(await this.getLocation())
        // Add the location as a source.
        this.map.addSource('locate', { type: 'geojson', data: geojson });
        // Add the rocket symbol layer to the map.
        this.map.addLayer({
          'id': 'locate',
          'type': 'symbol',
          'source': 'locate',
          'layout': { 'icon-image': 'rocket' }
        })

        // Update the source from the getLocation API every 2 seconds.
        const updateSource = setInterval(async () => {
          try {
            const pointCoordinates = await this.getLocation(updateSource);
            const geoJson = this.returnGeojson(pointCoordinates)
            // Fly the map to the location.
            this.map.flyTo({ "center": pointCoordinates, "speed": 0.5, "zoom": 17 });
            this.map.getSource('locate').setData(geoJson);
          } catch (err) {
            // console.log(`Error thrown in setInterval updateSource ${err}`)
          }
        }, 2000);
      } catch (err) {
        console.log(`Error thrown in addLayer, addsSource ${err}`)
        this.getLocation()
      };
    })
  }

  returnGeojson(pointCoords: any) {
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

  getLocation(updateSource?: any) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords: { latitude: latitude, longitude: longitude }}) => {
          resolve([longitude, latitude])
        },
        error => {
          // If the updateSource interval is defined, clear the interval to stop updating the source.
          if (updateSource) clearInterval(updateSource);
          reject(error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })
  }


  addedSourceAndTraceLayer: boolean = false;

  startTrackingActivityPoints() {
    this.sub = resolvedGeoJson$.subscribe(geoJson => {
      const coordinates = geoJson.features[0].geometry.coordinates;

      // add layer to the map
      if (!this.addedSourceAndTraceLayer) {
        this.map.addSource('trace', { type: 'geojson', data: geoJson });
        this.map.addLayer({
          'id': 'trace',
          'type': 'line',
          'source': 'trace',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round',
          },
          'paint': {
            'line-color': 'blue',
            'line-opacity': 0.5,
            'line-width': 5
          }
        });
        const startMarker = new mapboxgl.Marker({ color: 'black', scale: 0.7 }).setLngLat(coordinates[0]).addTo(this.map);

        this.addedSourceAndTraceLayer = true;
      }

      // setup the viewport
      this.map.jumpTo({ "center": coordinates[-1], "speed": 0.5, "zoom": 17 });
      this.map.setPitch(30);
      // Update user track
      this.map.getSource('trace').setData(geoJson);
      this.map.panTo(coordinates[-1]);
    })
  }

  unsubscribe() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }
}
