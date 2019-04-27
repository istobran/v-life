<template lang="html">
  <v-dialog
    v-model="show"
    @close="close"
  >
    <v-card>
      <v-card-title class="headline">
        新建自定义日历
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="inputValue"
          label="日历名称"
          @keyup.enter.native="createMenu"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          flat
          @click="show=false"
        >
          取消
        </v-btn>
        <v-btn
          color="green darken-1"
          flat
          @click="createMenu"
        >
          新建
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    ...mapGetters({ show: 'showCreateMenuDialog', navList: 'navList' })
  },
  methods: {
    ...mapMutations({ close: 'closeCreateMenuDialog', add: 'createCustomMenu' }),
    createMenu () {
      this.inputValue = this.inputValue.trim()
      const { inputValue } = this
      if (inputValue) {
        const exist = this.navList.custom.find(item => item.name === inputValue)
        if (!exist) {
          this.add({ name: inputValue })
          this.$message.success('新建成功！')
        } else {
          this.$message.warning('日历已存在！')
        }
        this.inputValue = ''
      }
      this.show = false
    }
  }
}
</script>

<style lang="css">
</style>
