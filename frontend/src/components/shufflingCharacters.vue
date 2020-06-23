<template>
  <transition-group name="grow" tag="p" style="white-space: nowrap; line-height: 1rem; padding:0;margin:0;">
    <span
      v-for="(randChar, index) in randomCharacters"
      v-bind:key="randChar+index"
      class="grow"
    >{{ randChar }}</span>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      randomCharacters: this.startText.split(''),
      characterBase: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?=#@'.split(
        ''
      ),
      randomizerInterval: undefined,
      maxCharacterCount: this.startText.length
    };
  },
  props: {
    startText: {
      default: 'random text',
      type: String
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
  mounted() {
    console.log(this);
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