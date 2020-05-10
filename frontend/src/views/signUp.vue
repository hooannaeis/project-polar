<template>
  <div>
    <div class="card__container">
      <h1 class="card__heading">Nice to meet you</h1>
      <div>
        <p class="txt--warning" v-if="errors.email">{{errors.email}}</p>
        <input
          required
          type="email"
          v-model="email"
          ref="emailInput"
          placeholder="email@domain.com"
          :pattern="regexPatterns.email"
        />
        <input required type="text" v-model="displayName" placeholder="First name" ref="nameInput" />
        <p class="txt--warning" v-if="errors.password">{{errors.password}}</p>
        <input
          required
          type="password"
          v-model="password"
          ref="passwordInput"
          placeholder="password"
          :pattern="regexPatterns.password"
        />
        <p class="txt--warning" v-if="errors.confirmPassword">{{errors.confirmPassword}}</p>
        <input
          required
          type="password"
          ref="confirmPasswordInput"
          v-model="confirmPassword"
          placeholder="confirm password"
          @keyup.enter="signUp"
        />
        <button class="btn btn--primary" @click="signUp">Sign Up</button>
      </div>
    </div>
    <div>
      You already have an account?
      <router-link to="log-in">Log in</router-link>
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
      password: '',
      confirmPassword: '',
      regexPatterns: {
        email: '.*@.*',
        password: '^(?=.*[A-Z].*)(?=.*[0-9].*)(?=.*[a-z].*).{8,}$'
      },
      errors: {
        email: null,
        password: null,
        confirmPassword: null
      }
    };
  },
  methods: {
    signUp: function() {
      console.log('chekcing inputs first');
      // FORM VALIDATION
      const emailRegex = new RegExp(this.regexPatterns.email);
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'This does not look like a valid email address.';
        this.$refs['emailInput'].focus();
      } else {
        this.errors.email = null;
      }

      const passRegex = new RegExp(this.regexPatterns.password);
      if (!passRegex.test(this.password)) {
        this.$refs['passwordInput'].focus();
        this.errors.password =
          'Do yourself a favour and have at least 8 character-password which include an uppercase, a lowercase letter, and a number.';
      } else {
        this.errors.password = null;
      }
      if (this.password != this.confirmPassword) {
        this.$refs['confirmPasswordInput'].focus();
        this.errors.confirmPassword = "Passwords don't match.";
      } else {
        this.errors.confirmPassword = null;
      }

      if (this.errors.email || this.errors.password || this.errors.confirmPassword) {
        return;
      }

      // FORM VALIDATION

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
