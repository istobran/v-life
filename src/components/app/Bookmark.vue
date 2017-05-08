<template lang="html">
  <main id="bookmark" :class="{ 'main-content': true, 'shrink': showMenu }">
    <div class="op-container">
      <md-button><md-icon>add</md-icon> 新增便签</md-button>
    </div>
    <div class="bookmark-container">
      <md-whiteframe md-elevation="4" class="bookmark-instance" type="todo">
        <ul>
          <li v-for="n in 5">
            <md-checkbox v-model="checkbox" class="md-primary">任务事项{{ n }}</md-checkbox>
          </li>
        </ul>
      </md-whiteframe>
      <md-whiteframe md-elevation="4" class="bookmark-instance" type="text">
        <p>Lorem ipsum dolor sit amet, doming noster at quo, nostrud lucilius rationibus ea duo. Vim no mucius dolores. No bonorum voluptatum vis, has iudicabit consectetuer ne. Nullam sensibus vim id, et quo graeci perpetua.</p>
        <p>Lorem ipsum dolor sit amet, doming noster at quo, nostrud lucilius rationibus ea duo. Vim no mucius dolores. No bonorum voluptatum vis, has iudicabit consectetuer ne. Nullam sensibus vim id, et quo graeci perpetua.</p>
      </md-whiteframe>
      <md-whiteframe md-elevation="4" class="bookmark-instance" type="draw">
        <p>Lorem ipsum dolor sit amet, doming noster at quo, nostrud lucilius rationibus ea duo. Vim no mucius dolores. No bonorum voluptatum vis, has iudicabit consectetuer ne. Nullam sensibus vim id, et quo graeci perpetua.</p>
        <p>Lorem ipsum dolor sit amet, doming noster at quo, nostrud lucilius rationibus ea duo. Vim no mucius dolores. No bonorum voluptatum vis, has iudicabit consectetuer ne. Nullam sensibus vim id, et quo graeci perpetua.</p>
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
  padding: 20px
  .bookmark-instance
    width: 200px
    padding: 20px
    background-color: #FFFFFF
    max-height: 200px
    overflow: scroll
    &[type=todo]
      display: block
    &[type=text]
      display: block
    &[type=draw]
      display: block
</style>
