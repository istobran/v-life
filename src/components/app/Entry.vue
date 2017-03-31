<template lang="html">
  <div id="entry-fr">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-view></router-view>
    <create-menu-dialog></create-menu-dialog>
  </div>
</template>

<script>
import NavBar from './NavBar';
import SideBar from './SideBar';
import CreateMenuDialog from './dialogs/CreateMenuDialog';

export default {
  components: {
    SideBar, NavBar, CreateMenuDialog
  }
}
</script>

<style lang="scss">
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
