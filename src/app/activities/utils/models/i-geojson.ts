export interface IPosition {
  lng: number;
  lat: number;
  spd: number | null;
  alt: number | null;
}

export interface IGeoJson {
  type: string;
  features: [
    {
      type: string,
      properties: {},
      geometry: {
        type: string
        coordinates: number[][];
      }
    }
  ]
}
