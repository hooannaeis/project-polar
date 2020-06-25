<template>
  <div>
    <button class="btn btn--primary" v-if="!inCreateMode" @click="enterCreateMode">+</button>
    <div class="modal__background" v-if="inCreateMode"></div>
    <identityCard
      v-if="inCreateMode"
      class="modal__card"
      :isEditableProp="true"
      :isDeleteableProp="false"
      @leaveCreateMode="inCreateMode = false"
    />
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