<template lang="html">
  <main id="calendar">
    <header class="dayname-container prevent-select">
      <div v-for="dayname in daynames" :key="dayname" class="dayname">
        {{ dayname }}
      </div>
    </header>
    <section class="day-container">
      <div v-for="(day, index) in days"
           :key="index"
           :class="{ 'day': true, 'not-this-month': !day.inThisMonth, 'editing': day.editFlag }"
           @dblclick="startEdit(day)"
           @blur="endEdit(day)"
      >
        <header class="day-header prevent-select">
          <i>{{ day.solar }}</i>
          <span v-if="isToday(day)" class="tag">
            今天
          </span>
        </header>
        <day-context :ref="day.moment.format('YYYY-MM-DD')"
                     v-model="day.context"
                     :flag="day.editFlag"
                     @blur="endEdit(day)"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import DayContext from './DayContext.vue';

export default {
  components: {
    DayContext,
  },
  data() {
    return {
      daynames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      days: [],
      events: {}, // key: YYYY-MM-DD, value: context
    };
  },
  created() {
  },
  beforeRouteEnter(to, from, next) {
    const reqRoute = to.fullPath.replace('/app/', '').split('/');
    next(vm => {
      vm.reqRoute = reqRoute;
      vm.loadEvents();
      vm.render();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.reqRoute = to.fullPath.replace('/app/', '').split('/');
    this.loadEvents();
    this.render();
    next();
  },
  mounted() {
    // 监听月份变化
    this.$store.watch(state => state.curr.month, this.render);
    // 读取本地事件数据
    // this.loadEvents();
    // this.render();
  },
  computed: {
    ...mapGetters(['showMenu', 'today', 'curr', 'currYear', 'currMonth']),
  },
  methods: {
    // 渲染日历
    render() {
      this.days.splice(0, this.days.length);
      // 获取当前日期
      const current = this.curr;
      // 获取当月天数
      const monthDays = current.daysInMonth();

      // 创建日历表
      for (let i = 1; i <= monthDays; i++) {
        this.days.push({
          solar: i, // 公历
          lunar: i, // 农历
          inThisMonth: true,
          editFlag: false,
          moment: current.clone().date(i),
          context: '',
        });
      }

      // 获取当月第一天是星期几（从 0 开始，0 是星期天）
      const firstDay = current.clone().date(1);

      // 补全日历（前）
      if (firstDay.day() > 1 || firstDay.day() === 0) {
        // 获取上个月的最后一天
        let temp1 = firstDay.subtract(1, 'days');
        while (temp1.day() !== 0) { // 补到星期一
          this.days.unshift({
            solar: temp1.date(), // 公历
            lunar: temp1.date(), // 农历
            inThisMonth: false,
            editFlag: false,
            moment: temp1.clone(),
            context: '',
          });
          temp1 = temp1.subtract(1, 'days');
        }
      }

      // 获取当月最后一天
      const lastDay = current.clone().date(monthDays);
      // 补全日历（后）
      if (lastDay.day() <= 6) {
        let temp2 = lastDay.add(1, 'days');
        while (temp2.day() !== 1) { // 补到星期天
          this.days.push({
            solar: temp2.date(), // 公历
            lunar: temp2.date(), // 农历
            inThisMonth: false,
            editFlag: false,
            moment: temp2.clone(),
            context: '',
          });
          temp2 = temp2.add(1, 'days');
        }
      }

      // 导入事件
      this.insertEvents();
    },
    // 将事件导入日历表
    insertEvents() {
      this.days.forEach(day => {
        if (this.events[day.moment.format('YYYY-MM-DD')]) {
          day.context = this.events[day.moment.format('YYYY-MM-DD')];
          if (this.isToday(day)) {
            const vnode = document.createElement('span');
            vnode.innerHTML = day.context;
            this.$notify('今日任务', vnode.innerText);
          }
        }
      });
      // 等待子组件 props 数据变化后再触发事件
      this.$nextTick(() => {
        this.$emit('updateContext');
      });
    },
    // 读取本地存储的事件列表
    loadEvents() {
      const data = window.localStorage[`v-life-events-${this.reqRoute.join('-')}`];
      if (data) {
        this.events = JSON.parse(data);
      } else {
        this.events = {};
      }
    },
    // 保存事件列表到本地
    saveEvents() {
      window.localStorage[`v-life-events-${this.reqRoute.join('-')}`] = JSON.stringify(this.events);
    },
    // 判断是否为今天
    isToday(day) {
      return day.moment.diff(this.today, 'days') === 0;
    },
    // 进入编辑日历
    startEdit(day) {
      if (day.inThisMonth) {
        day.editFlag = true;
        // 这里有坑：http://stackoverflow.com/a/37162116/5160100
        // contentEditable元素不能够直接focus，需要有timeout
        const node = this.$refs[day.moment.format('YYYY-MM-DD')][0].$el;
        // console.log(node);
        setTimeout(() => node.focus(), 0);
      }
    },
    // 退出编辑日历
    endEdit(day) {
      if (day.inThisMonth) {
        day.editFlag = false;
        const tempNode = document.createElement('p');
        tempNode.innerHTML = day.context;
        if (tempNode.innerText.trim().length === 0) {
          day.context = '';
          delete this.events[day.moment.format('YYYY-MM-DD')];
        } else {
          this.events[day.moment.format('YYYY-MM-DD')] = day.context;
        }
        this.saveEvents();
      }
    },
    // 修改日历值
    // changeContext(day) {
    //   const refName = day.moment.format('YYYY-MM-DD')
    //   day.context = this.$refs[refName][0].innerHTML;
    //   console.log(this.$refs[refName][0].innerHTML);
    // }
  },
};
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
        height: 16px;
        line-height: 16px;
        font-weight: bold;
        // border: 1px solid red;
        i {
          padding-left: 5px;
          font-style: normal
        }
        .tag {
          margin-left: 5px;
          background-color: #4A148C;
          box-sizing: border-box;
          color: #FFF;
          font-size: 12px;
          font-weight: bold;
          padding: 1px 4px;
          border-radius: 7px;
          vertical-align: middle;
        }
      }
      .day-context {
        position: absolute;
        top: 16px;
        bottom: 2px;
        left: 4px;
        right: 4px;
        padding: 2px;
        box-sizing: border-box;
        overflow: auto;
        &:focus {
          outline: none;
        }
      }
      &.editing {
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
          0 4px 5px rgba(0,0,0,.14),
          0 1px 10px rgba(0,0,0,.12);
        .day-context {
          background-color: #FAFAFA;
          border: 1px solid #CCCCCC;
        }
        .tag {
          background-color: transparent;
          color: inherit;
          font-size: inherit;
          font-weight: inherit;
          padding: 0;
          border-radius: 0;
        }
      }
      &.not-this-month {
        color: #C1C1C1;
      }
    }
  }
}
</style>
