<template>
  <div>
    <div class="card__container">
      <h1 class="card__heading">Welcome back, mate</h1>
      <p class="txt--warning" v-if="errors.authFail">{{errors.authFail}}</p>
      <div>
        <input type="email" required v-model="email" placeholder="email@domain.com" />
        <input
          type="password"
          required
          v-model="password"
          placeholder="password"
          @keyup.enter="login"
        />
        <button class="btn btn--primary" @click="login">Log In</button>
      </div>
    </div>
    <div>
      You don't have an account yet?
      <router-link to="/sign-up">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {
        authFail: null
      }
    };
  },
  methods: {
    login: function() {
      this.errors.authFail = null;
      let self = this;

      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.

          firebase
            .auth()
            .signInWithEmailAndPassword(self.email, self.password)
            .then(
              user => {
                self.$router.push({ path: 'workbench' })
              },
              err => {
                self.errors.authFail = 'Oops. ' + err.message;
              }
            );
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }
};
</script>

<style>
</style>