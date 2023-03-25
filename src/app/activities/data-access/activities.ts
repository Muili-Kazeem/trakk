import { IActivity } from "../utils/models/iactivity";

export const ACTIVITIES: IActivity[] = [
  {
    "activityId": 1,
    "category": "Hiking",
    "title": "Light Hike",
    "description": "Evening Mountain Hiking",
    "athlete": "Azeez",
    "date": new Date("2023-04-07T10:45:00Z"),
    "starting": {
      "coords": [2.52797827174534, 4.351849406202035],
      "name": "Stockholm",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "stopping": {
      "coords": [0.35222261128618, 2.351849406202035],
      "name": "Sevannia",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "distance": 92.4,
    "duration": 189,
    "maxSpeed": 25,
    "navigatingCoords": {},
    "favourite": false,
    "deleted": false,
  },

  {
    "activityId": 2,
    "category": "Walking",
    "title": "Group Walk",
    "description": "Rotaract walk for the blind",
    "athlete": "Muili",
    "date": new Date("2016-05-25T09:24:15"),
    "starting": {
      "coords": [2.351849406202035, 4.52797827174534],
      "name": "Lausanne",
      "timeStamp": new Date("2016-05-25T09:24:15"),
    },
    "stopping": {
      "coords": [0.351849406202035, 2.35222261128618],
      "name": "Idi Araba",
      "timeStamp": new Date("2016-05-25T09:24:15"),
    },
    "distance": 16.3,
    "duration": 72,
    "maxSpeed": 11,
    "navigatingCoords": {},
    "favourite": false,
    "deleted": false,
  },

  {
    "activityId": 3,
    "title": "Morning Run",
    "category": "Running",
    "description": "A section of daily fitness",
    "athlete": "Idan",
    "date": new Date(),
    "starting": {
      "coords": [3.351849406202035, 5.52797827174534],
      "name": "Yaba",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "stopping": {
      "coords": [2.351849406202035, 3.35222261128618],
      "name": "Ilupeju",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "distance": 34.3,
    "duration": 23,
    "maxSpeed": 34.2,
    "navigatingCoords": {},
    "favourite": false,
    "deleted": false,
  },

  {
    "activityId": 4,
    "title": "Light Run",
    "category": "Running",
    "description": "A section of daily fitness",
    "athlete": "Saka",
    "date": new Date("2020-04-07T10:45:00Z"),
    "starting": {
      "coords": [2.351849406202035, 5.52797827174534],
      "name": "Xamax",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "stopping": {
      "coords": [5.52797827174534, 3.35222261128618],
      "name": "Thun",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "distance": 93.3,
    "duration": 35,
    "maxSpeed": 12.6,
    "navigatingCoords": {},
    "favourite": false,
    "deleted": false,
  },

  {
    "activityId": 5,
    "title": "Stroll",
    "category": "Walking",
    "description": "Trying to concentrate",
    "athlete": "Ilium",
    "date": new Date("2024-04-07T10:45:00Z"),
    "starting": {
      "coords": [2.351849406202035, 5.52797827174534],
      "name": "Xamax",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "stopping": {
      "coords": [5.52797827174534, 3.35222261128618],
      "name": "Thun",
      "timeStamp": new Date("2023-04-07T10:45:00Z"),
    },
    "distance": 20.9,
    "duration": 15,
    "maxSpeed": 1.2,
    "navigatingCoords": {},
    "favourite": false,
    "deleted": false,
  },

]