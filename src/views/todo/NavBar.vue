<template lang="html">
  <v-toolbar class="nav-bar primary" dark>
    <v-toolbar-side-icon @click="toggleMenu" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <month-selector v-if="$route.name === 'calendar'" />
    <task-info v-if="$route.name === 'tasklist'" />
    <v-spacer />
    <router-link is="v-btn"
                 to="/todo/tasklist"
                 flat
                 icon
    >
      <v-icon>list</v-icon>
    </router-link>
    <router-link is="v-btn"
                 to="/todo/calendar"
                 flat
                 icon
    >
      <v-icon>today</v-icon>
    </router-link>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu class="user-container prevent-select" offset-y>
        <v-btn slot="activator" flat>
          <span class="user-name">
            {{ user.username }}
          </span>
          <span class="user-avatar">
            <img :src="user.avatarUrl" alt="">
          </span>
        </v-btn>
        <v-list>
          <v-list-tile @click="setting">
            <v-icon class="mr-2">
              settings
            </v-icon> 设置
          </v-list-tile>
          <v-list-tile @click="support">
            <v-icon class="mr-2">
              help
            </v-icon> 帮助
          </v-list-tile>
          <v-divider />
          <v-list-tile @click="logout">
            退出登录
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MonthSelector from './calendar/MonthSelector.vue';
import TaskInfo from './tasklist/TaskInfo.vue';

export default {
  components: { MonthSelector, TaskInfo },
  data() {
    return {
      title: 'V-LIFE',
      user: {
        avatarUrl: 'http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48',
        username: 'BangZ',
      },
    };
  },
  computed: {
    ...mapGetters(['showMenu']),
  },
  methods: {
    ...mapMutations(['toggleMenu']),
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
}
</style>
