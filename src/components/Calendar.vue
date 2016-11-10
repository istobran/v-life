<template lang="html">
  <div id="calendar">
    <main>
      <header class="prevent-select">
        <a href="javascript:;" @click="previous"><i class="fa fa-chevron-left"></i></a>
        <span :class="{ 'selected': currYear.selected }" @click="changeSelected('year')">{{ currYear.num }} 年</span>
        <span :class="{ 'selected': currMonth.selected }" @click="changeSelected('month')">{{ currMonth.num }} 月</span>
        <a href="javascript:;" @click="next"><i class="fa fa-chevron-right"></i></a>
      </header>
      <section class="table">
        <ul class="thead prevent-select">
          <li v-for="item in weekTitle">{{ item.text }}</li>
        </ul>
        <ul class="tbody">
          <li class="unit" v-for="unit in dateItems" :style="{ height: unitHeight+'%' }">
            <p class="prevent-select">{{ unit.day }}</p>
            <div class="note">{{ unit.note }}</div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import Addition from "./Addition"

export default {
  components: {
    Addition
  },
  data() {
    return {
      title: "日历备忘",
      today: new Date(),      // 现在的日期
      currYear: { num: 0, selected: false },     // 当前正在查看的年份
      currMonth: { num: 0, selected: false },      // 当前正在查看的月份
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
  created() {
    // 初始化年月
    this.currYear.num = this.today.getFullYear();
    this.currMonth.num = this.today.getMonth();
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
    window.document.title = this.title;
  },
  mounted() {
    console.log("mounted");
    // this.render();
    // GET /someUrl
    this.$http.get('/someUrl').then((response) => {
      console.log("success");
      // success callback
    }, (response) => {
      console.log("error");
      // error callback
    });
  },
  computed: {
    unitHeight() {
      return 100 / (this.dateItems.length / this.weekTitle.length);
    }
  },
  methods: {
    changeSelected(choice) {
      switch (choice) {
        case "year":
          this.currMonth.selected = false;
          this.currYear.selected = !this.currYear.selected;
          break;
        case "month":
          this.currYear.selected = false;
          this.currMonth.selected = !this.currMonth.selected;
          break;
      }
    },
    next() {
      console.log("next");
    },
    previous() {
      console.log("previous");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #calendar{
    height: 100%;
  }
  .prevent-select {
    cursor: default;
    -moz-user-select: none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;/**禁止选中文字*/
  }
  main {
    position: relative;
    height: 100%;
    header {
      position: relative;
      z-index: 10;
      text-align: center;
      background: #303F9F;
      color: rgba(255, 255, 255, 0.87);
      height: 56px;
      line-height: 56px;
      font-size: 0;
      & > a, & > span {
        color: inherit;
        padding: 6px;
        cursor: pointer;
        font-size: 18px;
        height: 18px;
      }
      a {
        margin: 0 30px;
      }
      span {
        margin: 0 3px;
        &.selected {
          background: #E8EAF6;
          color: rgba(0, 0, 0, 0.87);
          border-radius: 5px;
        }
      }
    }
    section {
      height: calc(100% - 56px);
      li {
        display: inline-block;
        width: 14.28%;
      }
      .thead {
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background: #3F51B5;
        height: 44px;
        color: rgba(255, 255, 255, 0.87);
        z-index: 5;
        li {
          font-weight: bold;
          text-align: center;
          line-height: 40px;
          font-size: .8em;
        }
      }
      .tbody {
        height: calc(100% - 44px);
        z-index: 1;
        li.unit {
          box-shadow: inset 0 0 1px #aaa;
          min-height: 120px;
          background: rgba(255, 255, 255, 1);
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
