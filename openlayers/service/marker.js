import {fromLonLat} from 'ol/proj';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {Vector} from 'ol/source';


export function addMarker(item) {

    const lonlat = fromLonLat(item);
    console.log(lonlat);

    let point = new Point(lonlat);

    console.log(point);

    let feature = new Feature({
        geometry: point
    });

    return new Vector({
        features: [feature]
    });
}
