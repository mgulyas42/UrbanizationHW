import imagePath from "./marker.png";
import {Vector} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Icon, Style} from 'ol/style';

exports.markerVector = new Vector({
    name: 'markers',
    source: new VectorSource({
        features: []
    }),
    maxZoom: 18,
    minZoom: 2,
    style: new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: imagePath
        })
    })
})

exports.checkedStyle = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/600px-Approve_icon.svg.png'
    })
});

exports.uncheckedStyle = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: imagePath
    })
});
