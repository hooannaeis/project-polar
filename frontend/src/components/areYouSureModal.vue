<template>
  <div>
    <div class="modal__background" @click="$emit('discard')"></div>
    <div class="modal__card card__container">
      <slot></slot>
      <button class="btn btn--warning" @click="$emit('confirm')">Yes</button>
      <button class="btn btn--ghost-dark" @click="$emit('discard')">No</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
