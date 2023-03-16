export interface IActivity {
  activityId: number;
  category: string;
  title: string;
  description: string;
  athlete: string;
  date: Date;
  starting: {
    coords: number[];
    name: string;
    timeStamp: Date;
  };
  stopping: {
    coords: number[];
    name: string;
    timeStamp: Date;
  };
  distance: number;
  duration: number;
  maxSpeed: number;
  navigatingCoords: object;
  favourite: boolean;
  deleted: boolean;
}

export interface ICategorizedActivity {
  category: string;
  activities: IActivity[];
}
