<template lang="html">
  <aside id="sidebar">
    <section class="top">
      <div id="userinfo">
        <span class="image avatar48"><img :src="user.avatarUrl" alt="" /></span>
        <h1 id="username">{{ user.username }}</h1>
        <p id="description" v-if="user.hasDesc">{{ user.description }}</p>
      </div>
      <nav id="nav">
        <ul>
          <li v-for="item in navList">
            <router-link :to="item.linkAddr">
              <span :class="item.classText">{{ item.text }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>
    <footer class="bottom">
      <div class="staff">
        <a href="https://github.com/istobran" target="_blank"><span><i class="icon fa-diamond"></i> Developed by BangZ</span></a>
      </div>
    </footer>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      pageState: {
        selectedIndex: 0
      },
      user: {
        avatarUrl: "http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48",
        username: "BangZ",
        hasDesc: true,
        description: "Front-End Engineer"
      },
      navList: [
        {
          linkAddr: "/calendar",
          classText: "icon fa-calendar",
          text: "日历备忘"
        },
        {
          linkAddr: "/accounting",
          classText: "icon fa-area-chart",
          text: "帐务信息"
        },
        {
          linkAddr: "/s_status",
          classText: "icon fa-server",
          text: "服务器状态"
        },
        {
          linkAddr: "/in_clock",
          classText: "icon fa-clock-o",
          text: "国际时钟"
        }
      ]
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
  },
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
    width: 375px;
  	@media screen and (min-width: 961px) and (max-width: 1880px) {
  	  width: 300px;
  	}
  	@media screen and (min-width: 961px) and (max-width: 1320px) {
  	  width: 20%;
  	}
  	@media screen and (max-width: 960px) {
  	  width: 275px;
  	}
    .top {
      flex-grow: 1;
    }
    .bottom {
      flex-shrink: 0;
      padding: 1.5em 0 0.75em 0;
    }
  }
  #userinfo {
    position: relative;
    margin: 1.75em 1.5em 1.5em 1.5em;
    min-height: 48px;
    cursor: default;
    .image {
      position: absolute;
      top: 0;
      left: 0;
    }
    h1 {
      position: relative;
      color: #fff;
      font-weight: 600;
      font-size: 1em;
      line-height: 1em;
    }
    p {
      position: relative;
      display: block;
      font-size: 0.6em;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.25em;
      margin: 0.5em 0 0;
    }
  }
  .image.avatar48 {
    width: 48px;
    height: 48px;
  }
  .image {
    display: inline-block;
    border: 0;
  }
  #nav ul {
    margin-bottom: 0;
    li a {
      display: block;
      padding: 0.5em 1.5em;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      outline: 0;
      border: 0;
      transition: none;
      &.active {
        background: rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 0 0.25em 0 rgba(0, 0, 0, 0.125);
        color: #fff;
        span:before {
          color: #1e9a90;
        }
      }
      span {
        position: relative;
        display: block;
        font-size: 0.8em;
        &:before {
          position: absolute;
          left: 0;
          color: #41484c;
          text-align: center;
          width: 1.25em;
          line-height: 1.75em;
        }
      }
    }
  }
  .icon:before {
    display: inline-block;
    font-family: FontAwesome;
    font-size: 1.25em;
    text-decoration: none;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
  }
  .staff {
    text-align: center;
    font-size: 0.8em;
    a {
      display: inline-block;
      text-decoration: none;
      transition: color 0.35s ease-in-out;
      color: #41484c;
      &:hover {
        color: #fff;
      }
      span {
        display: block;
      }
    }
  }
</style>
