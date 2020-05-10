<template>
  <div>
    <button class="btn btn--primary" v-if="!inCreateMode" @click="enterCreateMode" id="createButton">+</button>
    <div class="modal__container" v-else>
      <div class="modal__background"></div>
      <identityCard class="modal__card" :isEditable="true" @leaveCreateMode="inCreateMode = false" />
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
  bottom: 4rem; /* Place the button at the bottom of the page */
  right: 4rem; /* Place the button 30px from the right */
  z-index: 9; /* Make sure it does not overlap */
}

.test {
  display: none;
}
</style>