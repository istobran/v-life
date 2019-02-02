<template lang="html">
  <header class="nav-bar">
    <div class="title-container prevent-select">
      <span :class="{'btn-toggle-mnu': true, 'active': showMenu }" @click="toggleMenu"><md-icon>menu</md-icon></span>
      <span class="title">{{ title }}</span>
    </div>
    <div class="date-selector prevent-select">
      <span class="prev" @click="prevMonth"><md-icon>keyboard_arrow_left</md-icon></span>
      <span class="next" @click="nextMonth"><md-icon>keyboard_arrow_right</md-icon></span>
      <span class="mid-dot">&bull;</span>
      <span class="year">{{ currYear }} 年</span>
      <span class="month">{{ currMonth }} 月</span>
    </div>
    <div class="search-bar-area">
      <div :class="{ 'search-bar': true, 'focus': searchFocus }">
        <span class="icon"><md-icon>search</md-icon></span>
        <input type="text" v-model="search" @change="searchChanged" @focus="focusStyle" @blur="blurStyle">
      </div>
    </div>
    <md-menu md-align-trigger class="user-container prevent-select pull-right">
      <md-button md-menu-trigger>
        <span class="user-name">{{ user.username }}</span>
        <span class="user-avatar"><img :src="user.avatarUrl" alt=""></span>
      </md-button>
      <md-menu-content>
        <md-menu-item @click.native="logout">退出登录</md-menu-item>
      </md-menu-content>
    </md-menu>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      title: 'V-LIFE',
      search: '', // 搜索栏
      searchFocus: false, // 焦点是否在搜索栏上
      user: {
        avatarUrl: 'http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48',
        username: 'BangZ',
      },
    };
  },
  computed: {
    ...mapGetters(['showMenu', 'today', 'currYear', 'currMonth']),
  },
  created() {
    this.setupCurr();
  },
  methods: {
    ...mapMutations(['toggleMenu', 'setupCurr', 'nextMonth', 'prevMonth']),
    searchChanged() { // 搜索栏变更
      console.log(this.search);
    },
    focusStyle() {
      this.searchFocus = true;
    },
    blurStyle() {
      this.searchFocus = false;
    },
    logout() {
      delete sessionStorage.isLogin;
      delete localStorage.isLogin;
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style lang="scss" scoped>
$navbar-height: 56px;
.nav-bar {
  position: fixed;
  width: 100%;
  height: $navbar-height;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26), 0 2px 10px 0 rgba(0, 0, 0, .16);
  color: #FFFFFF;
  background-color: #0091EA;
  z-index: 99;
  .title-container {
    position: absolute;
    display: flex;
    height: $navbar-height;
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
    line-height: $navbar-height;
    height: $navbar-height;
    .md-button {
      margin: 8px 10px;
      padding: 0 10px;
      text-transform: none;
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
  }
  .date-selector {
    position: absolute;
    left: 218px;
    height: $navbar-height;
    line-height: $navbar-height;
    font-size: 16px;
    cursor: default;
    .prev, .next {
      cursor: pointer;
    }
    .year {
      margin-left: 5px;
    }
  }
  .search-bar-area {
    position: absolute;
    left: 450px;
    width: 600px;
    height: 56px;
    padding: 10px 0;
    .search-bar {
      border-radius: 4px;
      line-height: 36px;
      background-color: rgba(0, 0, 0, .1);
      .icon {
        margin-left: 10px;
        opacity: .6;
        transition: opacity .15s ease-out;
      }
      input {
        background-color: transparent;
        color: #FFFFFF;
        font-size: 14px;
        display: inline-block;
        width: 550px;
        border: none;
        outline: none;
      }
      &.focus {
        .icon {
          opacity: 1;
        }
      }
    }
  }
}
.md-menu-content {
  z-index: 100;
}
</style>
