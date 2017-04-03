export default {
  toggleMenu(state) {
    state.showMenu = !state.showMenu;
  },
  setupCurr(state) {
    state.curr.moment = state.today.clone();
    state.curr.year = state.curr.moment.year();
    state.curr.month = state.curr.moment.month();
  },
  nextMonth(state) {
    state.curr.moment.add(1, 'M');
    state.curr.year = state.curr.moment.year();
    state.curr.month = state.curr.moment.month();
  },
  prevMonth(state) {
    state.curr.moment.subtract(1, 'M');
    state.curr.year = state.curr.moment.year();
    state.curr.month = state.curr.moment.month();
  },
  openCreateMenuDialog(state) {
    state.showCreateMenuDialog = true;
  },
  closeCreateMenuDialog(state) {
    state.showCreateMenuDialog = false;
  },
  createCustomMenu(state, payload) {
    // state.navList.custom.push({
    //   name: "个人日历", icon: "date_range", color: "#616161",
    //   link: { name: "custom", params: { cid: 1 } }
    // });
  }
}
