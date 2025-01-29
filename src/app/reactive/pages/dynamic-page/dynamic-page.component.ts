import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-dynamic-page',
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);

  public newFavourite: FormControl = new FormControl('', Validators.required);

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Dead Stranding', Validators.required]
    ])
  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  constructor(){}

  onDeleteFavourite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavourite(): void {
    if( this.favoriteGames.invalid ) return;
    this.favoriteGames.push(this.fb.control(this.newFavourite.value, Validators.required))
    this.newFavourite.reset();
  }

  onSubmit(): void {
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldError( field: string): string | null {
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



}
