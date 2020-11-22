<template>
  <div></div>
</template>

<script>

import store from "@/store";

const bloomingMenu = require('blooming-menu/build/blooming-menu.min');
import './blooming.css'
import {createLayerVector, zoomToTile} from '@/service/tile'

document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

function initContextMenus(mapArray){
  const map = mapArray;
  map.on('click', (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, x => x);

    let menuDiv = document.querySelector('.blooming-menu__container');
    if(menuDiv){
      menuDiv.remove();
    }

    if (!feature) {
      return;
    }

    const pixel = getPixelCoordinate(map, feature);
    const contextMenu = createContextMenu();
    console.log(pixel);

    menuDiv = document.querySelector('.blooming-menu__container');

    let left = pixel[0];

    if(store.state.sidebarMinimize){
      left += 60;
    }

    menuDiv.setAttribute("style", `top:${pixel[1]}px; left:${left}px;`);

    addContextItemListeners(map, contextMenu, feature);

    window.setTimeout(() => contextMenu.open(), 1000);
  });

  map.on('movestart', () => {
    const menuDiv = document.querySelector('.blooming-menu__container');
    if(menuDiv){
      menuDiv.remove();
    }
  });


}


function createContextMenu() {
  const contextMenu = bloomingMenu({
    startAngle: 0,
    endAngle: 315,
    radius: 100,
    itemsNum: 8
  });

  contextMenu.render();
  contextMenu.props.elements.mainContainer.addEventListener('click', () => {
    removeContextMenu(contextMenu, 800);
  });

  return contextMenu;
}

function getPixelCoordinate(map, feature) {
  const geometry = feature.getGeometry();
  const coordinate = geometry.getCoordinates();
  return map.getPixelFromCoordinate(coordinate);
}

function addContextItemListeners(map, contextMenu, feature) {
  contextMenu.props.elements.items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      console.log(index);
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
      removeContextMenu(contextMenu, 500)
    })
  })
}

function removeContextMenu(contextMenu, timeout) {
  contextMenu.close();
  window.setTimeout(() => {
    if(contextMenu.props.elements.container.parentNode) {
      contextMenu.remove();
    }
  }, timeout);
}


export default {
  name: 'TheContextMenu',
  props: {
    map: {}
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.map);
      initContextMenus(this.map)
    });
  }
}
</script>
