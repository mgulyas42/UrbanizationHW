import {fromLonLat} from 'ol/proj';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {Vector as SourceVector} from 'ol/source';
import {Vector as LayerVector} from 'ol/layer';


export function addMarker(items) {
    let features = [];
    items.forEach((item) => {
        const lonlat = fromLonLat([item.lat, item.lng]);

        let point = new Point(lonlat);

        console.log(point);

        let feature = new Feature({
            geometry: point,
            data: item,
        });
        features.push(feature);

    })
    return new SourceVector({
        features: features
    });
}
