<template>
  <div class="container--flex-vertical container--header">
    <span class="dropdown__container">
      <logo width="60" height="40"></logo>
      <button @click="toggleDropdown" class="btn btn--ghost-dark">{{user.data.displayName}}</button>
      <div class="dropdown__content" :class="{'show': showDropdown}">
        <router-link to="/my/account" tag="button" class="btn btn--ghost-dark btn--is-mini">My Account</router-link>
        <button class="btn btn--warning btn--is-mini " @click="logout">log out</button>
      </div>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { firebase } from '@firebase/app';
import '@firebase/auth';

import logo from './creatives/logo';

export default {
  components: {
    logo
  },
  data() {
    return {
      searchTerm: null,
      showDropdown: false
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: '/log-in' });
        });
    },
    toggleDropdown: function() {
      this.showDropdown = !this.showDropdown;
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user'
    })
  }
};
</script>

<style lang="scss" scoped>
.hello {
  display: none;
}
</style>