<template lang="html">
  <main id="setting" :class="{ 'main-content': true, 'shrink': showMenu }">

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
