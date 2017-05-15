<template lang="html">
  <main id="bookmark" :class="{ 'main-content': true, 'shrink': showMenu }">
    <div class="op-container">
      <md-button @click.native="openAddBookmark"><md-icon>add</md-icon> 新增便签</md-button>
    </div>
    <div class="bookmark-container grid">
      <md-whiteframe md-elevation="4" class="bookmark-instance" type="todo" >
        <ul>
          <li v-for="n in 5">
            <md-checkbox class="md-primary">任务事项{{ n }}</md-checkbox>
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
    <create-bookmark-dialog></create-bookmark-dialog>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreateBookmarkDialog from './dialogs/CreateBookmarkDialog';
import VueGridLayout from 'vue-grid-layout';
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;

export default {
  components: {
    CreateBookmarkDialog,
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: [
  	    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
  	    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
  	    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
  	    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
  	    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
  	    {"x":10,"y":0,"w":2,"h":3,"i":"5"},
  	    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
  	    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
  	    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
  	    {"x":6,"y":4,"w":2,"h":4,"i":"9"},
  	    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
  	    {"x":10,"y":4,"w":2,"h":4,"i":"11"},
  	    {"x":0,"y":10,"w":2,"h":5,"i":"12"},
  	    {"x":2,"y":10,"w":2,"h":5,"i":"13"},
  	    {"x":4,"y":8,"w":2,"h":4,"i":"14"},
  	    {"x":6,"y":8,"w":2,"h":4,"i":"15"},
  	    {"x":8,"y":10,"w":2,"h":5,"i":"16"},
  	    {"x":10,"y":4,"w":2,"h":2,"i":"17"},
  	    {"x":0,"y":9,"w":2,"h":3,"i":"18"},
  	    {"x":2,"y":6,"w":2,"h":2,"i":"19"}
    	]
    }
  },
  computed: {
    ...mapGetters(['showMenu']),
  },
  methods: {
    ...mapMutations({ openAddBookmark: 'openBookmarkDialog' }),
    // openAddBookmark() {
    //   console.log("qwq")
    // }
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
