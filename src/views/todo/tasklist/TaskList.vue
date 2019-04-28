<template>
  <main id="tasklist">
    <VLayout>
      <VFlex
        md6
        class="list"
      >
        <VTextField
          ref="textField"
          v-model="inputText"
          label="添加任务"
          outline
        >
          <VFadeTransition slot="append">
            <div v-if="focused">
              <VBtn
                icon
                class="primary--text"
              >
                <VIcon>timer</VIcon>
              </VBtn>
              <VBtn
                icon
                class="primary--text"
              >
                <VIcon>library_books</VIcon>
              </VBtn>
            </div>
          </VFadeTransition>
        </VTextField>
      </VFlex>
      <VFlex
        md6
        class="detail"
      >
        <div />
      </VFlex>
    </VLayout>
  </main>
</template>
<style lang="scss">
#tasklist {
  padding: 14px 10px 0;
  .v-text-field.v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field.v-text-field--enclosed .v-input__prepend-inner,
  .v-text-field.v-text-field--enclosed .v-input__append-inner,
  .v-text-field.v-text-field--enclosed .v-input__append-outer {
    margin-top: 4px;
  }
}
</style>
<script>
export default {
  data () {
    return {
      inputText: '',
      focused: false
    }
  },
  mounted () {
    this.$watch('$refs.textField.isFocused', val => {
      this.focused = val
    })
  }
}
</script>
