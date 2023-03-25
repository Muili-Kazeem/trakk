export interface IActivity {
  activityId: number | string;
  category: string;
  title?: string;
  description?: string;
  athlete?: string;
  date: Date;
  starting: {
    coords: number[];
    name?: string;
    timeStamp: Date;
  };
  stopping: {
    coords: number[];
    name?: string;
    timeStamp: Date;
  };
  distance: number;
  duration: number;
  maxSpeed?: number;
  navigatingCoords: object;
  favourite?: boolean;
  deleted?: boolean;
  searchKey?: string[];
}

export interface ICategorizedActivity {
  category: string;
  activities: IActivity[];
}
