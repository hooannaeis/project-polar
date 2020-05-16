<template>
  <div>
    <workbenchHeader />
    <createIdentity />
    <div v-if="identities.length" class="container--grid">
      <section v-for="identity in identities" :key="identity['.key']">
        <identityCard :identity="identity" />
      </section>
    </div>
    <identityCard v-else :identity="exampleIdentity" />
  </div>
</template>

<script>
import workbenchHeader from '../components/workbenchHeader';
import identityCard from '../components/identityCard';
import createIdentity from '../components/createIdentity';

import { firebase } from '@firebase/app';
import '@firebase/auth';

import { db } from '../main';
import store from '../store';

export default {
  components: {
    identityCard,
    workbenchHeader,
    createIdentity
  },
  data() {
    return {
      identities: [],
      exampleIdentity: {
        destinationMail: '',
        identityName: 'No identities available',
        password: '',
        receiveMail: '',
        redirectActive: false
      }
    };
  },
  firestore() {
    console.log('workbench', store.getters.userId);
    if (store.getters.userId) {
      return {
        identities: db
          .collection('identities')
          .where('userId', '==', store.getters.userId)
      };
    }
  }
};
</script>

<style>
</style>