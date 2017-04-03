<template lang="html">
  <div id="entry-fr">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-view></router-view>
    <create-menu-dialog></create-menu-dialog>
    <toast position="se"></toast>
  </div>
</template>

<script>
import NavBar from './NavBar';
import SideBar from './SideBar';
import { mapActions } from 'vuex';
import { ADD_TOAST_MESSAGE, Toast } from 'vuex-toast';
import CreateMenuDialog from './dialogs/CreateMenuDialog';

export default {
  components: {
    SideBar, NavBar, Toast, CreateMenuDialog
  },
  created() {   // 初始化 Toast
    G.successGo = text => this.addToast({ text, type: 'success' })
    G.warningGo = text => this.addToast({ text, type: 'warning' })
    G.infoGo = text => this.addToast({ text, type: 'info' })
    G.errorGo = text => this.addToast({ text, type: 'error' })
  },
  methods: {
    ...mapActions({ addToast: ADD_TOAST_MESSAGE }),
  }
}
</script>

<style lang="scss">
@import "~scss/toast.scss";
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
