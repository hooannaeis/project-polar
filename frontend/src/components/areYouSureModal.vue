<template>
  <div class="modal__card">
    <slot></slot>
    <button @click="$emit('confirm')">Yes</button>
    <button @click="$emit('discard')">No</button>
  </div>
</template>

<script>
export default {};
</script>
