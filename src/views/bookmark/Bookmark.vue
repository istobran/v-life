<template lang="html">
  <main
    id="bookmark"
    :class="{ 'main-content': true, 'shrink': showMenu }"
  >
    <div class="op-container">
      <v-btn @click="openAddBookmark">
        <v-icon>add</v-icon> 新增便签
      </v-btn>
    </div>
    <waterfall
      :line-gap="220"
      :watch="stickers"
    >
      <waterfall-slot
        v-for="(sticker, index) in stickers"
        :key="sticker.id"
        :width="sticker.width"
        :height="sticker.height"
        :order="index"
      >
        <div
          v-if="sticker.type ==='todo'"
          class="bookmark-instance"
          type="todo"
        >
          <v-icon
            class="btn-del"
            @click.native="delBookmark(index)"
          >
            close
          </v-icon>
          <ul>
            <li
              v-for="it in sticker.content"
              :key="it.id"
            >
              <v-checkbox
                v-model="it.checked"
                :label="it.desc"
              />
            </li>
          </ul>
        </div>
        <div
          v-if="sticker.type ==='text'"
          class="bookmark-instance"
          type="text"
        >
          <v-icon
            class="btn-del"
            @click="delBookmark(index)"
          >
            close
          </v-icon>
          {{ sticker.content }}
        </div>
        <div
          v-if="sticker.type ==='draw'"
          class="bookmark-instance"
          type="draw"
        >
          <v-icon
            class="btn-del"
            @click="delBookmark(index)"
          >
            close
          </v-icon>
          <img :src="sticker.content">
        </div>
      </waterfall-slot>
    </waterfall>
    <create-bookmark-dialog
      @addText="addText"
      @addTodo="addTodo"
      @addDraw="addDraw"
    />
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Waterfall from 'vue-waterfall'
import CreateBookmarkDialog from './CreateBookmarkDialog.vue'

export default {
  components: {
    CreateBookmarkDialog,
    waterfall: Waterfall.waterfall,
    'waterfall-slot': Waterfall.waterfallSlot
  },
  data () {
    return {
      delIndex: null,
      stickers: [
        {
          id: 1,
          type: 'draw',
          content: null,
          width: 220,
          height: 220
        },
        {
          id: 2,
          type: 'todo',
          content: [
            { checked: false, desc: '任务事项 1' },
            { checked: false, desc: '任务事项 2' },
            { checked: true, desc: '任务事项 3' },
            { checked: false, desc: '任务事项 4' },
            { checked: false, desc: '任务事项 5' }
          ],
          width: 220,
          height: 220
        },
        {
          id: 3,
          type: 'text',
          content: '<p>Lorem ipsum dolor sit amet</p>',
          width: 220,
          height: 220
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['showMenu'])
  },
  methods: {
    ...mapMutations({ openAddBookmark: 'openBookmarkDialog' }),
    /**
     * 添加文本便签
     * @param {Object} textPane 文本便签数据对象
     */
    addText (textPane) {
      this.stickers.push({
        id: this.stickers.length,
        type: 'text',
        content: textPane.input,
        width: 220,
        height: 220
      })
    },
    /**
     * 添加待完成列表便签
     * @param {Object} todoPane 待完成列表数据对象
     */
    addTodo (todoPane) {
      this.stickers.push({
        id: this.stickers.length,
        type: 'todo',
        content: todoPane.todoList,
        width: 220,
        height: 220
      })
    },
    /**
     * 添加画板便签
     * @param {Object} drawPane 画板数据对象
     */
    addDraw (drawPane) {
      this.stickers.push({
        id: this.stickers.length,
        type: 'draw',
        content: drawPane.input,
        width: 220,
        height: 220
      })
    },
    /**
     * 删除便签
     * @param  {Number} index 被删除便签的 index
     */
    delBookmark (index) {
      this.delIndex = index
      this.$confirm('此操作将不可恢复，您确定要删除此便签吗？')
        .then(this.onClose)
    },
    /**
     * 删除确认对话框关闭
     * @param  {String} action 用户所点击的操作
     */
    onClose (action) {
      if (action === 'ok') {
        this.stickers.splice(this.delIndex, 1)
        this.$message.success('删除成功！')
      }
      this.delIndex = null
    }
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
  &:hover
    .btn-del
      display: inline-flex
  .btn-del
    position: absolute
    right: 2px
    top: 2px
    cursor: pointer
    display: none
  &[type=todo]
    display: block
    padding: 20px
  &[type=text]
    display: block
    padding: 20px
  &[type=draw]
    display: block
</style>
