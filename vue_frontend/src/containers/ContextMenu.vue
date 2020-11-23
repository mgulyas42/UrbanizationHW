<template>
  <div></div>
</template>

<script>

import store from "@/store";
import './blooming.css'
import {createLayerVector, zoomToTile} from '@/service/tile'

const bloomingMenu = require('blooming-menu/build/blooming-menu.min');

document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

function setContextMenuPosition(contextMenu, pixel){
    let menuDiv = contextMenu.div;

    let left = pixel[0];

    if(store.state.sidebarMinimize){
      left += 60;
    }

    menuDiv.setAttribute("style", `top:${pixel[1]}px; left:${left}px;`);
}

function addContextItemListeners(map, contextMenu) {
  contextMenu.props.elements.items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      const feature = contextMenu.feature;

      switch (index){
        case 0:
          store.commit('selectTreeElement', feature);
          break;
        case 1:
          store.commit('selectTreeElement', feature);
          break;
        case 2:
          map.addLayer(createLayerVector(feature));
          zoomToTile(map, feature);
          break;
        default:
      }
      hideContextMenu(contextMenu, 500)
    })
  })
}

function hideContextMenu(contextMenu, timeout) {
  console.log('hideContextMenu called');
  contextMenu.close();
  window.setTimeout(() => {
    if(contextMenu.props.elements.container.parentNode) {
      contextMenu.div.setAttribute("style", `visibility: hidden;`);
    }
  }, timeout);
}


export default {
  name: 'TheContextMenu',
  props: {
    map: {},
  },
  data: () => ({
    // store OL objects on the component instance
    contextMenu: bloomingMenu({
      startAngle: 0,
      endAngle: 315,
      radius: 100,
      itemsNum: 8
    })
  }),
  mounted() {
    this.$nextTick(() => {
      console.log('Context menu mounted');
      this.map.on('movestart', () => {
        hideContextMenu(this.contextMenu, 800);
      });

      this.map.on('click', (e) => {
        this.contextMenu['feature'] = this.map.forEachFeatureAtPixel(e.pixel, x => x);

        if(!this.contextMenu.feature) {
          hideContextMenu(this.contextMenu, 800);
          return;
        }

        if(this.contextMenu.state.isOpen){
          hideContextMenu(this.contextMenu,  800);
        }
        else {
          setContextMenuPosition(this.contextMenu, e.pixel);
          window.setTimeout(() => this.contextMenu.open(), 1000);
        }
      });

      addContextItemListeners(this.map, this.contextMenu);
    });
  },
  beforeDestroy() {
    console.log('Context menu destroyed');
    let menuDiv = document.querySelector('.blooming-menu__container');
    if(menuDiv){
      menuDiv.remove();
    }
  },
  created() {
    this.contextMenu.render();
    this.contextMenu.props.elements.mainContainer.addEventListener('click', () => {
      hideContextMenu(this.contextMenu, 800);
    });
    this.contextMenu['div'] = document.querySelector('.blooming-menu__container');
    hideContextMenu(this.contextMenu, 0);
  }
}
</script>
