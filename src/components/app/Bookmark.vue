<template lang="html">
  <main id="bookmark" :class="{ 'main-content': true, 'shrink': showMenu }">
    <div class="op-container">
      <md-button @click.native="openAddBookmark"><md-icon>add</md-icon> 新增便签</md-button>
    </div>
    <waterfall :line-gap="220" :watch="stickers">
      <waterfall-slot
        v-for="(sticker, index) in stickers"
        :width="sticker.width"
        :height="sticker.height"
        :order="index"
        :key="sticker.id"
      >
      <div class="bookmark-instance" type="todo" v-if="sticker.type ==='todo'">
        <ul>
          <li v-for="it in sticker.content">
            <md-checkbox class="md-primary" v-model="it.checked">{{ it.desc }}</md-checkbox>
          </li>
        </ul>
      </div>
      <div class="bookmark-instance" type="text" v-if="sticker.type ==='text'" v-html="sticker.content">
      </div>
      <div class="bookmark-instance" type="draw" v-if="sticker.type ==='draw'">
        <img src="sticker.content">
      </div>
      </waterfall-slot>
    </waterfall>
    <create-bookmark-dialog></create-bookmark-dialog>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreateBookmarkDialog from './dialogs/CreateBookmarkDialog';
import Waterfall from 'vue-waterfall';

export default {
  components: {
    CreateBookmarkDialog,
    'waterfall': Waterfall.waterfall,
    'waterfall-slot': Waterfall.waterfallSlot
  },
  data() {
    return {
      stickers: [
        {
          id: 1,
          type: "draw",
          content: null,
          width: 220,
          height: 220
        },
        {
          id: 2,
          type: "todo",
          content: [
            { checked: false, desc: "任务事项 1" },
            { checked: false, desc: "任务事项 2" },
            { checked: true, desc: "任务事项 3" },
            { checked: false, desc: "任务事项 4" },
            { checked: false, desc: "任务事项 5" }
          ],
          width: 220,
          height: 220
        },
        {
          id: 3,
          type: "text",
          content: "<p>Lorem ipsum dolor sit amet</p>",
          width: 220,
          height: 220
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['showMenu']),
  },
  methods: {
    ...mapMutations({ openAddBookmark: 'openBookmarkDialog' }),
  }
}
</script>

<style lang="sass">
.op-container
  text-align: right
  .md-button
    margin: 10px 26px 0 0
    color: #328AFB
.bookmark-instance
  position: absolute
  top: 8px
  left: 8px
  right: 8px
  bottom: 8px
  box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)
  box-sizing: border-box
  background-color: #FFFFFF
  overflow: scroll
  &[type=todo]
    display: block
    padding: 20px
  &[type=text]
    display: block
    padding: 20px
  &[type=draw]
    display: block
</style>
