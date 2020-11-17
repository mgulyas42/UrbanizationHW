import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as SourceVector } from 'ol/source';
import { Vector as LayerVector } from 'ol/layer';
import { Icon, Style } from "ol/style";

function addTile(lat, lng) {
  return new SourceVector({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([lat, lng])),
      })
    ]
  });
}

export function addTiles(map, data) {
  data.forEach((element) => {
    map.addLayer(
      new LayerVector({
        source: addTile(element.lat, element.lng),
        maxZoom: 17.1,
        minZoom: 16.9,
        style: new Style({
          image: new Icon({
            anchor: [310, 310],
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
            src: `http://localhost:3000/almafa/${element.id}`
          })
        })
      })
    );
  })
}
