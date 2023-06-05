import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginData = {
    username: '',
    password: ''
  }
  
  onSubmit(): void {
    const isValid = this.checkLoginData(this.loginData);
    if (isValid) {
      // perform login actions
    } else {
      // display error message
    }
  }
  
  checkLoginData(data: any): boolean {
    // perform validation on login data
    return true; // return true if data is valid; false otherwise
  }
}
