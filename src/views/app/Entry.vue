<template lang="html">
  <v-app>
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-view></router-view>
    <create-menu-dialog></create-menu-dialog>
  </v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import CreateMenuDialog from './dialogs/CreateMenuDialog.vue';

export default {
  components: {
    SideBar, NavBar, CreateMenuDialog,
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
}
</style>
