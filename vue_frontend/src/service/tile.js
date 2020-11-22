import {fromLonLat} from 'ol/proj';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {Vector as SourceVector} from 'ol/source';
import {Vector as LayerVector} from 'ol/layer';
import {Icon, Style} from "ol/style";
import * as olProj from "ol/proj";

function addTile(lat, lng) {
    return new SourceVector({
        features: [
            new Feature({
                geometry: new Point(fromLonLat([lat, lng])),
            })
        ]
    });
}

export function createLayerVector(feature) {
    const element = feature.values_.data;
    return new LayerVector({
        source: addTile(element.lat, element.lng),
        maxZoom: 17.5,
        minZoom: 15.5,
        style: new Style({
            image: new Icon({
                anchor: [310, 310],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: `http://localhost:3000/image/${element.packageName}/${element.id}`
            })
        })
    });
}

export function zoomToTile(map, feature){
    const element = feature.values_.data;
    map.getView().animate({
        center: olProj.transform([element.lat, element.lng], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17,
        duration: Math.abs(map.getView().getZoom() - 18) * 200
    });
}
