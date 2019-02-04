<template lang="html">
  <div id="slideshow">
    <div v-if="firstScene.enable"
         :class="{ 'slide-image': true,
                   'slide-fade-init': true,
                   'slide-fade-show': firstScene.showStyle }"
         :style="{ transition: trSetting }"
    >
      <div ref="firstScene"
           :class="{ 'slide-image-inner': true }"
           :style="{ backgroundImage: `url(${firstScene.imgUrl})`,
                     animationDuration: animSetting }"
      />
    </div>
    <div v-if="secondScene.enable"
         :class="{ 'slide-image': true,
                   'slide-fade-init': true,
                   'slide-fade-show': secondScene.showStyle }"
         :style="{ transition: trSetting }"
    >
      <div ref="secondScene"
           :class="{ 'slide-image-inner': true }"
           :style="{ backgroundImage: `url(${secondScene.imgUrl})`,
                     animationDuration: animSetting }"
      />
    </div>
    <div class="slide-overlay"
         :style="{ backgroundImage: `url(${overlayUrl})` }"
    />
    <div :class="{ 'slide-timer': true, 'slide-timer-running': timer.enable }">
      <div class="slide-timer-progress" :style="{ transitionDuration: timer.duration }" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstScene: {
        enable: false,
        imgUrl: '',
        showStyle: false,
        kenburnChoice: '',
      },
      secondScene: {
        enable: false,
        imgUrl: '',
        showStyle: false,
        kenburnChoice: '',
      },
      timer: {
        enable: false,
        duration: '0ms',
      },
      trSetting: 'all 8000ms',
      animSetting: '8000ms',
      bgIndex: 0,
      bgNums: 11,
      choice: '',
      bgUrls: {
        png: this.requireAll(require.context('Images/', true, /^\.\/bg\d{2}\.png$/)),
      },
      overlayUrl: import('Images/grid.png'),
      loadedImages: [],
      kenburnMap: [
        'kenburns',
        'kenburnsDownLeft',
        'kenburnsDownRight',
        'kenburnsDown',
        'kenburnsLeft',
        'kenburnsRight',
        'kenburnsUpLeft',
        'kenburnsUpRight',
        'kenburnsUp',
      ],
    };
  },
  mounted() {
    this.choice = 'png';
    const self = this;
    // 创建自定义事件
    const event = new Event('onBgImagesLoaded');
    this.preloadImg(this.bgUrls[this.choice], null, imgs => {
      self.loadedImages = imgs;
      window.dispatchEvent(event);
    });
    self.firstScene.enable = true;
    window.addEventListener('onBgImagesLoaded', () => {
      console.log('background images all loaded');
      self.firstScene.imgUrl = self.loadedImages[self.bgIndex].src;
      self.firstScene.kenburnChoice = self.rdKenburn();
      self.$refs.firstScene.classList
        && self.$refs.firstScene.classList.add(self.firstScene.kenburnChoice);
      self.firstScene.showStyle = true;
      self.timer.duration = '8100ms';
      self.timer.enable = true;
      self.startTimer(8000);
    });
  },
  methods: {
    // 格式化为两位整数
    zerofill(num, bit) {
      return (new Array(bit).join('0') + num).slice(-bit);
    },
    // 随机产生一个 kenburn 样式 class
    rdKenburn() {
      return `slide-anim-${this.kenburnMap[Math.floor(Math.random() * 9)]}`;
    },
    // 批量 require 背景图片
    requireAll(requireContext) {
      return requireContext.keys().map(requireContext);
    },
    startTimer(timeout) {
      // 黑屏是因为图片未preload的问题
      const self = this;
      setTimeout(() => {
        if (!self.secondScene.enable) {
          self.secondScene.enable = true;
        } else {
          self.trSetting = 'all 0ms';
          self.secondScene.showStyle = false;
          self.firstScene.imgUrl = self.secondScene.imgUrl;
          // 在 secondScene 开启了 kenburn 特效之后，关闭 firstScene 的 kenburn 特效
          if (self.firstScene.kenburnChoice.length > 0) {
            self.$refs.firstScene.classList
              && self.$refs.firstScene.classList.remove(self.firstScene.kenburnChoice);
            self.firstScene.kenburnChoice = '';
          }
        }
        self.timer.duration = '0ms';
        self.timer.enable = false;
        self.bgIndex = ++self.bgIndex % self.bgNums;
        self.secondScene.imgUrl = self.loadedImages[self.bgIndex].src;
        // 移除旧的 kenburn 特效
        if (self.secondScene.kenburnChoice.length > 0) {
          self.$refs.secondScene.classList
            && self.$refs.secondScene.classList.remove(self.secondScene.kenburnChoice);
          self.secondScene.kenburnChoice = '';
        }
        setTimeout(() => { // 使用Timeout来防止只有一次重绘的问题
          self.secondScene.kenburnChoice = self.rdKenburn();
          self.$refs.secondScene.classList
            && self.$refs.secondScene.classList.add(self.secondScene.kenburnChoice);
          self.trSetting = 'all 8000ms';
          self.timer.duration = '8100ms';
          self.timer.enable = true;
          self.secondScene.showStyle = true;
        }, 100);
        self.startTimer(8000);
      }, timeout);
    },
    // 预加载所有图片（递归写法）
    preloadImg(list, imgs = [], cb) {
      // 用于存储预加载好的图片资源
      const fn = this.preloadImg;
      if (list.length === 0) {
        cb.call(this, imgs);
      }
      const img = new Image();
      img.src = list[0];
      if (img.complete) {
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
    },
  },
};
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
@mixin hardAccel {
  // 开启 CSS3 硬件加速
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);

  // 修复 Chrome 和 Safari 中的闪烁
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
#slideshow {
  @include expand-full;
  @include hardAccel;
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
  &-overlay {
    @include expand-full;
    opacity: .2;
    background: {
      position: center center;
      repeat: repeat;
    }
  }
  &-timer {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    &-progress {
      height: 100%;
      width: 0;
      background-color: white;
      transition: width ease-out;
    }
    &-running {
      .slide-timer-progress { width: 100% }
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
