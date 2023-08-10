import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from '../../templates/form-template/form-template.component';
import { LoginComponent } from '../../pages/login/login.component';
import { ButtonIconComponent } from '../../components/button-login/button-icon.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from '../../pages/register/register.component';

@NgModule({
  declarations: [
    FormTemplateComponent,
    LoginComponent,
    ButtonIconComponent,
    InputFormComponent,
    ButtonSubmitComponent,
    RegisterComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
  ],
})
export class FormModule {}
