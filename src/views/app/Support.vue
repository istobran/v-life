<template lang="html">
  <main id="support" :class="{ 'main-content': true, 'shrink': showMenu }">
    <h1 class="md-display-2">帮助与支持</h1>
    <p>Hello, 欢迎使用 V-LIFE 生活日志系统</p>
    <p>
      <span>V-LIFE 生活日志系统致力于提供一个大家都能够充分信任的外置的工具来记录各个日程，</span>
      <span>它能够方便的随时查看、调整，而且能在这个工具的支持下及时完成生活中需要完成的任务，</span>
      <span>这样来帮助人们解放大脑中的记忆压力死循环，放心地投入到做事情中去。</span>
    </p>
    <p>您只需要在对应的功能模块中写下您的日程信息，系统将自动为您保存，您可以在任何地方，任何时间，任何地点，随时随心地使用本系统。</p>
    <p>这是一款免费软件，作者 BangZ。您在使用过程中遇到任何问题可以反馈至 <a href="mailto:i@bangz.me">i@bangz.me</a></p>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['showMenu']),
  },
};
</script>

<style lang="sass">
#support
  padding: 30px 50px
  h1
    margin-bottom: 20px
  p
    max-width: 600px
    margin-bottom: 20px
</style>
