import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector } from 'ol/source';

export function addMarker(items) {
  let features = [];
  items.forEach((item) => {
    features.push(
      new Feature({
        geometry: new Point(fromLonLat([item.lat, item.lng])),
        data: item,
      })
    );
  });
  return new Vector({
    features: features
  });
}
