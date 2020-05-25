<template>
  <div class="container--flex-vertical container--header">
    <span class="dropdown__container">
      <button @click="toggleDropdown" class="btn btn--ghost-dark">{{user.data.displayName}}</button>
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

export default {
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