<template lang="html">
  <VToolbar
    class="nav-bar primary"
    dark
  >
    <VToolbarSideIcon @click="toggleMenu" />
    <VToolbarTitle>{{ title }}</VToolbarTitle>
    <MonthSelector v-if="$route.name === 'calendar'" />
    <TaskInfo v-if="$route.name === 'taskList'" />
    <VSpacer />
    <RouterLink
      is="v-btn"
      to="/todo/tasklist"
      flat
      icon
    >
      <VIcon>list</VIcon>
    </RouterLink>
    <RouterLink
      is="v-btn"
      to="/todo/calendar"
      flat
      icon
    >
      <VIcon>today</VIcon>
    </RouterLink>
    <VToolbarItems class="hidden-sm-and-down">
      <VMenu
        class="user-container prevent-select"
        offset-y
      >
        <VBtn
          slot="activator"
          flat
        >
          <span class="user-name">
            {{ user.username }}
          </span>
          <span class="user-avatar">
            <img
              :src="user.avatarUrl"
              alt=""
            >
          </span>
        </VBtn>
        <VList>
          <VListTile @click="setting">
            <VIcon class="mr-2">
              settings
            </VIcon> 设置
          </VListTile>
          <VListTile @click="support">
            <VIcon class="mr-2">
              help
            </VIcon> 帮助
          </VListTile>
          <VDivider />
          <VListTile @click="logout">
            退出登录
          </VListTile>
        </VList>
      </VMenu>
    </VToolbarItems>
  </VToolbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MonthSelector from './calendar/MonthSelector.vue'
import TaskInfo from './tasklist/TaskInfo.vue'

export default {
  components: { MonthSelector, TaskInfo },
  data () {
    return {
      title: 'V-LIFE',
      user: {
        avatarUrl: 'http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48',
        username: 'BangZ'
      }
    }
  },
  computed: {
    ...mapGetters(['showMenu'])
  },
  methods: {
    ...mapMutations(['toggleMenu']),
    logout () {
      delete sessionStorage.isLogin
      delete localStorage.isLogin
      this.$router.push({ path: '/login' })
    },
    setting () {
      this.$router.push({ path: '/app/settings' })
    },
    support () {
      this.$router.push({ path: '/app/support' })
    }
  }
}
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
