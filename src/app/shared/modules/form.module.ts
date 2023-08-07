import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from '../../templates/form-template/form-template.component';
import { LoginComponent } from '../../pages/login/login.component';
import { ButtonLoginComponent } from '../../components/button/button-login/button-login.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from '../../components/input-form/input-form.component';

@NgModule({
  declarations: [
    FormTemplateComponent,
    LoginComponent,
    ButtonLoginComponent,
    InputFormComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormModule {}
