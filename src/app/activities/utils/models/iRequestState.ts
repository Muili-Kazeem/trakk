import { HttpErrorResponse } from "@angular/common/http";

export interface IRequestState<T> {
  isLoading: boolean,
  value?: T;
  error?: HttpErrorResponse | Error;
}
