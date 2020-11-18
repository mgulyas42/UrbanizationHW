import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector } from 'ol/source';

export function addMarker(items) {
  let features = [];
  for (const [packageName, values] of Object.entries(items)) {
    values.forEach((item) => {
      features.push(
        new Feature({
          geometry: new Point(fromLonLat([item.lat, item.lng])),
          data: {item, packageName: packageName},
        })
      );
    });
  }

  return new Vector({
    features: features
  });
}
