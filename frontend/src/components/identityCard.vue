<template>
  <div>
    <!-- card in display mode -->
    <div class="card__container" style="position: relative;" v-if="!isEditable">
      <span class="btn--ghost abs abs--tr" @click="enterEditMode">
        <iconBase iconFillColor="white" icon-name="pen" width="16">
          <iconPen />
        </iconBase>
      </span>
      <h2 class="card__heading">{{identity.identityName}}</h2>
      <identityElement>
        <span slot="pin-parent">
          <span>
            <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconMail" width="16">
              <iconMail />
            </iconBase>
          </span>
          <copyText :inputText="identity.receiveMail"></copyText>
        </span>
        <span slot="pin-one" class="container--flex-vertical">
          redirect
          <label class="checkbox__container">
            <input type="checkbox" id="checkbox" v-model="identity.redirectActive" disabled />
            <span class="checkbox__checkmark"></span>
          </label>
        </span>
        <span slot="pin-two">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconCopy" width="16">
            <iconCopy />
          </iconBase>
        </span>
      </identityElement>

      <identityElement>
        <copyText slot="pin-parent" :inputText="identity.password" :textIsVisible="false"></copyText>
        <iconBase
          slot="pin-one"
          iconFillColor="transparent"
          strokeWidth="4px"
          icon-name="iconEye"
          width="16"
        >
          <iconEyeClosed />
        </iconBase>
        <span slot="pin-two">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconCopy" width="16">
            <iconCopy />
          </iconBase>
        </span>
      </identityElement>
    </div>

    <!-- card in edit mode -->
    <div
      class="card__container"
      style="position: relative;"
      v-else
      @keyup.esc="leaveCreateMode"
      tabindex="0"
    >
      <p v-if="errors.identityName" class="txt--warning">{{errors.identityName}}</p>
      <input
        type="text"
        class="card__heading"
        required
        pattern=".*"
        ref="identityNameInput"
        :placeholder="placeholderIdentity.identityName"
        v-model="identity.identityName"
      />
      <div class="container--flex-vertical card__textbox">
        <div v-if="mailLoading">
          <shufflingCharacters maxCharacterCount="15" :startText="identity.receiveMail" />
        </div>
        <div v-else>
          <copyText :inputText="identity.receiveMail"></copyText>
        </div>
        <button class="btn btn--ghost" @click="setRandomMail">create new</button>
      </div>
      <div class="container--flex-vertical">
        <div>redirect active:</div>
        <label class="checkbox__container">
          <input type="checkbox" id="checkbox" v-model="identity.redirectActive" />
          <span class="checkbox__checkmark"></span>
        </label>
      </div>
      <div class="container--flex-vertical card__textbox">
        <div v-if="passLoading">
          <shufflingCharacters maxCharacterCount="15" :startText="identity.password" />
        </div>
        <div v-else>
          <copyText :inputText="identity.password"></copyText>
        </div>
        <button class="btn btn--ghost" @click="setRandomPassword">create new</button>
      </div>
      <div class="container--flex-vertical">
        <button class="btn btn--ghost" @click="leaveCreateMode">discard</button>
        <button class="btn btn--primary" @click="setIdentity">save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shufflingCharacters from './shufflingCharacters';
import identityElement from './identityElement';
import iconBase from './creatives/iconBase';
import iconPen from './creatives/iconPen';
import iconMail from './creatives/iconMail';
import iconCopy from './creatives/iconCopy';
import iconEyeClosed from './creatives/iconEyeClosed';
import copyText from './copyText';
import store from '../store';
import { db } from '../main';

export default {
  components: {
    shufflingCharacters,
    copyText,
    identityElement,
    iconBase,
    iconPen,
    iconCopy,
    iconMail,
    iconEyeClosed
  },
  data() {
    return {
      isEditable: this.isEditableProp,
      mailLoading: false,
      passLoading: false,
      placeholderIdentity: {
        destinationMail: 'your@email.com',
        identityName: 'Identity Name',
        password: 'examplePassword',
        receiveMail: 'randommail@hannes.cool',
        redirectActive: true
      },
      errors: {
        identityName: null
      }
    };
  },
  props: {
    isEditableProp: {
      type: Boolean,
      default: false
    },
    identity: {
      type: Object,
      default: function() {
        return {
          destinationMail: '',
          identityName: '',
          password: 'placeholder-password',
          receiveMail: 'placeholder@receive.mail',
          redirectActive: true
        };
      }
    }
  },
  methods: {
    enterEditMode() {
      this.isEditable = true;
    },
    setRandomPassword() {
      this.passLoading = true;
      var length = 15,
        charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?=#@',
        retVal = '';
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      const self = this;
      setTimeout(function() {
        self.identity.password = retVal;
        self.passLoading = false;
      }, 500);
    },
    leaveCreateMode() {
      this.isEditable = false;
      console.log('leaving create mode');
      this.$emit('leaveCreateMode');
    },
    setIdentity() {
      if (this.identity['.key']) {
        this.updateIdentity();
      } else {
        this.storeNewIdentity();
      }
    },
    updateIdentity() {
      console.log('updating identity');
      // FORM VALIDATION
      if (this.identity.identityName.length === 0) {
        this.errors.identityName = 'Give a name to this identity';
        this.$refs['identityNameInput'].focus();
        return;
      } else {
        // reset errors if nothing is wrong
        // just in case any have been set
        this.errors.identityName = null;
      }
      // FORM VALIDATION
      const identityKey = this.identity['.key'];
      const identityRef = db.collection('identities').doc(identityKey);
      identityRef
        .set(
          {
            identityName: this.identity.identityName,
            password: this.identity.password,
            receiveMail: this.identity.receiveMail,
            redirectActive: this.identity.redirectActive
          },
          { merge: true }
        )
        .then(() => {
          this.leaveCreateMode();
        })
        .catch(err => {
          this.errors.identityName = err;
          return;
        });
    },
    storeNewIdentity() {
      console.log('storing new identity');

      // FORM VALIDATION
      if (this.identity.identityName.length === 0) {
        this.errors.identityName = 'Give a name to this identity';
        this.$refs['identityNameInput'].focus();
        return;
      } else {
        // reset errors if nothing is wrong
        // just in case any have been set
        this.errors.identityName = null;
      }
      // FORM VALIDATION

      db.collection('identities')
        .add({
          destinationMail: store.getters.user.data.email,
          identityName: this.identity.identityName,
          password: this.identity.password,
          receiveMail: this.identity.receiveMail,
          redirectActive: this.identity.redirectActive,
          userId: store.getters.user.data.userId
        })
        .then(() => {
          this.leaveCreateMode();
        })
        .catch(err => {
          this.errors.identityName = err;
          return;
        });
    },
    setRandomMail() {
      this.mailLoading = true;
      const randomMailEndpoint =
        'https://us-central1-project-polar-eda66.cloudfunctions.net/getIdentityEmail';
      let randomMail = '';
      axios
        .get(randomMailEndpoint)
        .then(response => (randomMail = response.data))
        .catch(err => console.error(err))
        .finally(() => {
          const self = this;
          setTimeout(function() {
            self.identity.receiveMail = randomMail;
            self.mailLoading = false;
          }, 1000);
        });
    }
  },
  created() {
    if (this.isEditable) {
      this.setRandomPassword();
      this.setRandomMail();
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>