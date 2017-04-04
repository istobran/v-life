<template lang="html">
  <md-dialog ref="createMenuDialog" @close="close">
    <md-dialog-title>新建自定义日历</md-dialog-title>
    <md-dialog-content>
      <md-input-container @keyup.enter.native="createMenu">
        <label>日历名称</label>
        <md-input v-model="inputValue"></md-input>
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeDialog">取消</md-button>
      <md-button class="md-primary" @click.native="createMenu">新建</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      inputValue: ""
    }
  },
  computed: {
    ...mapGetters({ show: 'showCreateMenuDialog', navList: 'navList' }),
  },
  watch: {
    show() {
      if (this.show) {
        this.$refs["createMenuDialog"].open();
      }
    }
  },
  methods: {
    ...mapMutations({ close: "closeCreateMenuDialog", add: "createCustomMenu" }),
    closeDialog() {
      this.$refs["createMenuDialog"].close();
    },
    createMenu() {
      this.inputValue = this.inputValue.trim();
      let inputValue = this.inputValue;
      if (inputValue) {
        let exist = this.navList.custom.find(item => {
          return item.name == inputValue;
        });
        if (!exist) {
          this.add({ name: inputValue });
          G.successGo("新建成功！");
        } else {
          G.warningGo("日历已存在！");
        }
        this.inputValue = "";
      }
      this.$refs["createMenuDialog"].close();
    }
  }
}
</script>

<style lang="css">
</style>
