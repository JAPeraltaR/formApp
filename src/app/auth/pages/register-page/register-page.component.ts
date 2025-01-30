import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { firstNameAndLastnamePattern } from '../../../shared/validators/validators';

@Component({
  selector: 'auth-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    name: ['',[ Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern) ]],
    email: ['',[ Validators.required, Validators.pattern(customValidators.emailPattern) ]],
    username: ['',[ Validators.required, customValidators.cantBeStrider ]],
    password: ['',[ Validators.required, Validators.minLength(6) ]],
    password2: ['',[ Validators.required ]]
  })

  isValidField( field: string){

  }

  onSaved(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
