import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'auth-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private asyncValidator = inject(EmailValidator);

  public myForm = this.fb.group({
    name: ['',[ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    email: ['',[ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [this.asyncValidator]],
    username: ['',[ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['',[ Validators.required, Validators.minLength(6) ]],
    password2: ['',[ Validators.required ]]
  }, {
    validator: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'password','password2' )
    ]
  })

  constructor( ) {}

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }


  onSaved() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
