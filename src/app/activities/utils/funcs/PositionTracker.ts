import { Subject } from "rxjs";
import { IGeoJson, IPosition } from "../models/i-geojson";

const resolvedGeoJsonSubject = new Subject<IGeoJson>()
export const resolvedGeoJson$ = resolvedGeoJsonSubject.asObservable()


export class PositionTracker {
  private positions: IPosition[] = [];
  private watchid: number | null = null;
  private startingPosition!: number[];
  private stoppingPosition!: number[];
  private totalDistance: number = 0;
  private allSpeed: number[] = [];
  private errorMessage!: string;

  // Calculate distance using the haversian formulae. Could equally use the turf.js library
  // with the turf.distance(from, to, options) function to calculate the distance. Turf will replace this as the app gets complex
  private calculateDistanceFromLatLonInKm(lat2: number, lon2: number, lat1: number, lon1: number) {
    function deg2rad(deg: number) {
      return deg * (Math.PI/180)
    }

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

  private getTotalDistance() {
    this.totalDistance = 0;
    let unit = 0;
    for (let i = 0; i < (this.positions.length - 1); i++) {
      this.totalDistance += this.calculateDistanceFromLatLonInKm(this.positions[i].lat, this.positions[i].lng, this.positions[i + 1].lat, this.positions[i + 1].lng )
    }
  }

  public startTracking() {
    if(this.watchid) {
      return;
    }

    let fromCoords!: IPosition | null
    let toCoords!: IPosition | null
    let compareDist = 0
    this.watchid = navigator.geolocation.watchPosition(
      ({coords: { latitude: lat, longitude: lng, speed: spd, altitude: alt  }}) => {
        if(!fromCoords) {
          fromCoords = { lat, lng, spd, alt }
        } else {
          toCoords = { lat, lng, spd, alt}
          compareDist = this.calculateDistanceFromLatLonInKm(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng)
          if (compareDist >= 0.004000000000000) {
            this.positions.push(fromCoords); this.positions.push(toCoords);
            this.allSpeed.push(spd ? spd : 0);
            this.getTotalDistance();
            let insideGeoJSON = this.getGeoJSON();
            resolvedGeoJsonSubject.next(insideGeoJSON);
            fromCoords = null; toCoords = null
          }
        }
      },
      error => {
        this.errorMessage = `Error: ${error.message}`
        console.log(this.errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  public stopTracking() {
    if (this.watchid) {
      navigator.geolocation.clearWatch(this.watchid);
      this.watchid = null;
    }
  }

  public getPositionStats() {
    return this.positions;
  }

  public getStartingPosition() {
    this.startingPosition = [ this.positions[0]?.lng, this.positions[0]?.lat ];
    return this.startingPosition;
  }

  public getStoppingPosition() {
    this.stoppingPosition = [ this.positions[-1]?.lng, this.positions[-1]?.lat ];
    return this.stoppingPosition;
  }

  public getGeoJSON(): IGeoJson {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: this.positions.map(({lng, lat}) => [lng, lat])
          }
        }
      ]
    };
  }

  public getSpeed() {
    return (Math.round(this.allSpeed[-1] * 100)/100)
  }

  public getWatchId() {
    return this.watchid;
  }

  public getDistance() {
    return (Math.round(this.totalDistance * 100)/100)
  }
}
