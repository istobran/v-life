<template lang="html">
  <div id="entry-fr">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './Sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
#entry-fr {
  margin-left: 375px;
  height: 100%;
  @media screen and (min-width: 961px) and (max-width: 1880px) {
    margin-left: 300px;
  }

  @media screen and (min-width: 961px) and (max-width: 1320px) {
    margin-left: 20%;
  }

  @media screen and (max-width: 960px) {
    margin-left: 275px;
  }
}
</style>
