<template>
  <div class="container--flex-vertical container--header">
    <div class="grid grid--header-col mg--auto">
      <router-link to="/" class="container--flex-vertical">
        <logo width="60" height="40"></logo>
        <h1 class="txt--fancy txt--primary">identity land</h1>
      </router-link>
      <div class="container--flex container--flex-end">
        <router-link
          class="btn btn--ghost-bright btn--mini"
          to="/log-in"
          v-if="this.$route.path != '/log-in'"
        >log in</router-link>
        <router-link to="/sign-up" v-else class="btn btn--ghost-bright btn--mini">sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import logo from './creatives/logo';
export default {
  components: {
    logo
  }
};
</script>

<style>
</style>