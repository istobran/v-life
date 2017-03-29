<template lang="html">
  <main id="calendar" :class="{ 'main-content': true, 'shrink': showMenu }">
    <header class="dayname-container prevent-select">
      <div class="dayname" v-for="dayname in daynames">{{ dayname }}</div>
    </header>
    <section class="day-container">
      <div :class="{ 'day': true, 'not-this-month': !day.inThisMonth, 'today': isToday(day) }"
          v-for="day in days"
          @dblclick="day.editFlag=true">
        <header class="day-header prevent-select"><i>{{ day.solar }}</i></header>
        <p class="day-context" :contenteditable="day.editFlag" @blur="day.editFlag=false">{{ day.context }}</p>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  components: {
  },
  data() {
    return {
      daynames: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      days: []
    }
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    // console.log(this.currMonth.constructor);
    this.$store.watch(state => { return state.curr.month }, this.render);
    this.render();
  },
  computed: {
    ...mapGetters(['showMenu', 'today', 'curr', 'currYear', 'currMonth'])
  },
  methods: {
    render() {
      this.days = [];
      // 获取当前日期
      const current = this.curr;
      // 获取当月天数
      const monthDays = current.daysInMonth();

      // 创建日历表
      for (let i = 1; i <= monthDays; i++) {
        this.days.push({
          solar: i,   // 公历
          lunar: i,    // 农历
          inThisMonth: true,
          editFlag: false,
          moment: current.clone().date(i),
          context: "a"
        })
      }

      // 获取当月第一天是星期几（从 0 开始，0 是星期天）
      const firstDay = current.clone().date(1);
      // 补全日历（前）
      if (firstDay.day() > 1) {
        // 获取上个月的最后一天
        let temp_1 = firstDay.subtract(1, 'days');
        while (temp_1.day() !== 0) {    // 补到星期一
          this.days.unshift({
            solar: temp_1.date(),   // 公历
            lunar: temp_1.date(),    // 农历
            inThisMonth: false,
            editFlag: false,
            moment: temp_1.clone(),
            context: "a"
          });
          temp_1 = temp_1.subtract(1, 'days');
        }
      }

      // 获取当月最后一天
      const lastDay = current.clone().date(monthDays);
      // 补全日历（后）
      if (lastDay.day() <= 6) {
        let temp_2 = lastDay.add(1, 'days');
        while (temp_2.day() !== 1) {  // 补到星期天
          this.days.push({
            solar: temp_2.date(),   // 公历
            lunar: temp_2.date(),    // 农历
            inThisMonth: false,
            editFlag: false,
            moment: temp_2.clone(),
            context: "a"
          });
          temp_2 = temp_2.add(1, 'days');
        }
      }
    },
    isToday(day) {
      return day.moment.diff(this.today, 'days') === 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#calendar {
  position: absolute;
  .dayname-container {
    display: flex;
    height: 48px;
    font-size: 1.2em;
    font-weight: bold;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-around;
    background-color: #E8E8E8;
  }
  .day-container {
    position: absolute;
    top: 48px;
    bottom: 5px;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    .day {
      flex: 1 1 calc(100%/7);
      box-sizing: border-box;
      position: relative;
      .day-header {
        height: 1.4em;
        line-height: 1.4em;
        font-weight: bold;
        // border: 1px solid red;
        i {
          padding-left: 5px;
        }
      }
      .day-context {
        position: absolute;
        top: 1.4em;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2px;
        // border: 1px solid red;
        overflow: auto;
        &:focus {
          outline: none;
        }
      }
      &.today {
        outline: 1px dotted #212121;
        outline: 5px auto -webkit-focus-ring-color;
      }
      &.not-this-month {
        color: #C1C1C1;
      }
    }
  }
}
</style>
