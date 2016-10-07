<template lang="html">
  <div id="calendar">
    <h1 class="calendar">日程行事历</h1>
    <table>
      <thead>
        <tr>
          <td v-for="item in weekTitle">{{ item.text }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in dateItems">
          <td v-for="col in row">
            <p>{{ col.day }}</p>
            <ul>
              <li v-for="item in col.eventList">{{ item.text }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),      // 现在的日期
      weekTitle: [        // 星期标头
        { text: "星期一" },
        { text: "星期二" },
        { text: "星期三" },
        { text: "星期四" },
        { text: "星期五" },
        { text: "星期六" },
        { text: "星期日" }
      ],
      dateItems: [      // 具体的日期数据
        [     // 一行
          {   // 一行中的一天
            day: 1,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "one"
              }
            ]
          },
          {   // 一行中的一天
            day: 2,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "two"
              }
            ]
          },
          {   // 一行中的一天
            day: 3,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "three"
              }
            ]
          },
          {   // 一行中的一天
            day: 4,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "four"
              }
            ]
          },
          {   // 一行中的一天
            day: 5,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "five"
              }
            ]
          },
          {   // 一行中的一天
            day: 6,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "six"
              }
            ]
          },
          {   // 一行中的一天
            day: 7,   // 这天是几号
            eventList: [    // 事件表
              {
                text: "seven"
              }
            ]
          }
        ]
      ]
    }
  },
  computed() {
    return {

    }
  },
  methods: {

  },
  ready() {
    // this.render();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	#calendar {
	  margin-left: 375px;
    @media screen and (min-width: 961px) and (max-width: 1880px) {
  	  margin-left: 300px;
  	}

  	@media screen and (min-width: 961px) and (max-width: 1320px) {
  	  margin-left: 20%;
  	}

  	@media screen and (max-width: 960px) {
  	  margin-left: 275px;
  	}
	}
</style>
