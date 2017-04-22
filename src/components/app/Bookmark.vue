<template lang="html">
  <main id="bookmark" :class="{ 'main-content': true, 'shrink': showMenu }">

  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['showMenu']),
  }
}
</script>

<style lang="css">
</style>
