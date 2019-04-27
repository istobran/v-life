<template>
  <main id="tasklist">
    <v-layout>
      <v-flex
        md6
        class="list"
      >
        <v-text-field
          ref="textField"
          v-model="inputText"
          label="添加任务"
          outline
        >
          <v-fade-transition slot="append">
            <div v-if="focused">
              <v-btn
                icon
                class="primary--text"
              >
                <v-icon>timer</v-icon>
              </v-btn>
              <v-btn
                icon
                class="primary--text"
              >
                <v-icon>library_books</v-icon>
              </v-btn>
            </div>
          </v-fade-transition>
        </v-text-field>
      </v-flex>
      <v-flex
        md6
        class="detail"
      >
        <div />
      </v-flex>
    </v-layout>
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
