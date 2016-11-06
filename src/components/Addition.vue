<template lang="html">
  <div id="addition" @click="toggleMenu">
    <div id="circle">
      <i class="fa fa-plus" :class="{ 'opened': menuOpened }"></i>
    </div>
    <ul v-show="menuOpened">
      <li>切换模式</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragging: false,
      menuOpened: false
    }
  },
  mounted() {
    document.getElementById("circle").addEventListener("mousedown", (e) => {
      var elem = this.$el;
      // 获取屏幕宽度
      var scnWidth = document.body.clientWidth || document.documentElement.clientWidth,
          scnHeight = document.body.clientHeight || document.documentElement.clientHeight;
      // 计算元素右下角点相对于浏览器窗口右下角的坐标
      var rect = elem.getBoundingClientRect();
      var elem_coord = {
        x: scnWidth - elem.offsetLeft - rect.width,
        y: scnHeight - elem.offsetTop - rect.height
      }
      // 计算鼠标位置相对于浏览器窗口右下角坐标
      var mouse_coord = {
        x: scnWidth - e.clientX,
        y: scnHeight - e.clientY
      }
      // 计算鼠标坐标与元素右下角坐标的差值
      var deltaX = mouse_coord.x - elem_coord.x,
          deltaY = mouse_coord.y - elem_coord.y;
      // 事件函数
      var fn = (e) => {
        this.dragging = true;
        var right_coord = (scnWidth - e.clientX) - deltaX,
            bottom_coord = (scnHeight - e.clientY) - deltaY;
        // 防出界判定
        right_coord = right_coord >= 0 ? right_coord : 0;
        right_coord = right_coord > (scnWidth - rect.width) ? scnWidth - rect.width : right_coord;
        bottom_coord = bottom_coord >= 0 ? bottom_coord : 0;
        bottom_coord = bottom_coord > (scnHeight - rect.height) ? scnHeight - rect.height : bottom_coord;
        elem.style.right = right_coord + "px";
        elem.style.bottom = bottom_coord + "px";
      };
      document.addEventListener("mousemove", fn, false);    // 不能绑定在elem上, 必须绑定在document上，否则会出现鼠标拖拽过快时跟丢鼠标
      document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", fn, false);
      }, false);
    }, false);
    window.addEventListener("resize", (e) => {
      this.$el.style.bottom = "32px";
      this.$el.style.right = "32px";
    }, false)
  },
  methods: {
    toggleMenu() {
      if (this.dragging) {
        this.dragging = false;
        return;
      }
      if (this.menuOpened) {
        this.menuOpened = false;
        console.log("menu closed");
      } else {
        this.menuOpened = true;
        console.log("menu opened");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#addition {
  position: fixed;
  bottom: 32px;
  right: 32px;
  #circle {
    position: relative;
    width: 56px;
    height: 56px;
    z-index: 200;
    background: #db4437;
    border-radius: 50%;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 56px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    i {
      transition: transform .3s ease;
      transform: rotate(0deg);
      &.opened {
        transform: rotate(585deg);
      }
    }
  }
  ul {
    background: #EEEEEE;
    color: rgba(0, 0, 0, 0.87);
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
}
</style>
