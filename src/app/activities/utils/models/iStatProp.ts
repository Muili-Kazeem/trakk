import { Observable } from "rxjs";
import { IActivity } from "./iactivity";

export interface IStatProp {
  header: string,
  subheader: string,
  format?: string
  value: Observable<number>
}
