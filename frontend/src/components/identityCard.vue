<template>
  <div>
    <!-- card in display mode -->
    <div class="card__container" style="position: relative;" v-if="!isEditable">
      <span class="btn--ghost-bright pos--abs pos--tr" @click="enterEditMode">
        <iconBase iconFillColor="white" icon-name="pen" width="16">
          <iconPen />
        </iconBase>
      </span>
      <h2 class="card__heading">{{identity.identityName}}</h2>
      <identityElement>
        <span slot="pin-parent" class="grid grid--header-col">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconMail" width="16">
            <iconMail />
          </iconBase>
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
        <span slot="pin-parent" class="grid grid--header-col">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="lock" width="16">
            <iconLock />
          </iconBase>
          <copyText :inputText="identity.password" :textIsVisible="showPassword"></copyText>
        </span>
        <span slot="pin-one" @click="togglePasswordVisibility">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconEye" width="16">
            <iconEyeOpen v-if="showPassword" />
            <iconEyeClosed v-else />
          </iconBase>
        </span>
        <iconBase
          slot="pin-two"
          iconFillColor="transparent"
          strokeWidth="4px"
          icon-name="iconCopy"
          width="16"
        >
          <iconCopy />
        </iconBase>
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
        class="card__heading txt--is-headline"
        required
        pattern=".*"
        ref="identityNameInput"
        :placeholder="placeholderIdentity.identityName"
        v-model="identity.identityName"
      />
      <span class="btn--ghost-bright pos--abs pos--tr" @click="leaveCreateMode">X</span>
      <identityElement>
        <span slot="pin-parent" class="grid grid--header-col">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconMail" width="16">
            <iconMail />
          </iconBase>
          <div v-if="mailLoading">
            <shufflingCharacters maxCharacterCount="15" :startText="identity.receiveMail" />
          </div>
          <div v-else>
            <copyText :inputText="identity.receiveMail"></copyText>
          </div>
        </span>
        <span slot="pin-one" class="container--flex-vertical">
          redirect
          <label class="checkbox__container">
            <input type="checkbox" id="checkbox" v-model="identity.redirectActive" />
            <span class="checkbox__checkmark"></span>
          </label>
        </span>
        <span slot="pin-two" @click="setRandomMail">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="shuffle" width="16">
            <iconShuffle />
          </iconBase>
        </span>
      </identityElement>
      <!-- PASSWORD ELEMENT -->
      <identityElement>
        <span slot="pin-parent" class="grid grid--header-col">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="lock" width="16">
            <iconLock />
          </iconBase>
          <div v-if="passLoading">
            <shufflingCharacters maxCharacterCount="15" :startText="identity.password" />
          </div>
          <div v-else>
            <copyText :inputText="identity.password" :textIsVisible="showPassword"></copyText>
          </div>
        </span>
        <span slot="pin-one" @click="togglePasswordVisibility">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="iconEye" width="16">
            <iconEyeOpen v-if="showPassword" />
            <iconEyeClosed v-else />
          </iconBase>
        </span>
        <span @click="setRandomPassword" slot="pin-two">
          <iconBase iconFillColor="transparent" strokeWidth="4px" icon-name="shuffle" width="16">
            <iconShuffle />
          </iconBase>
        </span>
      </identityElement>
      <!-- PASSWORD ELEMENT -->

      <div class="container--flex-vertical">
        <button class="btn btn--ghost-bright" @click="initializeDelete">delete</button>
        <button class="btn btn--primary" @click="setIdentity">save</button>
      </div>
      <areYouSureModal
        v-show="showDeleteModal"
        @confirm="deleteIdentity"
        @discard="showDeleteModal = false"
      >Are you sure, you want to delete {{ identity.identityName }}</areYouSureModal>
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
import iconEyeOpen from './creatives/iconEyeOpen';
import iconShuffle from './creatives/iconShuffle';
import iconLock from './creatives/iconLock';
import copyText from './copyText';
import areYouSureModal from './areYouSureModal';
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
    iconEyeClosed,
    iconEyeOpen,
    iconLock,
    areYouSureModal,
    iconShuffle
  },
  data() {
    return {
      showPassword: false,
      showDeleteModal: false,
      isEditable: this.isEditableProp,
      mailLoading: false,
      passLoading: false,
      placeholderIdentity: {
        destinationMail: 'your@email.com',
        identityName: 'Identity Name',
        password: 'examplePassword',
        receiveMail: 'randommail@identity.land',
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
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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
    initializeDelete() {
      this.showDeleteModal = !this.showDeleteModal;
    },
    deleteIdentity() {
      this.errors.identityName = null;

      const identityKey = this.identity['.key'];
      const identityRef = db.collection('identities').doc(identityKey);
      identityRef
        .delete()
        .then(() => {
          this.leaveCreateMode();
        })
        .catch(err => {
          this.errors.identityName = err;
          return;
        });
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
          this.identity.receiveMail = randomMail;
          this.mailLoading = false;
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