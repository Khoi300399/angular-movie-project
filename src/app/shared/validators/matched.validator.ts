import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export function MatchedControls(
  firstControlName: string,
  secondControlName: string
): ValidationErrors | null {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as FormControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as FormControl;

    return firstControlValue === secondControlValue
      ? null
      : {
          valueNoMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
}
