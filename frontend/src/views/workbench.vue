<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else-if="filteredIdentities.length" class="container--grid">
      <section v-for="identity in filteredIdentities" :key="identity['.key']">
        <identityCard :identity="identity" />
      </section>
    </div>
    <h2 v-else class="txt--warning">you didn't create any identities yet...</h2>
  </div>
</template>

<script>
import identityCard from '../components/identityCard';
import { firebase } from '@firebase/app';
import '@firebase/auth';

import { mapGetters } from 'vuex'
import { db } from '../main';
import store from '../store';

export default {
  components: {
    identityCard
  },
  data() {
    return {
      identities: [],
      loading: false,
      exampleIdentity: {
        destinationMail: '',
        identityName: 'No identities available',
        password: '',
        receiveMail: '',
        redirectActive: false
      }
    };
  },
  watch: {
    identities: function(data) {
      if (data.length) {
        store.dispatch('setIdentities', data);
      }
    }
  },
  computed: {
    ...mapGetters(["filteredIdentities"]),
  },
  firestore() {
    console.log('workbench', store.getters.userId);
    if (store.getters.userId) {
      this.loading = true;
      const identities = db
        .collection('identities')
        .where('userId', '==', store.getters.userId);
      this.loading = false;
      return {
        identities
      };
    }
  }
};
</script>

<style>
</style>