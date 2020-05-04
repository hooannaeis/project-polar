<template>
  <div>
    <!-- card in display mode -->
    <div class="card__container" v-if="!isEditable">
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
    <div class="card__container" v-else>
      <input
        type="text"
        class="card__heading"
        :placeholder="placeholderIdentity.identityName"
        v-model="identity.identityName"
      />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    generatePassword() {
      var length = 15,
        charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?=#@',
        retVal = '';
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }
  },
  created() {
    if (this.isEditable) {
      this.identity.password = this.generatePassword();
      // TODO: get a random email address and assign it to his.identity.receiveMail
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>