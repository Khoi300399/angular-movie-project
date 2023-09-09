import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from '../../templates/form-template/form-template.component';
import { ButtonIconComponent } from '../../components/button-login/button-icon.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { ModalRegisterComponent } from '../../components/modal-register/modal-register.component';

@NgModule({
  declarations: [
    FormTemplateComponent,
    ButtonIconComponent,
    InputFormComponent,
    ButtonSubmitComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
  exports: [ButtonIconComponent, InputFormComponent, ButtonSubmitComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormModule {}
