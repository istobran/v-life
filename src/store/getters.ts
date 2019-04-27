export default {
  showMenu (state) {
    return state.showMenu
  },
  navList (state) {
    return state.navList
  },
  today (state) {
    return state.today
  },
  curr (state) {
    return state.curr.moment
  },
  currYear (state) {
    return state.curr.year
  },
  currMonth (state) {
    return state.curr.month + 1
  },
  showCreateMenuDialog (state) {
    return state.showCreateMenuDialog
  },
  showBookmarkDialog (state) {
    return state.showBookmarkDialog
  }
}
