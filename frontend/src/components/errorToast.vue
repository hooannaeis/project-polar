<template>
  <div>
    <div id="error-toast">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String
    }
  }
}
</script>

<style>
#error-toast {
  position: fixed; /* Fixed/sticky position */
  bottom: 4rem; /* Place the button at the bottom of the page */
  right: 50%; /* Place the button 30px from the right */
  z-index: 9; /* Make sure it does not overlap */
}

.test {
  display: none;
}
</style>