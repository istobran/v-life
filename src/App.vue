<template>
  <div id="app">
    <sidebar></sidebar>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import Sidebar from './components/Sidebar'

export default {
  components: {
    Calendar,
    Sidebar
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
