<template>
  <div>
    <createIdentity />
    <div v-if="identities.length" class="container--grid">
      <section v-for="identity in identities" :key="identity['.key']">
        <identityCard :identity="identity" />
      </section>
    </div>
    <h2 v-else class="txt--warning">you didn't create any identities yet...</h2>
  </div>
</template>

<script>
import identityCard from '../components/identityCard';
import createIdentity from '../components/createIdentity';

import { firebase } from '@firebase/app';
import '@firebase/auth';

import { db } from '../main';
import store from '../store';

export default {
  components: {
    identityCard,
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
      const identities = db
        .collection('identities')
        .where('userId', '==', store.getters.userId);
      return {
        identities
      };
    }
  }
};
</script>

<style>
</style>