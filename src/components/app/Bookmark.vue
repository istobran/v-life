<template lang="html">
  <main id="bookmark" :class="{ 'main-content': true, 'shrink': showMenu }">
    <div class="op-container">
      <md-button><md-icon>add</md-icon> 新增便签</md-button>
    </div>
    <div class="bookmark-container">
      <md-whiteframe md-elevation="4" class="bookmark-instance">
        <ul>
          <li v-for="n in 5">
            <md-checkbox v-model="checkbox" class="md-primary">任务事项{{ n }}</md-checkbox>
          </li>
        </ul>
      </md-whiteframe>
    </div>
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

<style lang="sass">
.op-container
  text-align: right
  .md-button
    margin: 10px 26px 0 0
    color: #328AFB
.bookmark-container
  .bookmark-instance
    &[type=todo]
      background-color: #FFFFFF
</style>
