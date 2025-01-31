import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

const defaultValues = {
  gender: '',
  wantNotifications: false,
  termAndConditions: false
}

@Component({
  selector: 'reactive-switches-page',
  standalone: false,

  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent{

  private createNestedMap = <K, V>(entries: [K, [K, V]][]): Map<K, Map<K, V>> =>
    new Map(entries.map(([key, [innerKey, value]]) =>
        [key, new Map([[innerKey, value]])]
    ));

  private mapError = this.createNestedMap([
    ['gender',['required','Debe Seleccionar una opción.']],
    ['termAndConditions',['required','Debe de aceptar las condiciones de uso']]
  ]);

  private valitdatorService = inject(ValidatorsService);
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    gender: ['', [Validators.required]],
    wantNotifications: [false,Validators.required],
    termAndConditions: [false, Validators.requiredTrue]
  })

  onSave(): void {
    if( !this.myForm.valid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset(defaultValues);
  }

  isValidField( field: string ) {
    return this.valitdatorService.isValidField( this.myForm, field );
  }

  getFieldError( field: string ) {
    return this.valitdatorService.getFieldError( this.myForm, field );
  }

  // getFieldError( field: string ): string | null{
  //   if( !this.myForm.controls[field] ) return null;
  //   const errors = this.myForm.controls[field].errors || {};
  //   for (const error of Object.keys(errors)) {
  //       const message = this.mapError.get(field)?.get(error);
  //       if( message )  return message;
  //   }
  //   return null;
  // }

}
