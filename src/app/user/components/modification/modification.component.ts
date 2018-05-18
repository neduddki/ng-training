import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserService } from '../../user.barrel';
import { AuthService } from '../../../shared/shared.barrel';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
public loading: boolean = true;
public user: User = new User();
public form = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },
  ModificationComponent.passwordMatchValidator
);

public constructor(private _userService: UserService, private _authService: AuthService) {
  this.user = _authService.user;
}


public ngOnInit() {
  this.loading = false;
}

public modify() {
  if (this.loading) {
    return;
  }
  this.loading = true;
  this._userService.modify(this.user).subscribe(
    (response: Response) => {
      console.log(response);
      window.alert('Successful modification!');
      
      this.user = new User();
      this.form.reset();
      this.loading = false;
    },
    (error: any) => {
      console.log(error);
      window.alert('Modification failed.');
      this.loading = false;
    },
    () => {
      //
    }
  );
}

public static passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
}

}
