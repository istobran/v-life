<template>
  <h1 id="calendar" class="calendar">日程行事历</h1>
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
</template>

<script>
export default {
  data: function() {
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
  computed: function() {
    return {

    }
  },
  methods: {

  },
  ready: function() {
    // this.render();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
