<template lang="html">
  <div id="entry-fr">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './NavBar';
import SideBar from './SideBar';

export default {
  components: {
    SideBar, NavBar
  }
}
</script>

<style lang="scss">

</style>
