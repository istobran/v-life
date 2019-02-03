<template lang="html">
  <v-toolbar class="nav-bar">
    <v-toolbar-side-icon @click="toggleMenu"></v-toolbar-side-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <div class="date-selector prevent-select">
      <v-icon class="prev" @click="prevMonth">keyboard_arrow_left</v-icon>
      <v-icon class="next" @click="nextMonth">keyboard_arrow_right</v-icon>
      <span class="mid-dot">&bull;</span>
      <span class="ml-2">{{ currYear }} 年</span>
      <span class="ml-1">{{ currMonth }} 月</span>
    </div>
    <div class="search-bar-area">
      <div :class="{ 'search-bar': true, 'focus': searchFocus }">
        <v-icon class="icon vt-top">search</v-icon>
        <input type="text" v-model="search" @change="searchChanged"
          @focus="focusStyle" @blur="blurStyle">
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu class="user-container prevent-select" offset-y>
        <v-btn slot="activator" flat>
          <span class="user-name">{{ user.username }}</span>
          <span class="user-avatar"><img :src="user.avatarUrl" alt=""></span>
        </v-btn>
        <v-list>
          <v-list-tile @click="setting">
            <v-icon class="mr-2">settings</v-icon> 设置
          </v-list-tile>
          <v-list-tile @click="support">
            <v-icon class="mr-2">help</v-icon> 帮助
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="logout">退出登录</v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
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
    setting() {
      this.$router.push({ path: '/app/settings' });
    },
    support() {
      this.$router.push({ path: '/app/support' });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100%;
  z-index: 99;
  .user-container {
    .v-btn {
      margin: 8px 10px;
      padding: 0 10px;
      text-transform: none;
      .user-name {
        margin-right: 10px;
        font-size: 14px;
        cursor: default;
      }
      .user-avatar img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .date-selector {
    position: absolute;
    left: 218px;
    font-size: 16px;
    cursor: default;
    .prev, .next {
      cursor: pointer;
      vertical-align: top;
    }
  }
  .search-bar-area {
    position: absolute;
    left: 450px;
    width: 600px;
    height: 56px;
    padding: 10px 0;
    .search-bar {
      position: relative;
      border-radius: 4px;
      line-height: 36px;
      background-color: rgba(0, 0, 0, .1);
      padding-left: 36px;
      .icon {
        position: absolute;
        top: 6px;
        left: 6px;
        opacity: .6;
        transition: opacity .15s ease-out;
      }
      input {
        background-color: transparent;
        font-size: 16px;
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
</style>
