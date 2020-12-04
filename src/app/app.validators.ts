import { FormGroup } from '@angular/forms';

export function autoCompleteValidator(controlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (typeof(control.value)== 'string'){
        control.setErrors({ 'invalidAutoComplete': true });
      }else if(typeof(control.value)== 'object'){
        control.setErrors(null);
      }

  };
  
}