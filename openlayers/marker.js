import marker_default from "./images/marker.png";
import marker_selected from "./images/marker_selected.png";
import {Vector} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Icon, Style} from 'ol/style';

const DEFAULT_MARKER_STYLE = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: marker_default
    })
});

const SELECTED_MARKER_STYLE = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: marker_selected
    })
});


exports.markerVector = new Vector({
    name: 'markers',
    source: new VectorSource({
        features: []
    }),
    maxZoom: 18,
    minZoom: 2,
    style: DEFAULT_MARKER_STYLE
})

exports.checkedStyle = SELECTED_MARKER_STYLE

exports.uncheckedStyle = DEFAULT_MARKER_STYLE
