<template lang="html">
  <v-dialog v-model="show" class="ab-dialog prevent-select" @close="close">
    <v-card>
      <v-card-title class="ab-title headline grey lighten-2" primary-title>
        <span class="v-mid">
          新建便签
        </span>
        <v-btn class="v-icon-button" @click="toggleTab(type.TEXT)">
          <v-icon>title</v-icon>
        </v-btn>
        <v-btn class="v-icon-button" @click="toggleTab(type.TODO)">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-btn class="v-icon-button" @click="toggleTab(type.DRAW)">
          <v-icon>create</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text v-show="currentType === type.TEXT">
      <textarea v-model="textPane.input"
                name="name"
                rows="20"
                cols="60"
                placeholder="请在这里输入便签内容"
      />
    </v-card-text>
    <v-card-text v-show="currentType === type.TODO" type="todo">
      <ul>
        <li v-for="(todo, index) in todoPane.todoList" :key="index" class="clearfix">
          <v-checkbox v-model="todo.checked" :label="todo.desc" />
          <v-btn class="v-icon-button pull-right" @click="delTodo(index)">
            <v-icon>cancel</v-icon>
          </v-btn>
        </li>
      </ul>
      <v-input
        v-model="todoPane.input"
        label="输入要完成的任务"
        prepend-icon="add"
        @keyup.enter.native="addTodo"
      />
    </v-card-text>
    <v-card-text v-show="currentType === type.DRAW" type="draw">
      <canvas ref="board"
              width="500"
              height="410"
              :state="drawPane.state"
              :style="{ 'background-color': drawPane.bgColor }"
      />
    </v-card-text>
    <v-card-actions>
      <div v-show="currentType === type.DRAW" class="draw-tool-bar">
        <v-btn class="draw-tool" @click="toggleTool(tool.PEN)">
          <img src="~Images/pen.svg" class="svg v-icon md-theme-default">
        </v-btn>
        <v-btn class="draw-tool" @click="toggleTool(tool.ERASER)">
          <img src="~Images/eraser.svg" class="svg v-icon md-theme-default">
        </v-btn>
        <v-btn class="draw-tool" @click="showPalette">
          <img src="~Images/palette.svg" class="svg v-icon md-theme-default">
        </v-btn>
        <div v-show="drawPane.showPalette" ref="palette" class="palette">
          <div class="color-row clearfix">
            <div class="color-block pull-left" @click="selectBgColor(0)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[0] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(1)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[1] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(2)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[2] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(3)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[3] }" />
            </div>
          </div>
          <div class="color-row clearfix">
            <div class="color-block pull-left" @click="selectBgColor(4)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[4] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(5)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[5] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(6)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[6] }" />
            </div>
            <div class="color-block pull-left" @click="selectBgColor(7)">
              <i class="color-fill" :style="{ 'background-color': drawPane.availColor[7] }" />
            </div>
          </div>
        </div>
      </div>
      <v-btn @click="show=false">
        取消
      </v-btn>
      <v-btn @click="createBookmark">
        新建
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

const type = {
  TEXT: Symbol('TEXT'),
  TODO: Symbol('TODO'),
  DRAW: Symbol('DRAW'),
};
const tool = {
  PEN: 'pen',
  ERASER: 'eraser',
};
export default {
  data() {
    return {
      type,
      tool,
      currentType: type.TEXT,
      textPane: {
        input: '',
      },
      todoPane: {
        todoList: [
          // { checked: false, desc: "任务事项 1" },
          // { checked: false, desc: "任务事项 2" },
          // { checked: true, desc: "任务事项 3" },
          // { checked: false, desc: "任务事项 4" },
          // { checked: false, desc: "任务事项 5" }
        ],
        input: '',
      },
      drawPane: {
        state: tool.PEN,
        bgColor: '#FFFFFF',
        showPalette: false,
        input: '',
        availColor: [
          'rgb(255, 255, 255)',
          'rgb(255, 138, 128)',
          'rgb(255, 209, 128)',
          'rgb(255, 255, 141)',
          'rgb(207, 216, 220)',
          'rgb(128, 216, 255)',
          'rgb(167, 255, 235)',
          'rgb(204, 255, 144)',
        ],
      },
    };
  },
  computed: {
    ...mapGetters({ show: 'showBookmarkDialog' }),
  },
  watch: {
    'drawPane.showPalette': function(value) {
      const self = this;
      const handleClickOuter = function(e) {
        const rect = self.$refs.palette.$el.getBoundingClientRect();
        if (self.drawPane.showPalette === false) removeEventListener('click', handleClickOuter, false);
        if (e.clientX < rect.left || e.clientX > rect.right
          || e.clientY < rect.top || e.clientY > rect.bottom) {
          self.drawPane.showPalette = false;
          removeEventListener('click', handleClickOuter, false);
        }
      };
      if (value === true) {
        setTimeout(() => {
          addEventListener('click', handleClickOuter, false);
        }, 10);
      } else {
        removeEventListener('click', handleClickOuter, false);
      }
    },
  },
  mounted() {
    this.initDrawing();
  },
  methods: {
    ...mapMutations({ close: 'closeBookmarkDialog' }),
    /**
     * 初始化 canvas 绘图
     */
    initDrawing() {
      const drawboard = this.$refs.board;
      const self = this;
      const penWeight = 8;
      const eraserWeight = penWeight + 4;
      // 监听绘制线条
      drawboard.onmousedown = function(mouseDownEvent) {
        // 初始化 pen
        const pen = drawboard.getContext('2d');
        if (self.drawPane.state === tool.PEN) {
          pen.strokeStyle = '#000';
          pen.lineWidth = penWeight;
          pen.lineCap = 'round';
          pen.lineJoin = 'round';
          pen.beginPath();
          pen.moveTo(mouseDownEvent.offsetX, mouseDownEvent.offsetY);
          pen.lineTo(mouseDownEvent.offsetX, mouseDownEvent.offsetY);
          pen.stroke();
        } else if (self.drawPane.state === tool.ERASER) {
          pen.clearRect(
            mouseDownEvent.offsetX - eraserWeight / 2,
            mouseDownEvent.offsetY - eraserWeight / 2,
            eraserWeight, eraserWeight,
          );
        }
        // 获取整个 canvas 的宽高
        const computedBoard = getComputedStyle(drawboard);
        const width = parseInt(computedBoard.getPropertyValue('width'));
        const height = parseInt(computedBoard.getPropertyValue('height'));
        // 获取 canvas 在屏幕上的 X 和 Y 坐标
        const rect = drawboard.getBoundingClientRect();
        const offsetLeft = rect.left;
        const offsetTop = rect.top;
        // 监听鼠标移动
        const handleMouseMove = function(mouseMoveEvent) {
          // 计算鼠标相对 canvas 的位置
          const mouseOffsetX = mouseMoveEvent.clientX - offsetLeft;
          const mouseOffsetY = mouseMoveEvent.clientY - offsetTop;
          const cond = mouseOffsetX < 0
            || mouseOffsetX > width
            || mouseOffsetY < 0
            || mouseOffsetY > height;
          const handleMouseUp = function() {
            // 取消移动事件的监听
            window.removeEventListener('mousemove', handleMouseMove, false);
            window.removeEventListener('mouseup', handleMouseUp, false);
          };
          if (cond) {
            window.removeEventListener('mousemove', handleMouseMove, false);
            window.removeEventListener('mouseup', handleMouseUp, false);
            return;
          }
          if (self.drawPane.state === tool.PEN) {
            pen.lineTo(mouseMoveEvent.offsetX, mouseMoveEvent.offsetY);
            pen.stroke();
          } else if (self.drawPane.state === tool.ERASER) {
            pen.clearRect(
              mouseMoveEvent.offsetX - eraserWeight / 2,
              mouseMoveEvent.offsetY - eraserWeight / 2,
              eraserWeight, eraserWeight,
            );
          }
          window.addEventListener('mouseup', handleMouseUp, false);
        };
        window.addEventListener('mousemove', handleMouseMove, false);
      };
    },
    /**
     * 切换便签类型
     * @param  {Symbol} t 目标类型
     */
    toggleTab(t) {
      this.currentType = t;
    },
    /**
     * 切换绘制工具
     * @param  {String} t 目标工具
     */
    toggleTool(t) {
      this.drawPane.state = t;
    },
    /**
     * 添加待完成任务项
     */
    addTodo() {
      const { input } = this.todoPane;
      if (input) {
        this.todoPane.todoList.push({ checked: false, desc: input });
      }
      this.todoPane.input = '';
    },
    /**
     * 删除待完成任务项
     * @param  {Number} index 任务项的index
     */
    delTodo(index) {
      this.todoPane.todoList.splice(index, 1);
    },
    /**
     * 初始化调色板
     */
    showPalette() {
      this.drawPane.showPalette = true;
    },
    /**
     * 用户选择了背景颜色
     * @param  {Number} index 被选中背景颜色在颜色数组中的 index
     */
    selectBgColor(index) {
      this.drawPane.bgColor = this.drawPane.availColor[index];
      this.drawPane.showPalette = false;
    },
    /**
     * 确认新建便签
     */
    createBookmark() {
      if (this.currentType === type.TEXT) {
        this.$emit('addText', this.textPane);
      } else if (this.currentType === type.TODO) {
        this.$emit('addTodo', this.todoPane);
      } else {
        this.drawPane.input = this.$refs.board.toDataURL();
        this.$emit('addDraw', this.drawPane);
      }
      this.show = false;
    },
  },
};
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
        z-index: 10
        &[state=pen]
          cursor: url("~Images/cursor_pen.png") 8 8, auto
        &[state=eraser]
          cursor: url("~Images/cursor_eraser.png") 8 8, auto
.draw-tool-bar
  margin-right: auto
  position: relative
  .draw-tool.md-button
    min-width: 36px
    width: 36px
    img
      min-width: 20px
      min-height: 20px
      width: 20px
      height: 20px
  .palette
    position: absolute
    z-index: 11
    top: -80px
    left: 100px
    background-color: #FFFFFF
    .color-row
      width: 160px
      .color-block
        width: 40px
        height: 40px
        cursor: pointer
        text-align: center
        line-height: 40px
        &:hover
          .color-fill
            border-color: rgb(100, 100, 100)
        .color-fill
          margin: 5px auto
          width: 30px
          height: 30px
          border-radius: 50%
          border: 1px solid rgb(200, 200, 200)
          display: block
</style>
