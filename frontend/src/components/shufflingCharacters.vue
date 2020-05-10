<template>
  <transition-group name="grow" tag="p">
    <span
      v-for="randChar in randomCharacters"
      v-bind:key="randChar"
      class="grow"
    >{{ randChar }}</span>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      randomCharacters: 'random'.split(''),
      characterBase: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?=#@'.split(
        ''
      ),
      randomizerInterval: undefined
    };
  },
  props: {
    maxCharacterCount: {
      default: 15
    }
  },
  methods: {
    shuffle: function(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    initRandomizer: function() {
      let self = this;
      this.randomizerInterval = setInterval(function() {
        let randomChars = self.shuffle(self.characterBase)
        self.randomCharacters = randomChars.slice(0, Number(self.maxCharacterCount));
      }, 300)
    }
  },
  beforeCreate() {
    this.initRandomizer();
  },
  destroyed() {
    clearInterval(this.randomizerInterval);
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>