<template lang="html">
  <VDialog
    v-model="show"
    @close="close"
  >
    <VCard>
      <VCardTitle class="headline">
        新建自定义日历
      </VCardTitle>
      <VCardText>
        <VTextField
          v-model="inputValue"
          label="日历名称"
          @keyup.enter.native="createMenu"
        />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="green darken-1"
          flat
          @click="show=false"
        >
          取消
        </VBtn>
        <VBtn
          color="green darken-1"
          flat
          @click="createMenu"
        >
          新建
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
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
