<template lang="html">
  <aside id="sidebar" :class="{ 'show': showMenu }">
    <div class="sidebar-inner">
      <ul class="common">
        <li v-for="item in navList.common" :class="{ 'active': false }">
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
      <ul class="custom">
        <li :class="{ 'active': false }" v-for="item in navList.custom">
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </li>
        <li>
          <md-icon :style="{ 'color': '#616161' }" class="m0">add</md-icon>
          <span class="text">新建</span>
        </li>
      </ul>
      <ul class="feature">
        <li :class="{ 'active': false }" v-for="item in navList.feature">
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
      <ul class="other">
        <li :class="{ 'active': false }" v-for="item in navList.other">
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      pageState: {
      },
      user: {
      },
      navList: {
        common: [
          { name: "生活", icon: "home", color: "#43A047" },
          { name: "工作", icon: "work", color: "#1E88E5" },
          { name: "节日", icon: "extension", color: "#FB8C00" }
        ],
        custom: [
          { name: "个人日历", icon: "date_range", color: "#616161" }
        ],
        feature: [
          { name: "便签", icon: "bookmark", color: "#E53935"  }
        ],
        other: [
          { name: "设置", icon: "settings", color: "#616161"  },
          { name: "帮助", icon: "help", color: "#616161"  }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['showMenu'])
  },
  ready() {},
  attached() {},
  methods: {
  },
  components: {}
};
</script>

<style lang="scss">
#sidebar {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 218px;
  transform: translateX(-228px);
  transition: transform .15s ease-in-out;
  background-color: #F2F2F2;
  z-index: 1;
  &.show {
    transform: translateX(0);
  }
  .sidebar-inner {
    padding: 12px 8px 52px;
    line-height: 40px;
    color: #616161;
    ul {
      // margin: 13px 0;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      list-style: none;
      padding: 8px 0;
      &:first-child {
        margin-top: 0;
      }
      li {
        cursor: pointer;
        align-items: center;
        display: flex;
        padding-left: 16px;
        padding-right: 12px;
        &.active {
          background-color: rgba(0,0,0,.05);
          border-radius: 2px;
          color: #212121;
          font-weight: bold;
        }
        .m0 {
          margin: 0;
        }
        .text {
          display: inline-flex;
          padding-left: 24px;
          white-space: nowrap;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
