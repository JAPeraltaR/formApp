import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl, FormGroup } from '@angular/forms';

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

  constructor( ) { }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch ( key ){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
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
