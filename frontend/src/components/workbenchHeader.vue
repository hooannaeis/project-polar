<template>
  <div class="container--flex-vertical container--header">
    <input type="text" placeholder="Search..." v-model="searchTerm" />
    <iconBase iconFillColor="transparent" iconColor="black" icon-name="search" width="30">
      <iconSearch />
    </iconBase>
    <span class="dropdown__container">
      <h1 @click="toggleDropdown">{{user.data.displayName}}</h1>
      <div class="dropdown__content" :class="{'show': showDropdown}">
        <button class="btn btn--warning" @click="logout">log out</button>
      </div>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import iconBase from './creatives/iconBase';
import iconSearch from './creatives/iconSearch';

export default {
  data() {
    return {
      searchTerm: null,
      showDropdown: false
    }
  },
  components: {
    iconBase,
    iconSearch
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('log-in');
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