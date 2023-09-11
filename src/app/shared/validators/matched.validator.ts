import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Observable, map, switchMap, timeout, timer } from 'rxjs';

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
export const CheckPasswordValidateDebounce = (authService: AuthService) => {
  return function (
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() =>
        authService.layThongTinTaiKhoan().pipe(
          map((response) => {
            const matKhau = response.content.matKhau;
            const isMatching = matKhau === control.value;
            return isMatching ? null : { passwordMismatch: true };
          })
        )
      )
    );
  };
};
