import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {emailRegex, nickRegex} from "./constants/regex.constants";

export class CustomValidators {
  static nickOrEmail = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const isEmail = value.includes('@');
      const isValid = isEmail ? emailRegex.test(value) : nickRegex.test(value);

      if (isEmail && !isValid) return {emailInvalid: true}
      else if (!isEmail && !isValid) return {nickInvalid: true}

      return null;
    };
  }
}
