<template lang="html">
  <div id="addition" @mousedown="dragElem($event)">
    <i class="fa fa-plus"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragging: false
    }
  },
  methods: {
    dragElem(e) {
      var elem = document.getElementById("addition");
      var self = this;
      const deltaX = e.clientX - elem.offsetLeft,
            deltaY = e.clientY - elem.offsetTop;
      var fn = (e) => {
        elem.style.top = (e.clientY - deltaY) + 'px';
        elem.style.left = (e.clientX - deltaX) + 'px';
        elem.style.right = "auto";
        elem.style.bottom = "auto";
      };
      document.addEventListener("mousemove", fn, false);    // 不能绑定在elem上, 必须绑定在document上，否则会出现鼠标拖拽过快时跟丢鼠标
      document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", fn, false);
      }, false);
    }
  }
}
</script>

<style lang="scss" scoped>
#addition {
  width: 56px;
  height: 56px;
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 200;
  background: #db4437;
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 56px;
  font-size: 24px;
  cursor: pointer;
}
</style>
