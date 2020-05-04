<template>
  <div class="container--flex-vertical">
    <h1>{{user.data.displayName}}'s workbench</h1>
    <div>
      <button @click="logout">log out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('log-in');
        });
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