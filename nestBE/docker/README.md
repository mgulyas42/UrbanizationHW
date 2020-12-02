1 collection = 1 feltöltött package

egy collection (data.csv alapján): 
id(short)	lng(float)	lat(float)	title(string)	img(bson)	metadata(arrayObject)

A metadata az adott ID-hez tartozó CSV összes adata. 
(Ez egy nested document lesz, nem kell külön collectiont csinálni hozzá és így nem kell id alapján kötögetni)

A relációs adatbázisban a collection megfelelője a tábla, a document megfelelője egy column


`db.XYCollection.insertMany( [
   { id: "1", lng: 47.5546, lat: 18.4352, metadata: [ { X: "A", Y: 5 }, { X: "C", Y: 15 } ] },
   { id: "2", lng: 47.5546, lat: 18.4352, metadata: [ { X: "B", Y: 15 }, { X: "C", Y: 35 } ] }
]);`

Az init.jsbe a default adatokat automatikusan betölthetnénk.

Akkor lenne értelme külön collectionbe szervezni a metadatat, ha abban külön szeretnénk keresni stb, be szeretnénk indexelni.
De mivel egy lokáció alatt van az egész, ezért mehet az egész egybe szerintem.
