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

export class PositionTracker {
  private positions: Position[] = [];
  private watchid: number | null = null;
  private startingPosition!: number[];
  private accumulatedDistances: number[] = [];
  private totalDistance: number = 0.00;
  private errorMessage!: string;

  // Calculate distance
  private calculateDistanceFromLatLonInKm(lat1: number = 0, lon1: number = 0, lat2: number = 0, lon2: number = 0) {
    function deg2rad(deg: number) {
      return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    if (lat1 || lon1 === 0) {
      lat1 = lat2;
      lon1 = lon2; }
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  private distanceCalculating() {
    this.positions.forEach((val, index, all) => {
      this.accumulatedDistances.push(this.calculateDistanceFromLatLonInKm(all[index + 1]?.lat, all[index + 1]?.lng, val?.lat, val?.lng))
    });
    console.log(this.accumulatedDistances);
  }

  private getTotalDistance() {
    this.totalDistance = this.accumulatedDistances.reduce((acc, curr) => {
      acc + curr
      return acc
    }, 0 as number);
  }

  public startTracking() {
    if(this.watchid) {
      return;
    }

    this.watchid = navigator.geolocation.watchPosition(
      ({coords: { latitude: lat, longitude: lng, speed: spd, altitude: alt,  }}) =>   {
        const currentPosition: Position = { lat, lng, spd, alt };
        this.positions.push(currentPosition);
        this.distanceCalculating();
        this.getTotalDistance();
      },
      error => {
        this.errorMessage = `Error: ${error.message}`
        console.log(this.errorMessage);
        throw this.errorMessage;
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

  public positionStats() {
    return this.positions;
  }

  public getStartingPosition() {
    this.startingPosition = [ this.positions[0]?.lat, this.positions[0]?.lng ]
    return this.startingPosition
  }

  public getStoppingPosition() {
    this.startingPosition = [ this.positions[-1]?.lat, this.positions[-1]?.lng ]
    return this.startingPosition
  }

  public getGeoJSON(): GeoJson {
    return {
      type: "LineString",
      coordinates: this.positions.map(({lng, lat}) => [lng, lat])
    };
  }

  public getWatchId() {
    return this.watchid;
  }

  public getDistance() {
    return this.totalDistance;
  }
}
