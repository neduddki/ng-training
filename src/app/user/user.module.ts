import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  UserRoutingModule,
  LoginComponent,
  RegistrationComponent,
  ModificationComponent,
  UserService
} from './user.barrel';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ModificationComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
