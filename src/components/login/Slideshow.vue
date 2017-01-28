<template lang="html">
  <div id="slideshow">
    <div v-if="firstScene.enable" :class="{ 'slide-image': true, 'slide-fade-init': true, 'slide-fade-show': firstScene.showStyle }" :style="{ transition: trSetting }">
      <div :class="{ 'slide-image-inner': true }" :style="{ backgroundImage: 'url(' + firstScene.imgUrl + ')', animationDuration: animSetting }"></div>
    </div>
    <div v-if="secondScene.enable" :class="{ 'slide-image': true, 'slide-fade-init': true, 'slide-fade-show': secondScene.showStyle }" :style="{ transition: trSetting }">
      <div :class="{ 'slide-image-inner': true }" :style="{ backgroundImage: 'url(' + secondScene.imgUrl + ')', animationDuration: animSetting }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstScene: {
        enable: false,
        imgUrl: "",
        showStyle: false
      },
      secondScene: {
        enable: false,
        imgUrl: "",
        showStyle: false
      },
      trSetting: "all 8000ms",
      animSetting: "10000ms",
      bgIndex: 0,
      bgNums: 11,
      choice: "",
      bgUrls: {
        png: this.requireAll(require.context("assets/images/", true, /^\.\/bg\d+\.png$/)),
        webp: this.requireAll(require.context("assets/optimized/", true, /^\.\/bg\d+\.webp$/))
      },
      loadedImages: []
    }
  },
  methods: {
    // 格式化为两位整数
    zerofill(num, bit) {
      return (new Array(bit).join('0') + num).slice(-bit);
    },
    // 批量 require 背景图片
    requireAll(requireContext) {
      return requireContext.keys().map(requireContext);
    },
    startTimer(timeout) {
      // 黑屏是因为图片未preload的问题
      var self = this;
      setTimeout(() => {
        if (!self.secondScene.enable) {
          self.secondScene.enable = true;
        } else {
          console.log("falsed")
          self.trSetting = "all 0ms";
          self.secondScene.showStyle = false;
          self.firstScene.imgUrl = self.secondScene.imgUrl;
        }
        self.bgIndex = ++self.bgIndex % self.bgNums;
        self.secondScene.imgUrl = self.loadedImages[self.bgIndex].src;
        setTimeout(() => {  // 使用Timeout来防止只有一次重绘的问题
          self.trSetting = "all 8000ms";
          self.secondScene.showStyle = true;
        }, 40);
        self.startTimer(8000);
      }, timeout);
    },
    // 判断是否支持webp
    isWebpAvailable() {
      var elem = document.createElement('canvas');
      if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } else {
        return false;
      }
    },
    // 预加载所有图片（递归写法）
    preloadImg(list, imgs, cb) {
      var imgs = imgs || [],    //用于存储预加载好的图片资源
        fn = this.preloadImg;
      if(list.length == 0) {
        cb.call(this, imgs);
      }
      var img = new Image();
      img.src = list[0];
      if(img.complete) {
        imgs.push(img);
        list.shift();
        fn(list, imgs, cb);
      } else {
        img.onload = function() {
          imgs.push(img);
          list.shift();
          fn(list, imgs, cb);
        };
      }
    }
  },
  mounted() {
    this.choice = this.isWebpAvailable() ? "webp" : "png";
    var self = this;
    // 创建自定义事件
    var event = new Event("onBgImagesLoaded");
    this.preloadImg(this.bgUrls[this.choice], null, (imgs) => {
      self.loadedImages = imgs;
      window.dispatchEvent(event);
    });
    self.firstScene.enable = true;
    window.addEventListener("onBgImagesLoaded", () => {
      console.log("background images all loaded");
      self.firstScene.imgUrl = self.loadedImages[self.bgIndex].src;
      self.firstScene.showStyle = true;
      self.startTimer(8000);
    });
  }
}
</script>

<style lang="scss">
@mixin expand-full {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
@mixin keyframes($animationName) {
  @keyframes #{$animationName} {
    @content;
  }
}
#slideshow {
  @include expand-full;
  background-color: black;
}
.slide {
  &-image {
    @include expand-full;
    &-inner {
      @include expand-full;
      background: {
        size: cover;
        position: center center;
        repeat: no-repeat;
      }
    }
  }
  &-fade {
    &-init, &-hide {
      opacity: 0;
    }
    &-show {
      opacity: 1;
    }
  }
  &-anim {
    &-kenburns {
      animation: kenburns ease-out;
      @include keyframes(kenburns) {
        0% {
            transform: scale(1.5)
        }
        100% {
            transform: scale(1)
        }
      }
    }
    &-kenburnsDownLeft {
      animation: kenburnsDownLeft ease-out;
      @include keyframes(kenburnsDownLeft) {
        0% {
            transform: scale(1.5) translate(10%,-10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsDownRight {
      animation: kenburnsDownRight ease-out;
      @include keyframes(kenburnsDownRight) {
        0% {
            transform: scale(1.5) translate(-10%,-10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsDown {
      animation: kenburnsDown ease-out;
      @include keyframes(kenburnsDown) {
        0% {
            transform: scale(1.5) translate(0,-10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsLeft {
      animation: kenburnsLeft ease-out;
      @include keyframes(kenburnsLeft) {
        0% {
            transform: scale(1.5) translate(10%, 0)
        }
        100% {
            transform: scale(1) translate(0, 0)
        }
      }
    }
    &-kenburnsRight {
      animation: kenburnsRight ease-out;
      @include keyframes(kenburnsRight) {
        0% {
            transform: scale(1.5) translate(-10%,0)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsUpLeft {
      animation: kenburnsUpLeft ease-out;
      @include keyframes(kenburnsUpLeft) {
        0% {
            transform: scale(1.5) translate(10%,10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsUpRight {
      animation: kenburnsUpRight ease-out;
      @include keyframes(kenburnsUpRight) {
        0% {
            transform: scale(1.5) translate(-10%,10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
    &-kenburnsUp {
      animation: kenburnsUp ease-out;
      @include keyframes(kenburnsUp) {
        0% {
            transform: scale(1.5) translate(0,10%)
        }
        100% {
            transform: scale(1) translate(0,0)
        }
      }
    }
  }
}
</style>
