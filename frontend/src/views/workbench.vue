<template>
  <div>
    workbench
    {{user.data.email}}
    {{user.data.firstName}}
    <ul>
      <li>i1</li>
      <li>i2</li>
      <li>i3</li>
    </ul>
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

<style>
</style>