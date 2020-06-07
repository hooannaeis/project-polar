<template>
  <div>
    {{ user }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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