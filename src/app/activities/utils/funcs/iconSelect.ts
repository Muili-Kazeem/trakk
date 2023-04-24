import { IconDefinition, faBolt, faClock, faRoad, faRunning, faWind, faLocationDot, faCar, faWalking, faHiking, faWheelchair, faMotorcycle, faPersonSwimming, faSailboat, faSkating, faSnowboarding, faSkiing, faPersonSkating, faBicycle, faPowerOff, faSave } from '@fortawesome/free-solid-svg-icons';
import { faBars, faUser, faGear, faChartSimple, faPersonWalking, faChartPie,  } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

export function iconSelect(name: string): IconDefinition {
  switch (name) {
    case 'Drive':
      return faCar;
    case 'Hike':
      return faHiking;
    case 'Run':
      return faRunning;
    case 'Walk':
      return faWalking;
    case 'Wheelchair':
      return faWheelchair;
    case 'Bike ride':
      return faMotorcycle;
    case 'Swim':
      return faPersonSwimming;
    case 'Sail':
      return faSailboat;
    case 'Ice skating':
      return faSkating;
    case 'Snowboarding':
      return faSnowboarding;
    case 'Ski':
      return faSkiing;
    case 'Skateboard':
      return faPersonSkating;
    case 'Cycling':
      return faBicycle;
    case 'overview':
      return faChartPie;
    case 'fav':
      return faSave;
    case 'stat':
      return faChartSimple;
    case 'setting':
      return faGear;
    case 'user':
      return faUser;
    case 'signout':
      return faPowerOff;
    case 'location':
      return faLocationDot;
    case 'distance':
      return faRoad;
    case 'time':
      return faClock;
    case 'speed':
      return faWind;
    case 'menuBar':
      return faBars;
    case 'notif':
      return faBell;
    default:
      return faBolt;
  }
}
