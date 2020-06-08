<template>
  <div>
    <section class="grid grid--two-col mg--auto container--full-height container--flex-vertical">
      <div>
        <h2 class="txt--fancy txt--primary">data breaches...</h2>
        <p>you don't have time</p>
        <p>to worry about them</p>
        <router-link tag="button" to="/sign-up" class="btn btn--warning txt--fancy">sign up</router-link>
      </div>
      <div>
        <span style="border: 1px dashed red; height: 10rem; width: 10rem;">image placeholder</span>
      </div>
    </section>
    <section class="grid grid--two-col container--full-height container--flex-vertical">
      <div>placeholder image</div>
      <div>
        <h2 class="txt--fancy txt--primary">what's the risk?</h2>
        <p>using the same email and password on all your account means if one of them breaches, all your accounts are at risk</p>
        <p>with identity land, it's easy to set up individual emails and password for all you accouns</p>
        <router-link tag="button" to="/sign-up" class="btn btn--warning txt--fancy">sign up</router-link>
      </div>
    </section>
    <section>
      <h2 class="txt--fancy txt--warning">Oooooooor</h2>
      <p>you can also take a look at this app's GitHub and maybe host it yourself 😁</p>
      <span class="link" href="https://github.com/hooannaeis/project-polar" target="blank">
        GitHub repository
      </span>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>