<template>
  <div class="container--flex-vertical container--header">
    <span class="dropdown__container container--flex-vertical">
      <logo width="60" height="40"></logo>
      <button @click="toggleDropdown" class="btn btn--ghost-bright">{{user.data.displayName}}</button>
      <div class="dropdown__content" :class="{'show': showDropdown}">
        <router-link
          @click="toggleDropdown"
          v-if="$route.path.includes('my/account')"
          to="/my/workbench"
          tag="button"
          class="btn btn--ghost-bright btn--mini"
        >My Workbench</router-link>
        <router-link
          @click="toggleDropdown"
          v-else
          to="/my/account"
          tag="button"
          class="btn btn--ghost-bright btn--mini"
        >My Account</router-link>
        <button class="btn btn--warning" @click="logout">log out</button>
      </div>
    </span>
    <createIdentity />
    <span>
      <input type="text" v-model="searchTerm" class="txt--bright border--bt-bright" />
      <iconBase
        iconColor="rgb(240, 235, 235)"
        iconFillColor="transparent"
        strokeWidth="4px"
        icon-name="iconMail"
        width="16"
      >
        <iconSearch />
      </iconBase>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { firebase } from '@firebase/app';
import '@firebase/auth';

import logo from './creatives/logo';
import iconBase from './creatives/iconBase';
import iconSearch from './creatives/iconSearch';
import createIdentity from '../components/createIdentity';

export default {
  components: {
    logo,
    iconBase,
    iconSearch,
    createIdentity
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: '/log-in' });
        });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
      }
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user'
    }),
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.dispatch('updateSearchTerm', value);
      }
    }
  },
  // used to allow the dropdown to vanish if clicked outside of it
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style lang="scss" scoped>
.hello {
  display: none;
}
</style>