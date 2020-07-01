<template>
<div class="container--footer">
  <div class="grid grid--two-col max-width--tablet mg--auto">
    <div>
      <p>the very important pages</p>
      <p>
        <router-link class="link" to="/imprint">imprint</router-link>
      </p>
      <p>
        <router-link class="link" to="/privacy-policy">privacy policy</router-link>
      </p>
      <p>
        <span class="link" href="https://github.com/hooannaeis/project-polar" target="blank">GitHub Repo</span>
      </p>
    </div>
    <div>
      <p>🤷‍♂️</p>
      <p class="txt--fancy">made by accident</p>
      <p class="txt--fancy">and Hannes Kuhl</p>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text {
  display: none;
}
</style>