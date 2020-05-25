<template>
  <div>
    <button
      class="btn btn--primary"
      v-if="!inCreateMode"
      @click="enterCreateMode"
      id="createButton"
    >+</button>
    <div class="modal__container" v-else>
      <div class="modal__background"></div>
      <button
        class="btn btn--warning pos--fix pos--bm z--2"
        @click="enterCreateMode"
      >X</button>
      <identityCard
        class="modal__card"
        :isEditableProp="true"
        @leaveCreateMode="inCreateMode = false"
      />
    </div>
  </div>
</template>

<script>
import identityCard from './identityCard';

export default {
  data() {
    return {
      inCreateMode: false
    };
  },
  components: {
    identityCard
  },
  methods: {
    enterCreateMode() {
      this.inCreateMode = !this.inCreateMode;
      return;
    }
  }
};
</script>

<style>
#createButton {
  position: fixed; /* Fixed/sticky position */
  bottom: 0; /* Place the button at the bottom of the page */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9; /* Make sure it does not overlap */
}

.test {
  display: none;
}
</style>