import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private fireAuth: AngularFireAuth, 
    private router: Router) { }


  // login method
  // login (email: string, password: string) {
  //   this.fireAuth.signInWithEmailAndPassword(email, password).then( () => {
  //      localStorage.setItem('token', 'true');
  //      this.router.navigate(['/home']);
  //   }, err => {
  //     alert("Something went wrong");
  //     this.router.navigate(['/login']);
  //   })
  // }
  login(email : string, password : string) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');

      if(res.user?.emailVerified == true) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/verifyEmail']);
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }
  // sends verification email
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verifyEmail']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  // logout method
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      }
    )
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verifyEmail']);
      }, err => {
        alert("Something went wrong")
      }
    );
  }

  // google signup
  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
      res => {
        this.router.navigate(['/home']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      }, err => {
        alert(err.message);
      }
    );
  }

}
