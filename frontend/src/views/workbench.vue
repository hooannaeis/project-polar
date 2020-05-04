<template>
  <div>
    <workbenchHeader />
    <createIdentity />
    <identityCard
      v-bind:identity="exampleIdentity"
    />
  </div>
</template>

<script>
import workbenchHeader from '../components/workbenchHeader';
import identityCard from '../components/identityCard';
import createIdentity from '../components/createIdentity';

export default {
  components: {
    identityCard,
    workbenchHeader,
    createIdentity
  },
  data() {
    return {
      exampleIdentity: {
        destinationMail: 'something@live.de',
        identityName: 'Amazon',
        password: 'awieoasdfzu24',
        receiveMail: 'asdfasdf@hannes.cool',
        redirectActive: true,
        userId: 'YJh2VkodYVgYmiNUtfp5PIrlZ7g1'
      }
    };
  }
};
</script>

<style>
</style>