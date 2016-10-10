<template lang="html">
  <div id="calendar">
    <header class="banner">
      <h1 class="title">日程行事历</h1>
    </header>
    <main>
      <aside class="c_panel">
        <div class="display_mode">
          <h4>显示模式</h4>
          <p>
            <input type="radio" name="mode" value="1">
            <label for="mode">日历</label>
            <input type="radio" name="mode" value="2">
            <label for="mode">时间轴</label>
          </p>
        </div>
      </aside>
      <section class="table">
        <ul class="thead">
          <li v-for="item in weekTitle">{{ item.text }}</li>
        </ul>
        <ul class="tbody">
          <li class="unit" v-for="unit in dateItems">
            <p>{{ unit.day }}</p>
            <ul>
              <li v-for="ev in unit.eventList">{{ ev.text }}</li>
            </ul>
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
        },
        {   // 一天
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
        },
        {   // 一天
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
        },
        {   // 一天
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
        },
        {   // 一天
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
        },
        {   // 一天
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
    margin: -120px auto 0;
    width: 840px;
    aside {
      background: #00b9ff;
      width: 330px;
      height: 600px;
      position: absolute;
      top: 0;
      right: -180px;
    }
    section {
      background: #fff;
      position: relative;
      width: 960px;
      margin-left: -180px;
      z-index: 2;
      li {
        display: inline-block;
        width: 14.28%;
      }
      .thead {
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
        li {
          font-weight: bold;
          text-align: center;
          line-height: 80px;
          font-size: .8em;
        }
      }
      .tbody {
        li.unit {
          box-shadow: inset 0 0 1px #ccc;
          height: 120px;
          p {
            line-height: 2em;
            font-size: .6em;
            font-weight: bold;
            text-align: right;
            padding-right: 1em;
          }
        }
      }
    }
  }
</style>
