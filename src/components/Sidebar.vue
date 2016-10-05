<template lang="html">
  <div id="sidebar">
    <div id="userinfo">
      <span class="image avatar48"><img :src="user.avatarUrl" alt="" /></span>
      <h1 id="username">{{ user.username }}</h1>
      <p id="description" v-if="user.hasDesc">{{ user.description }}</p>
    </div>
    <nav id="nav">
      <ul>
        <li v-for="item in navList">
          <a :href="item.linkUrl"><span :class="item.classText">{{ item.text }}</span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatarUrl: "http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48",
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

<style lang="scss" scoped>
  #sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #222629;
    box-shadow: inset -0.25em 0 0.25em 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    text-align: right;
    overflow-y: auto;
  	@media screen and (min-width: 961px) and (max-width: 1880px) {
  	  width: 375px;
  	}

  	@media screen and (min-width: 961px) and (max-width: 1620px) {
  	}

  	@media screen and (min-width: 961px) and (max-width: 1320px) {
  	}

  	@media screen and (max-width: 960px) {
  	}

  	@media screen and (max-width: 736px) {
  	}
  }
</style>
