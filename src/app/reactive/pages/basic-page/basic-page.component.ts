import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

const rtx5090= {
  name:'RTX 5090',
  price: 2500,
  inStorage: 6,
}

@Component({
  selector: 'reactive-basic-page',
  standalone: false,

  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent{

  private validatorService = inject(ValidatorsService);
  private fb = inject(FormBuilder);

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   price: new FormControl(0, [Validators.required, Validators.min(0)]),
  //   inStorage: new FormControl(0, [Validators.required, Validators.min(0)])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorService.getFieldError( this.myForm, field);
  }

  onSave(): void{

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({price:10, inStorage: 0})
  }

}
