import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-switches-page',
  standalone: false,

  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true,Validators.required],
    termAndConditions: [false, Validators.requiredTrue]
  })

  onSave(): void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

}
