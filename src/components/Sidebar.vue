<template lang="html">
  <div id="sidebar">
    <div id="userinfo">
      <span class="image avatar48"><img :src="user.avatarUrl" alt="" /></span>
      <h1 id="username">{{ user.username }}</h1>
      <p id="description" v-if="user.hasDesc">{{ user.description }}</p>
    </div>
  </div>
  <nav id="nav">
    <ul>
      <li v-for="item in navList">
        <a :href="item.linkUrl"><span :class="item.classText">{{ item.text }}</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatarUrl: "avatar.jpg",
        username: "BangZ",
        hasDesc: true,
        description: "Front-End Engineer"
      },
      navList: [
        {
          linkUrl: "#calendar",
          classText: "icon fa-home",
          text: "我的日历"
        }
      ]
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="css">
</style>
