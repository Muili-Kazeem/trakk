import * as GeoJSON from "geojson";

interface Position {
  lng: number;
  lat: number;
  spd: number | null;
  alt: number | null;
}

interface GeoJson {
  type: string;
  coordinates: number[][];
}

class PositionTracker {
  private positions: Position[] = [];
  private watchid: number | null = null;

  public startTracking() {
    if(this.watchid) {
      return;
    }

    this.watchid = navigator.geolocation.watchPosition(
      ({coords: { latitude: lat, longitude: lng, speed: spd, altitude: alt }}) => {
        const currentPosition: Position = { lat, lng, spd, alt }
        this.positions.push(currentPosition);
      },
      error => {
        console.log(`Error: ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  public stopTracking() {
    if (this.watchid) {
      navigator.geolocation.clearWatch(this.watchid);
      this.watchid = null;
    }
  }

  public getGeoJSON(): GeoJson {
    return {
      type: "LineString",
      coordinates: this.positions.map(({lng, lat}) => [lng, lat])
    };
  }
}
