<template lang="html">
  <aside id="sidebar" :class="{ 'show': showMenu }">
    <div class="sidebar-inner prevent-select">
      <ul class="common">
        <router-link tag="li" :to="item.link" v-for="item in navList.common" :key="item.name">
          <md-ink-ripple />
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </router-link>
      </ul>
      <ul class="custom">
        <router-link tag="li" :to="item.link" v-for="item in navList.custom" :key="item.name">
          <md-ink-ripple />
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
          <md-icon class="btn-close" @click.prev.stop.native="delRequest(item)">clear</md-icon>
        </router-link>
        <li id="btnCreate" @click="addMenu">
          <md-ink-ripple />
          <md-icon :style="{ 'color': '#616161' }" class="m0">add</md-icon>
          <span class="text">新建</span>
        </li>
      </ul>
      <ul class="feature">
        <router-link tag="li" :to="item.link" v-for="item in navList.feature" :key="item.name">
          <md-ink-ripple />
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </router-link>
      </ul>
      <ul class="other">
        <router-link tag="li" :to="item.link" v-for="item in navList.other" :key="item.name">
          <md-ink-ripple />
          <md-icon :style="{ 'color': item.color }" class="m0">{{ item.icon }}</md-icon>
          <span class="text">{{ item.name }}</span>
        </router-link>
      </ul>
    </div>
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content-html="confirm.contentHtml"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @close="onClose"
      ref="confirm_delMenu">
    </md-dialog-confirm>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      confirm: {
        title: '删除日历',
        contentHtml: '删除自定义日历会同时删除该日历下的所有数据<br>您确定要继续吗？',
        ok: '确定',
        cancel: '取消',
        item: null,
      },
    };
  },
  computed: {
    ...mapGetters(['showMenu', 'navList']),
  },
  ready() {},
  attached() {},
  methods: {
    ...mapMutations({ addMenu: 'openCreateMenuDialog', delMenu: 'removeCustomMenu' }),
    delRequest(item) {
      this.confirm.item = item;
      this.confirm.contentHtml = `删除自定义日历 ${item.name} 会同时删除该日历下的所有数据<br>您确定要继续吗？`;
      this.$refs.confirm_delMenu.open();
    },
    onClose(action) {
      if (action == 'ok') {
        this.delMenu({ item: this.confirm.item });
        G.successGo('删除成功！');
        this.$router.push('/app/home');
      }
      this.confirm.item = null;
    },
  },
  components: {},
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
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      list-style: none;
      padding: 8px 0;
      &:first-child {
        margin-top: 0;
      }
      li {
        position: relative;
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
        .btn-close {
          position: absolute;
          right: 12px;
          display: none;
          z-index: 2;
        }
        &:hover .btn-close {
          display: inherit;
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
