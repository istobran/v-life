<template lang="html">
  <v-app>
    <nav-bar />
    <side-bar />
    <v-content class="main-content" :class="{ 'shrink': showMenu }">
      <router-view />
    </v-content>
    <create-menu-dialog />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import CreateMenuDialog from './dialogs/CreateMenuDialog.vue';

export default {
  components: {
    SideBar, NavBar, CreateMenuDialog,
  },
  computed: {
    ...mapGetters(['showMenu']),
  },
};
</script>

<style lang="scss">
@import "~Styles/toast.scss";
.main-content {
  position: absolute;
  left: 0;
  top: 56px;
  right: 0;
  bottom: 0;
  z-index: 0;
  will-change: left;
  transition: left .15s ease-in-out;
  &.shrink {
    left: 218px;
  }
  .v-content__wrap > main {
    width: 100%;
    height: 100%;
  }
}
</style>
