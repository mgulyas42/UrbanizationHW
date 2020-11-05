
var TILE_SIZE = 620*620;

function createInfoWindowContent(latLng, zoom) {
    const scale = 1 << zoom;
    const worldCoordinate = project(latLng);
    const pixelCoordinate = [
        Math.floor(worldCoordinate[0] * scale),
        Math.floor(worldCoordinate[1] * scale)
    ]
    const tileCoordinate = [
        Math.floor((worldCoordinate[0] * scale) / TILE_SIZE),
        Math.floor((worldCoordinate[1] * scale) / TILE_SIZE)
    ]
    return [
        "Chicago, IL",
        "LatLng: " + latLng,
        "Zoom level: " + zoom,
        "World Coordinate: " + worldCoordinate,
        "Pixel Coordinate: " + pixelCoordinate,
        "Tile Coordinate: " + tileCoordinate,
    ].join("<br>");
}

function project(latLng) {

    console.log(latLng);

    let siny = Math.sin((latLng.lat * Math.PI) / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return [
        TILE_SIZE * (0.5 + latLng.lng / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    ];
}


console.log(createInfoWindowContent({
    lat: 41.85,
    lng: -87.65}, 2))

