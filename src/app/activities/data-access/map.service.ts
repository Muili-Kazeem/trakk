import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { MushinGeo } from "../../../assets/mushin";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
    mapboxgl.accessToken = env.mapbox.accessToken;
  }

  map: any;

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/kazeem18/cle4x2jpd001x01qmhitbc586",
      projection: 'globe',
      zoom: -0.1,
      center: [-90, 40]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.on('load', () => {
      this.map.addSource('route', {
          "type": 'geojson',
          "data": MushinGeo
        }
      )

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

      // Geographic coordinates of the LineString
      const coordinates = MushinGeo.features[0].geometry.coordinates;
      // Create a 'LngLatBounds' with both corners at the first coordinate.
      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
      );
      // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
      for (const coord of coordinates) {
        bounds.extend(coord);
      }

      this.map.fitBounds(bounds, {
        padding: 100
      });
    });
  }

  lineAnimate() {
    this.map.on('load', async () => {
      const coordinates = MushinGeo.features[0].geometry.coordinates;
      console.log(coordinates)
      // start by showing just the first coordinate
      MushinGeo.features[0].geometry.coordinates = [coordinates[0]];
      console.log(MushinGeo)
      // add it to the map
      this.map.addSource('trace', { type: 'geojson', data: MushinGeo });
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

      let i = 0;
      const timer = setInterval(() => {
      if (i < coordinates.length) {
        MushinGeo.features[0].geometry.coordinates.push(coordinates[i]);
        this.map.getSource('trace').setData(MushinGeo);
        this.map.panTo(coordinates[i]);
        i++;
      } else {
        window.clearInterval(timer);
      }
      }, 1000)
    })
  }

  animateCamera() {
    this.map.on('style.load', () => {
      this.map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      this.map.addSource('trace', {
        type: 'geojson',
        data: MushinGeo
      });
      this.map.addLayer({
        type: 'line',
        source: 'trace',
        id: 'line',
        paint: {
          'line-color': 'black',
          'line-width': 5
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        }
      });
    });

    // Wait for the terrain and sky to load before starting animation
    this.map.on('load', () => {
      console.log("Hi there")
      const animationDuration = 80000;
      const cameraAltitude = 4000;
      // get the overall distance of each route so we can interpolate along them
      const routeDistance = turf.lineDistance(MushinGeo);
      const cameraRouteDistance = turf.lineDistance(MushinGeo);

      let start: number;

      const frame = (time: number) => {
        if (!start) start = time;
        // phase determines how far through the animation we are
        const phase = (time - start) / animationDuration;

        // phase is normalized between 0 and 1
        // when the animation is finished, reset start to loop the animation
        if (phase > 1) {
          // wait 1.5 seconds before looping
          setTimeout(() => {
          start = 0.0;
          }, 1500);
        }

        // use the phase to get a point that is the appropriate distance along the route
        // this approach syncs the camera and route positions ensuring they move
        // at roughly equal rates even if they don't contain the same number of points
        const alongRoute = turf.along(
          MushinGeo, routeDistance * phase
        ).geometry.coordinates;

        const alongCamera = turf.along(
          MushinGeo, cameraRouteDistance * phase
        ).geometry.coordinates;

        const camera = this.map.getFreeCameraOptions();

        // set the position and altitude of the camera
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
          { lng: alongCamera[0], lat: alongCamera[1] },
          cameraAltitude
        );

        // tell the camera to look at a point along the route
        camera.lookAtPoint({ lng: alongRoute[0], lat: alongRoute[1] });
        this.map.setFreeCameraOptions(camera);

        window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    });
  }


}
