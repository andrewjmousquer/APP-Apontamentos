import { Injectable } from '@angular/core';
import {
  FormGroup,
  Validator,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class CpfCnpjValidatorFn {
  static cpfLength = 11;
  static cnpjLength = 14;

  /**
   * Calcula o dígito verificador do CPF ou CNPJ.
   */
  static buildDigit(arr: number[]): number {
    const isCpf = arr.length < CpfCnpjValidatorFn.cpfLength;
    const digit =
      arr
        .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
        .reduce((total, current) => total + current) %
      CpfCnpjValidatorFn.cpfLength;

    return digit < 2 ? 0 : CpfCnpjValidatorFn.cpfLength - digit;
  }

  /**
   * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
   * Reactive Forms
   */
  static cpfValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    if (control.value === null || control.value === undefined) {
      return null;
    }
    const cpfCnpj = control.value.replace(/\D/g, '');

    // Verifica o tamanho da string.
    if (
      [CpfCnpjValidatorFn.cpfLength, CpfCnpjValidatorFn.cnpjLength].indexOf(
        cpfCnpj.length
      ) < 0
    ) {
      return { invalidCpf: true };
    }

    // Verifica se todos os dígitos são iguais.
    if (/^([0-9])\1*$/.test(cpfCnpj)) {
      return { invalidCpf: true };
    }

    // A seguir é realizado o cálculo verificador.
    const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

    cpfCnpjArr.unshift(CpfCnpjValidatorFn.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(CpfCnpjValidatorFn.buildDigit(cpfCnpjArr));

    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
      // Dígito verificador não é válido, resultando em falha.
      return { invalidCpf: true };
    }

    return null;
  };
}

/**
 * Template Driven Forms
 */
@Injectable()
export class CpfCnpjValidator implements Validator {
  /**
   * Implementa a interface de um validator.
   */
  validate(c: AbstractControl): ValidationErrors | null {
    return CpfCnpjValidatorFn.cpfValidator(c);
  }
}
