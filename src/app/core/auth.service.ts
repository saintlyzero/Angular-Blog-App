import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'

@Injectable()
export class AuthService {
  authState: any = null

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe( data => this.authState = data)
  }

  get authenticated(): boolean{
    return this.authState !== null
  }

  get currentUserId(): string{
    return this.authenticated ? this.authState.uid : null
  }

  login(){
    console.log("called Login..");
    this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(res => console.log(res)).catch(err => {
      console.log("Error Occured")
      console.log(err)
    });
  }
  logout(){
    console.log("called Logout");
    this.afAuth.auth.signOut();
  }
}
