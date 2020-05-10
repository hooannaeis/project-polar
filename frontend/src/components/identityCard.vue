<template>
  <div>
    <!-- card in display mode -->
    <div class="card__container" style="position: relative;" v-if="!isEditable">
      <h2 class="card__heading">{{identity.identityName}}</h2>
      <div class="container--flex-vertical card__textbox">
        <div>{{identity.receiveMail}}</div>
        <div>copy</div>
      </div>
      <div class="container--flex-vertical">
        <div>redirect active:</div>
        <input type="checkbox" id="checkbox" v-model="identity.redirectActive" />
      </div>
      <div class="container--flex-vertical card__textbox">
        <div>{{identity.password}}</div>
        <div>copy</div>
      </div>
    </div>

    <!-- card in edit mode -->
    <div class="card__container" v-else @keyup.esc="leaveCreateMode" tabindex="0">
      <input
        type="text"
        class="card__heading"
        :placeholder="placeholderIdentity.identityName"
        v-model="identity.identityName"
      />
      <div class="container--flex-vertical card__textbox">
        <div v-if="mailLoading">
          <shufflingCharacters maxCharacterCount="15" />
        </div>
        <div v-else>
          <div>{{identity.receiveMail}}</div>
        </div>
        <div class="btn btn--ghost">copy</div>
        <div class="btn btn--ghost" @click="setRandomMail">create new</div>
      </div>
      <div class="container--flex-vertical">
        <div>redirect active:</div>
        <input type="checkbox" id="checkbox" v-model="identity.redirectActive" />
      </div>
      <div class="container--flex-vertical card__textbox">
        <div v-if="passLoading">
          <shufflingCharacters maxCharacterCount="15" />
        </div>
        <div v-else>
          <div>{{identity.password}}</div>
        </div>
        <div class="btn btn--ghost">copy</div>
        <div class="btn btn--ghost" @click="setRandomPassword">create new</div>
        <!-- <div>{{identity.password}}</div>
        <div>copy</div>-->
      </div>
      <div class="container--flex-vertical">
        <div class="btn btn--ghost" @click="leaveCreateMode">discard</div>
        <div class="btn btn--accent" @click="storeNewIdentity">save</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shufflingCharacters from './shufflingCharacters';
import store from '../store';
import { db } from '../main';

export default {
  components: {
    shufflingCharacters
  },
  data() {
    return {
      mailLoading: false,
      passLoading: false,
      placeholderIdentity: {
        destinationMail: 'your@email.com',
        identityName: 'Identity Name',
        password: 'examplePassword',
        receiveMail: 'randommail@hannes.cool',
        redirectActive: true
      }
    };
  },
  props: {
    isEditable: {
      type: Boolean,
      default: false
    },
    identity: {
      type: Object,
      default: function() {
        return {
          destinationMail: '',
          identityName: '',
          password: '',
          receiveMail: '',
          redirectActive: true
        };
      }
    }
  },
  methods: {
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
      console.log('leaving create mode');
      this.$emit('leaveCreateMode');
    },
    storeNewIdentity() {
      console.log('storing new identity');
      console.log(this);
      db.collection('identities')
        .add({
          destinationMail: this.identity.destinationMail,
          identityName: this.identity.identityName,
          password: this.identity.password,
          receiveMail: this.identity.receiveMail,
          redirectActive: this.identity.redirectActive,
          userId: store.getters.user.data.userId
        })
        .then(() => {
          this.$emit('leaveCreateMode');
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