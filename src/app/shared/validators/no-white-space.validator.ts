import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NoWhiteSpace(
  control: AbstractControl
): ValidationErrors | null {
  const { value: controlVal } = control;
  const isWhiteSpaceOnly: boolean = (controlVal || '').trim().length === 0;

  return isWhiteSpaceOnly
    ? {
        whitespace: 'value is only whitespace',
      }
    : null;
}
