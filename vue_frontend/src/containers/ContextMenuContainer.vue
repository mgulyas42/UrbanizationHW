<template>
  <div>
    kaki
  </div>
</template>

<script>

import TreeView from '../openlayers/treeview'

const bloomingMenu = require('blooming-menu/build/blooming-menu.min');
import './blooming.css'


const menuFunctions = (index) => ({
  0: TreeView.checkTreeElement,
  1: TreeView.selectTreeElement,
})[index];

document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

function initContextMenus(mapArray){
  const map = mapArray[0];
  map.on('click', (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, x => x);

    const menuDiv = document.querySelector('.blooming-menu__container');
    if(menuDiv){
      menuDiv.remove();
    }

    if (!feature) {
      return;
    }

    const pixel = getPixelCoordinate(map, feature);
    const contextMenu = createContextMenu();
    console.log(pixel);

    addContextItemListeners(contextMenu, feature);

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

function addContextItemListeners(contextMenu, feature) {
  contextMenu.props.elements.items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      console.log(menuFunctions);
      menuFunctions(index)(feature);
      removeContextMenu(contextMenu, 500)
    })
  })
}

function removeContextMenu(contextMenu, timeout) {
  contextMenu.close();
  window.setTimeout(() => contextMenu.remove(), timeout);
}


export default {
  name: 'TheMarker',
  props: {
    map: []
  },
  mounted() {
    setTimeout(initContextMenus, 1000, this.map);
  }
}
</script>
