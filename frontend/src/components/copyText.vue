<template>
  <span>
    <span @click="copyText" id="displayText">{{ displayText }}</span>
    <span class="invisible" ref="copyText">{{ inputText }}</span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      // code representation of emois
      characterBase: [
        0x1f44b,
        0x1f91a,
        0x1f590,
        0x270b,
        0x1f596,
        0x1f44c,
        0x1f90f,
        0x1f91e,
        0x1f449,
        0x1f919
      ]
    };
  },
  computed: {
    displayText() {
      if (this.textIsVisible) {
        return this.inputText;
      } else {
        return this.anonymizeText(this.inputText);
      }
    }
  },
  props: {
    inputText: {
      default: 'nothing to show here',
      type: String
    },
    textIsVisible: {
      default: true,
      type: Boolean
    },
    maxLength: {
      default: 7,
      type: Number
    }
  },
  methods: {
    anonymizeText(inputText) {
      let returnText = '';
      for (let i = 0; i < this.maxLength; i++) {
        const randIndex = Math.floor(Math.random() * this.characterBase.length);
        const randChar = String.fromCodePoint(this.characterBase[randIndex]);
        returnText += randChar;
      }
      return returnText;
    },
    copyText() {
      var copyTextArea = document.createElement('textarea');

      // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //

      // Place in top-left corner of screen regardless of scroll position.
      copyTextArea.style.position = 'fixed';
      copyTextArea.style.top = 0;
      copyTextArea.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      copyTextArea.style.width = '2em';
      copyTextArea.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      copyTextArea.style.padding = 0;

      // Clean up any borders.
      copyTextArea.style.border = 'none';
      copyTextArea.style.outline = 'none';
      copyTextArea.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      copyTextArea.style.background = 'transparent';

      copyTextArea.value = this.inputText;

      document.body.appendChild(copyTextArea);
      copyTextArea.focus();
      copyTextArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(copyTextArea);
    }
  }
};
</script>

<style lang="scss" scoped>
.invisible {
  visibility: hidden;
  position: absolute;
}

#displayText {
  padding: 0.1rem;
  &:hover {
    background-color: transparentize($color: darkgrey, $amount: 0.8);
    cursor: pointer;
  }
}
</style>