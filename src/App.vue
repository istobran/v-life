<template>
  <sidebar></sidebar>
  <router-view></router-view>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
@import '../node_modules/font-awesome/css/font-awesome.min.css';

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
ol, ul {
  list-style: none;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 19pt;
  font-weight: 300;
  line-height: 1.75em;
  color: #888;
}
body, input, textarea, select {
  @media screen and (min-width: 961px) and (max-width: 1880px) {
    font-size: 17pt;
  }
  @media screen and (min-width: 961px) and (max-width: 1320px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 960px) {
    font-size: 16pt;
  }
  @media screen and (max-width: 736px) {
    font-size: 14pt;
  }
}
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
