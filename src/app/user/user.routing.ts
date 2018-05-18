import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ModificationComponent } from './components/modification/modification.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'modification', component: ModificationComponent }
  ])],
  exports: [RouterModule]
})
export class UserRoutingModule {
  //
}
