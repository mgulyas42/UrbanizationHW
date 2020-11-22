import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  treeData: {
    // define the default value
    value: null,
    // define options
    options: [ {
      id: 'a',
      label: 'a',
      children: [ {
        id: 'aa',
        label: 'aa',
      }, {
        id: 'ab',
        label: 'ab',
      } ],
    }, {
      id: 'b',
      label: 'b',
    }, {
      id: 'c',
      label: 'c',
    } ],
  }
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  updateValue(state) {
    console.log('update emitted')
    console.log(state);
    console.log(this.treeData);
    state.treeData.options = [{
        id: 'a',
        label: 'a'
    }];
  }
}

export default new Vuex.Store({
  state,
  mutations
})
