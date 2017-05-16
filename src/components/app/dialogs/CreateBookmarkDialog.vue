<template lang="html">
  <md-dialog ref="createBookmarkDialog" class="ab-dialog prevent-select" @close="close">
    <md-dialog-title class="ab-title">
      <span class="v-mid">新建便签</span>
      <md-button-toggle md-single class="v-mid">
        <md-button class="md-icon-button md-toggle" @click.native="toggleTab(type.TEXT)">
          <md-icon>title</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click.native="toggleTab(type.TODO)">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click.native="toggleTab(type.DRAW)">
          <md-icon>create</md-icon>
        </md-button>
      </md-button-toggle>
    </md-dialog-title>
    <md-dialog-content v-show="currentType === type.TEXT" type="text">
      <textarea name="name" rows="20" cols="60" placeholder="请在这里输入便签内容" v-model="textPane.input"></textarea>
    </md-dialog-content>
    <md-dialog-content v-show="currentType === type.TODO" type="todo">
      <ul>
        <li v-for="(todo, index) in todoPane.todoList" class="clearfix">
          <md-checkbox class="md-primary" v-model="todo.checked">{{ todo.desc }}</md-checkbox>
          <md-button class="md-icon-button pull-right" @click.native="delTodo(index)"><md-icon>cancel</md-icon></md-button>
        </li>
      </ul>
      <md-input-container @keyup.enter.native="addTodo">
        <md-icon>add</md-icon>
        <label>输入要完成的任务</label>
        <md-input v-model="todoPane.input"></md-input>
      </md-input-container>
    </md-dialog-content>
    <md-dialog-content v-show="currentType === type.DRAW" type="draw">
      <canvas ref="board" width="500" height="410" :state="drawPane.state"></canvas>
    </md-dialog-content>
    <md-dialog-actions>
      <div class="draw-tool-bar" v-show="currentType === type.DRAW">
        <md-button class="draw-tool" @click.native="toggleTool(tool.PEN)">
          <img src="~assets/images/pen.svg" class="svg md-icon md-theme-default">
        </md-button>
        <md-button class="draw-tool" @click.native="toggleTool(tool.ERASER)">
          <img src="~assets/images/eraser.svg" class="svg md-icon md-theme-default">
        </md-button>
        <md-button class="draw-tool">
          <img src="~assets/images/palette.svg" class="svg md-icon md-theme-default">
        </md-button>
      </div>
      <md-button class="md-primary" @click.native="closeDialog">取消</md-button>
      <md-button class="md-primary" @click.native="createMenu">新建</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
const type = {
  TEXT: Symbol(),
  TODO: Symbol(),
  DRAW: Symbol()
};
const tool = {
  PEN: "pen",
  ERASER: "eraser"
};
export default {
  data() {
    return {
      type,
      tool,
      currentType: type.TEXT,
      textPane: {
        input: ""
      },
      todoPane: {
        todoList: [
          { checked: false, desc: "任务事项 1" },
          { checked: false, desc: "任务事项 2" },
          { checked: true, desc: "任务事项 3" },
          { checked: false, desc: "任务事项 4" },
          { checked: false, desc: "任务事项 5" }
        ],
        input: ""
      },
      drawPane: {
        state: tool.PEN,
        input: ""
      }
    }
  },
  computed: {
    ...mapGetters({ show: 'showBookmarkDialog' })
  },
  watch: {
    show() {
      if (this.show) {
        this.$refs["createBookmarkDialog"].open();
      }
    }
  },
  mounted() {
    this.initDrawing();
  },
  methods: {
    /**
     * 初始化 canvas 绘图
     */
    initDrawing() {
      const drawboard = this.$refs["board"];
      const pen = drawboard.getContext("2d");
      // 监听绘制线条
      drawboard.onmousedown = function(e) {
        // 初始化 pen
        pen.strokeStyle = "#000";
        pen.lineWidth = "8";
        pen.lineCap = "round";
        pen.lineJoin = "round";
        pen.beginPath();
        pen.moveTo(e.offsetX, e.offsetY);
        // 获取整个 canvas 的宽高
        const computedBoard = getComputedStyle(drawboard);
        var width = parseInt(computedBoard.getPropertyValue("width"));
        var height = parseInt(computedBoard.getPropertyValue("height"));
        // 获取 canvas 在屏幕上的 X 和 Y 坐标
        const rect = drawboard.getBoundingClientRect();
        var offsetLeft = rect.left;
        var offsetTop = rect.top;
        // 监听鼠标移动
        const handleMouseMove = function(e) {
          // 计算鼠标相对 canvas 的位置
          var mouseOffsetX = e.clientX - offsetLeft;
          var mouseOffsetY = e.clientY - offsetTop;
          var cond = mouseOffsetX < 0 || mouseOffsetX > width || mouseOffsetY < 0 || mouseOffsetY > height;
          if (cond) {
            window.removeEventListener("mousemove", handleMouseMove, false);
            window.removeEventListener("mouseup", handleMouseUp, false);
            return;
          }
          pen.lineTo(e.offsetX, e.offsetY);
          pen.stroke();
          const handleMouseUp = function(e) {
            // 取消移动事件的监听
            window.removeEventListener("mousemove", handleMouseMove, false);
            window.removeEventListener("mouseup", handleMouseUp, false);
            return;
          }
          window.addEventListener("mouseup", handleMouseUp, false);
        }
        window.addEventListener("mousemove", handleMouseMove, false);
      }
    },
    /**
     * 切换便签类型
     * @param  {Symbol} type 目标类型
     */
    toggleTab(type) {
      this.currentType = type;
    },
    /**
     * 切换绘制工具
     * @param  {String} tool 目标工具
     */
    toggleTool(tool) {
      this.drawPane.state = tool;
    },
    /**
     * 添加待完成任务项
     */
    addTodo() {
      let input = this.todoPane.input;
      if (input) {
        this.todoPane.todoList.push({ checked: false, desc: input })
      }
      this.todoPane.input = "";
    },
    /**
     * 删除待完成任务项
     * @param  {Number} index 任务项的index
     */
    delTodo(index) {
      this.todoPane.todoList.splice(index, 1);
    },
    closeDialog() {

    },
    createMenu() {

    },
    close() {

    }
  }
}
</script>

<style lang="sass">
.v-mid
  vertical-align: middle
.ab-dialog
  .ab-title
    padding: 10px 24px
    margin-bottom: 0
    background-color: #1976D2
    color: #FFFFFF
    white-space: nowrap
    .md-button-toggle
      display: inline-flex
      margin: 0 155px 0 55px
      & > .md-button
        margin: 0 6px
        border-radius: 50%
        &:first-child
          border-radius: 50%
        &:last-child
          border-radius: 50%
        &:not([disabled])
          color: rgba(255, 255, 255, .3)
          &:hover:not(.md-toggle):not(.md-raised)
            background-color: hsla(0, 0%, 80%, .2)
        &.md-toggle
          color: #FFFFFF
          background-color: rgba(255, 255, 255, .15)
          &:hover:not([disabled])
            background-color: rgba(255, 255, 255, .15)
  .md-dialog-content
    &[type=text]
      padding: 20px 24px 24px
      textarea
        border: none
        resize: none
        font-size: 14px
        &:focus
          outline: none
    &[type=todo]
      padding: 20px 50px
      ul
        padding: 0 2px
        li
          .md-button
            display: none
            color: rgba(0, 0, 0, .6)
            width: 52px
            height: 52px
          &:hover
            .md-button
              display: inline-block
    &[type=draw]
      padding: 0
      box-shadow: inset 0 -8px 6px -6px rgba(0, 0, 0, .3)
      canvas
        &[state=pen]
          cursor: url("~assets/images/cursor_pen.png") 8 8, auto
        &[state=eraser]
          cursor: url("~assets/images/cursor_eraser.png") 8 8, auto
.draw-tool-bar
  margin-right: auto
  .draw-tool.md-button
    min-width: 36px
    width: 36px
    img
      min-width: 20px
      min-height: 20px
      width: 20px
      height: 20px
</style>
