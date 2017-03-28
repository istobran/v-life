<template lang="html">
  <main id="calendar" :class="{ 'main-content': true, 'shrink': showMenu }">
    <header class="dayname-container prevent-select">
      <div class="dayname" v-for="dayname in daynames">{{ dayname }}</div>
    </header>
    <section class="day-container">
      <div class="day" v-for="day in days">
        <i>{{ day.solar }}</i>
        {{ day.context }}
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
    // 获取当前日期
    const current = moment();
    // 获取当月天数
    const monthDays = current.daysInMonth();

    // 创建日历表
    for (let i = 1; i <= monthDays; i++) {
      this.days.push({
        solar: i,   // 公历
        lunar: i,    // 农历
        moment: current.date(i),
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
          moment: temp_1,
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
          moment: temp_2,
          context: "a"
        });
        temp_2 = temp_2.add(1, 'days');
      }
    }
  },
  computed: {
    ...mapGetters(['showMenu'])
  },
  methods: {

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
    font-weight: bold;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-around;
    background-color: #E8E8E8;
  }
}
</style>
