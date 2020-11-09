import {fromLonLat} from 'ol/proj';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {Vector} from 'ol/source';


export function addMarker(items) {
    let features = [];
    items.forEach((item) => {
        const lonlat = fromLonLat([item.lng, item.lat]);

        let point = new Point(lonlat);

        console.log(point);

        let feature = new Feature({
            geometry: point,
            data: item,
        });
        features.push(feature);

    })
    return new Vector({
        features: features
    });
}
