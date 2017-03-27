<template lang="html">
  <header class="nav-bar">
    <div class="title-container">
      <span :class="{'btn-toggle-mnu': true, 'active': showMenu}" @click="toggleMenu"><md-icon>menu</md-icon></span>
      <span class="title">{{ title }}</span>
    </div>
    <div class="date-selector">
      <span class="prev"><md-icon>keyboard_arrow_left</md-icon></span>
      <span class="next"><md-icon>keyboard_arrow_right</md-icon></span>
      <span class="mid-dot">&bull;</span>
      <span class="year">{{ currYear }} 年</span>
      <span class="month">{{ currMonth }} 月</span>
    </div>
    <div class="user-container pull-right">
      <span class="user-name">{{ user.username }}</span>
      <span class="user-avatar"><img :src="user.avatarUrl" alt=""></span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: true,
      today: new Date(),
      title: "V-LIFE",
      user: {
        avatarUrl: "http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48",
        username: "BangZ"
      },
      currYear: 0,    // 当前正在查看的年份
      currMonth: 0     // 当前正在查看的月份
    }
  },
  created() {
    // 初始化年月
    this.currYear = this.today.getFullYear();
    this.currMonth = this.today.getMonth();
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<style lang="scss" scoped>
$navbar-height: 56px;
@mixin unselectable() {
  user-select: none;
  -webkit-user-drag: none;
}
.nav-bar {
  position: fixed;
  width: 100%;
  height: $navbar-height;
  background: #0091EA;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26), 0 2px 10px 0 rgba(0, 0, 0, .16);
  color: #FFFFFF;
  .title-container {
    position: absolute;
    display: flex;
    height: $navbar-height;
    @include unselectable();
    .btn-toggle-mnu {
      position: relative;
      cursor: pointer;
      padding: 16px 24px;
      box-sizing: content-box;
      opacity: .75;
      &:before {
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        top: -4px;
        left: -4px;
        bottom: -4px;
        right: -4px;
        margin: auto;
        padding: 4px;
        position: absolute;
        content: ' ';
      }
      &:hover {
        opacity: 1;
      }
      &:hover, &:focus {
        outline: none;
      }
      &.active:before {
        background-color: rgba(0,0,0,.12);
      }
    }
    .title {
      color: #FFF;
      margin: auto 0;
      position: relative;
      flex: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 18px;
      cursor: default;
    }
  }
  .user-container {
    position: absolute;
    right: 0;
    height: $navbar-height;
    line-height: $navbar-height;
    padding: 0 30px;
    @include unselectable();
    .user-name {
      margin-right: 10px;
      font-size: 14px;
      cursor: default;
    }
    .user-avatar img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
    }
  }
  .date-selector {
    position: absolute;
    left: 218px;
    height: $navbar-height;
    line-height: $navbar-height;
    font-size: 16px;
    @include unselectable();
    cursor: default;
    .prev, .next {
      cursor: pointer;
    }
    .year {
      margin-left: 5px;
    }
  }
}
</style>
