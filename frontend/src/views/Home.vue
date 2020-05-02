<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>welcome</h1>
    <h2>project polar</h2>
    <div>
      <p>wanna join?</p>
      <router-link to="/sign-up">sign up</router-link>
      <router-link to="/log-in">log in</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
};
</script>
