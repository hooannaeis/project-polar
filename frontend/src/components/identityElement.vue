<template>
  <div>
    <div class="card__textbox">
      <slot name="pin-parent" style="margin-bottom:0;">
        default text
      </slot>
    </div>
    <div class="container--flex-vertical container--flex-end">
      <span class="card__pinhead">
        <slot name="pin-one">def 1</slot>
      </span>
      <span class="card__pinhead">
        <slot name="pin-two">def 2</slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.test {
  display: none;
}

</style>