import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  public http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = this.http.get<string>(`http://miservicio/email/${control.value}`);

    const observable = new Observable<ValidationErrors | null>( subscriber => {
      if(control.value === email || control.value === 'fernando@gmail.com'){
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }
      subscriber.next(null);
      subscriber.complete();
    })

    return observable;
  }
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true,
  //   })
  // }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }


}
