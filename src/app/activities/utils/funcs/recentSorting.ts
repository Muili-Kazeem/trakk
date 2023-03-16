import { DateTime } from "luxon";
import { IActivity } from "../models/iactivity";

export function recentSorting(a: IActivity, b: IActivity): number {
  const milliA = DateTime.fromJSDate(a.date).toMillis()
  const milliB = DateTime.fromJSDate(b.date).toMillis()
  if (milliA > milliB) { return -1 }
  if (milliA < milliB) { return 1 }
  return 0;
}
