<template>
  <div>
    <h1>log in</h1>
    <div>
      <input type="email" v-model="email" placeholder="email@domain.com" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="login">sign up</button>
    </div>
    <div>
      dont have an account?
      <router-link to="/sign-up">sign up</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function() {
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
                self.$router.replace('workbench');
              },
              err => {
                alert('Oops. ' + err.message);
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