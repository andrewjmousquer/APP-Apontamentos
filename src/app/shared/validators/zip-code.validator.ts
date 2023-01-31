import { Injectable } from '@angular/core';
import {
  FormGroup,
  Validator,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class ZipCodeValidatorFn {
  static zipCodeLength = 8;

  /**
   * Reactive Forms
   */
  static zipCodeValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    if (control.value === null || control.value === undefined) {
      return null;
    }
    const zipCode = control.value.replace(/\D/g, '');

    if (zipCode.length < ZipCodeValidatorFn.zipCodeLength) {
      return { invalidCep: true };
    }

    return null;
  };
}

/**
 * Template Driven Forms
 */
@Injectable()
export class ZipCodeValidator implements Validator {
  /**
   * Implementa a interface de um validator.
   */
  validate(c: AbstractControl): ValidationErrors | null {
    return ZipCodeValidatorFn.zipCodeValidator(c);
  }
}
