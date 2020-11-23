import Vue from 'vue';
import Vuex from 'vuex';
import MarkerService from './containers/MarkerService'

Vue.use(Vuex);

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  treeData: {
    // define the default value
    value: [],
    // define options
    options: [],
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
  clearTree(state){
    console.log('map destroyed, clear tree from store');
    state.treeData.options.clear();
  },
  selectTreeElement(state, feature) {
    const item = feature.values_.data;
    const id = item.packageName + '|' + item.id;
    MarkerService.getSelectedFeature(id).setStyle(MarkerService.checkedStyle);

    state.treeData.value.push(id);
  }
}

export default new Vuex.Store({
  state,
  mutations
})
