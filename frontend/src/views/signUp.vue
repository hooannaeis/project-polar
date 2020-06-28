<template>
  <div class="container--full-height container--flex-vertical">
    <div class="card__container">
      <h2 class="txt--fancy txt--primary">welcome aboard, mate</h2>
      <div class="container--flex-horizontal">
        <div class="pos--rel">
          <p class="txt--warning txt--small pos--abs pos--tr" v-if="errors.email">{{errors.email}}</p>
          <input
            required
            type="email"
            v-model="email"
            ref="emailInput"
            placeholder="email@domain.com"
            :pattern="regexPatterns.email"
          />
        </div>
        <input required type="text" v-model="displayName" placeholder="First name" ref="nameInput" />
        <div class="pos--rel">
          <p
            class="txt--warning txt--small pos--abs pos--tr"
            v-if="errors.password"
          >{{errors.password}}</p>
          <input
            required
            type="password"
            v-model="password"
            ref="passwordInput"
            placeholder="password"
          />
        </div>
        <div class="pos--rel">
          <p
            class="txt--warning txt--small pos--abs pos--tr"
            v-if="errors.confirmPassword"
          >{{errors.confirmPassword}}</p>
          <input
            required
            type="password"
            ref="confirmPasswordInput"
            v-model="confirmPassword"
            placeholder="confirm password"
            @keyup.enter="signUp"
          />
        </div>
        <ul class="container--flex-vertical">
          <li
            v-for="(rule, index) in passwordRules"
            :key="index"
            v-bind:class="{ 'txt--primary': rule.isValid }"
          >
            <div :ref="`label_${index}`">
              <div class="txt--large">{{rule.label}}</div>
              <div class="txt--small">{{rule.subtitle}}</div>
            </div>
          </li>
        </ul>
        <button class="btn btn--primary txt--fancy" @click="signUp">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from '@firebase/app';
import '@firebase/auth';

const upperCaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const specialCharacterRegex = /[!@#\$%\^&\*]/;

const validationRules = [
  {
    label: '8+',
    subtitle: 'characters',
    validate: (passwordInput, confirmPassInput) => passwordInput.length >= 8
  },
  {
    label: '#',
    subtitle: 'special',
    validate: (passwordInput, confirmPassInput) =>
      specialCharacterRegex.test(passwordInput)
  },
  {
    label: 'A',
    subtitle: 'uppercase',
    validate: (passwordInput, confirmPassInput) =>
      upperCaseRegex.test(passwordInput)
  },
  {
    label: '=',
    subtitle: 'confirmed',
    validate: (passwordInput, confirmPassInput) =>
      passwordInput === confirmPassInput
  }
];

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
        confirmPassword: null,
        authFail: null
      }
    };
  },
  computed: {
    passwordRules() {
      return validationRules.map(rule => {
        return {
          label: rule.label,
          subtitle: rule.subtitle,
          isValid: rule.validate(this.password, this.confirmPassword),
          labelWidth: rule.labelWidth
        };
      });
    }
  },
  methods: {
    signUp: function() {
      console.log('chekcing inputs first');
      // FORM VALIDATION
      const emailRegex = new RegExp(this.regexPatterns.email);
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'invalid email';
        this.$refs['emailInput'].focus();
      } else {
        this.errors.email = null;
      }

      const passRegex = new RegExp(this.regexPatterns.password);
      if (!passRegex.test(this.password)) {
        this.$refs['passwordInput'].focus();
        this.errors.password = 'observe password requirements below';
      } else {
        this.errors.password = null;
      }
      if (this.password != this.confirmPassword) {
        this.$refs['confirmPasswordInput'].focus();
        this.errors.confirmPassword = "passwords don't match.";
      } else {
        this.errors.confirmPassword = null;
      }

      if (
        this.errors.email ||
        this.errors.password ||
        this.errors.confirmPassword
      ) {
        return;
      }
      // FORM VALIDATION

      let self = this;
      this.errors.authFail = null;

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
                self.$router.push({ path: 'my/workbench' });
              },
              err => {
                self.errors.authFail = 'Oops. ' + err.message;
                console.warn(err.message);
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
