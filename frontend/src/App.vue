<template>
  <div id="app">
    <generalHeader v-if="!this.$route.path.includes('my')" />
    <workbenchHeader v-else />
    <router-view />
    <generalFooter />
  </div>
</template>

<script>
import generalFooter from './components/generalFooter';
import generalHeader from './components/generalHeader';
import workbenchHeader from './components/workbenchHeader';

export default {
  name: 'app',
  components: {
    generalFooter,
    generalHeader,
    workbenchHeader
  }
};
</script>