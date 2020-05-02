<template>
  <div>
    <h1>sign up</h1>
    <div>
      <input type="email" v-model="email" placeholder="email@domain.com" />
      <input type="text" v-model="displayName" placeholder="First name" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="signUp">sign up</button>
    </div>
    <div>
      have an account?
      <router-link to="log-in">log in</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      displayName: '',
      password: ''
    };
  },
  methods: {
    signUp: function() {
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
            .createUserWithEmailAndPassword(self.email, self.password)
            .then(data => {
              data.user
                .updateProfile({
                  displayName: self.displayName
                })
                .then(
                  user => {
                    self.$router.replace('workbench');
                  },
                  err => {
                    alert('Oops. ' + err.message);
                  }
                );
            });
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
