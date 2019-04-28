<template>
  <div class="month-selector prevent-select">
    <VIcon
      class="prev"
      @click="prevMonth"
    >
      keyboard_arrow_left
    </VIcon>
    <VIcon
      class="next"
      @click="nextMonth"
    >
      keyboard_arrow_right
    </VIcon>
    <span class="mid-dot">
      &bull;
    </span>
    <span class="ml-2">
      {{ currYear }} 年
    </span>
    <span class="ml-1">
      {{ currMonth }} 月
    </span>
  </div>
</template>
<style lang="scss">
.month-selector {
  position: absolute;
  left: 218px;
  font-size: 16px;
  cursor: default;
  .prev, .next {
    cursor: pointer;
    vertical-align: top;
  }
}
</style>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currYear', 'currMonth'])
  },
  created () {
    this.setupCurr()
  },
  methods: {
    ...mapMutations(['setupCurr', 'nextMonth', 'prevMonth'])
  }
}
</script>
