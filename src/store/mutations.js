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
    // 获取当前数组中最大的ID值
    let len = state.navList.custom.length - 1;
    let max = Number(state.navList.custom[len].link.params.cid);
    while (len--) {
      if (Number(state.navList.custom[len] > max)) {
        max = Number(state.navList.custom[len]);
      }
    }
    state.navList.custom.push({
      name: payload.name, icon: "date_range", color: "#616161",
      link: { name: "custom", params: { cid: ++max } }
    });
    // 更新 localStorage
    window.localStorage.setItem("v-life-custom", JSON.stringify(state.navList.custom));
  },
  removeCustomMenu(state, payload) {
    const index = state.navList.custom.indexOf(payload.item);
    state.navList.custom.splice(index, 1);
    // 更新 localStorage
    window.localStorage.removeItem(`v-life-events-custom-${payload.item.link.params.cid}`);
    window.localStorage.setItem("v-life-custom", JSON.stringify(state.navList.custom));
  }
}
