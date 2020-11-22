<template>
  <div></div>
</template>
<script>
import marker_default from "./../assets/icons/marker.png";
import marker_selected from "./../assets/icons/marker_selected.png";
import { Vector } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';

const checkedStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: marker_selected
  })
});

const defaultStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: marker_default
  })
});

const markerVector = new Vector({
  name: 'markers',
  source: new VectorSource({
    features: []
  }),
  maxZoom: 18,
  minZoom: 2,
  style: defaultStyle
})

export default {
  name: 'MarkerService',
  checkedStyle,
  defaultStyle,
  markerVector,
  getSelectedFeature: idtitle => {
    return markerVector.getSource()
        .getFeatures()
        .find(feature => feature.values_.data.packageName + '|' + feature.values_.data.id === idtitle)
  }
}
</script>
