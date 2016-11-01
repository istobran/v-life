<template lang="html">
  <div id="calendar">
    <main>
      <header>
        <button type="button"><i class="icon fa-chevron-left"></i></button>
        <span :class="{ 'selected': currYear.selected }">{{ currYear.text }}</span>
        <span :class="{ 'selected': currMonth.selected }">{{ currMonth.text }}</span>
        <button type="button"><i class="icon fa-chevron-right"></i></button>
      </header>
      <section class="table">
        <ul class="thead">
          <li v-for="item in weekTitle">{{ item.text }}</li>
        </ul>
        <ul class="tbody">
          <li class="unit" v-for="unit in dateItems">
            <p>{{ unit.day }}</p>
            <div class="note">{{ unit.note }}</div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),      // 现在的日期
      currYear: { text: today.getFullYear(), selected: false },     // 当前正在查看的年份
      currMonth: { text: today.getMonth(), selected: true },      // 当前正在查看的月份
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
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一天
          day: 1,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 2,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 3,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 4,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 5,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 6,   // 这天是几号
          note:  "this is my note!"
        },
        {   // 一行中的一天
          day: 7,   // 这天是几号
          note:  "this is my note!"
        }
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
  .banner {
    background: url('../assets/banner.jpg');
    display: flex;
    justify-content: center;
    height: 240px;
    .title {
      margin: 40px 0;
      color: #fff;
      font-size: 2em;
      font-weight: bolder;
    }
  }
  main {
    position: relative;
    section {
      background: rgba(255, 255, 255, 0.8);
      position: relative;
      z-index: 2;
      width: 960px;
      border-radius: 8px;
      li {
        display: inline-block;
        width: 14.28%;
      }
      .thead {
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
        li {
          font-weight: bold;
          text-align: center;
          line-height: 40px;
          font-size: .8em;
        }
      }
      .tbody {
        li.unit {
          box-shadow: inset 0 0 1px #aaa;
          height: 120px;
          p {
            line-height: 2em;
            font-size: .6em;
            font-weight: bold;
            text-align: right;
            padding-right: 1em;
          }
          div.note {
            font-size: .7em;
            line-height: 1em;
            padding: 0 10px;
          }
        }
      }
    }
  }
</style>
