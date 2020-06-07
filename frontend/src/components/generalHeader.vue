<template>
  <div class="container--header">
    <div class="grid grid--header-col mg--auto">
      <span class="container--flex-vertical">
        <logo width="60" height="40"></logo>
        <h1 class="txt--fancy txt--primary">identity land</h1>
      </span>
      <div class="container--flex container--flex-end">
        <router-link to="/log-in" v-if="this.$route.path != '/log-in'">log in</router-link>
        <router-link to="/sign-up" v-else>sign up</router-link>
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