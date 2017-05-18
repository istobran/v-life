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
import Alarm from 'assets/images/alarm.jpg';

export default {
  components: {
    SideBar, NavBar, Toast, CreateMenuDialog
  },
  created() {   // 初始化 Toast
    G.successGo = text => this.addToast({ text, type: 'success' })
    G.warningGo = text => this.addToast({ text, type: 'warning' })
    G.infoGo = text => this.addToast({ text, type: 'info' })
    G.errorGo = text => this.addToast({ text, type: 'error' })
    G.notify = (title, text) => {
      var options = {
        body: text,
        icon: Alarm
      }

      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(title, options);
        setTimeout(notification.close.bind(notification), 5000);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(title, options);
            setTimeout(notification.close.bind(notification), 5000);
          }
        });
      }
    }
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
