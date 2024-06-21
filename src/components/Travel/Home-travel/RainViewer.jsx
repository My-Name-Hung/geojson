// <!DOCTYPE html>
// <html>
// <head>
//   <title>Mapbox Rainviewer Example</title>
//   <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet">
//   <script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
//   <style>
//     #map { width: 100%; height: 500px; }
//     .legend {
//       background-color: rgba(255, 255, 255, 0.8);
//       padding: 10px;
//       border-radius: 3px;
//     }
//     .legend h3 { margin-top: 0; }
//     .legend-item { display: flex; align-items: center; margin-bottom: 5px; }
//     .color-box {
//       width: 20px;
//       height: 20px;
//       display: inline-block;
//       margin-right: 8px;
//     }
//     .timestamp {
//       background-color: rgba(255, 255, 255, 0.8);
//       padding: 10px;
//       border-radius: 3px;
//       margin-top: 10px;
//     }
//     #rainButton { margin-bottom: 10px; }
//   </style>
// </head>
// <body>
//   <button id="rainButton">Show Rain</button>
//   <div id="map"></div>

//   <script>
//     mapboxgl.accessToken = "pk.eyJ1IjoidGhhbmhodW5nMTExMTIwMDIiLCJhIjoiY2xuOG5xbXhyMDBqdzJqb3o2eTg4ZDdvNCJ9.c1wnXUMq8opOXn7NrPIwhA";

//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/dark-v10",
//       zoom: 6,
//       center: [106.66, 10.76]  // Center on Ho Chi Minh City
//     });

//     const rainButton = document.getElementById("rainButton");
//     let rainLayersVisible = false;
//     let apiData = null;
//     const legendContainer = document.getElementById("map");
//     const timestampContainer = document.getElementById("map");

//     map.on("load", () => {
//       fetch("https://api.rainviewer.com/public/weather-maps.json")
//         .then(res => res.json())
//         .then(data => {
//           apiData = data;

//           // Add Rain Layers with Click Events
//           apiData.radar.past.forEach(frame => {
//             map.addLayer({
//               id: `rainviewer_${frame.path}`,
//               type: "raster",
//               source: {
//                 type: "raster",
//                 tiles: [apiData.host + frame.path + '/256/{z}/{x}/{y}/2/1_1.png'],
//                 tileSize: 256
//               },
//               layout: { visibility: "none" }, // Initially hidden
//               minzoom: 0,
//               maxzoom: 12
//             }, 'waterway-label');  // Add layer above 'waterway-label'

//             map.on('click', `rainviewer_${frame.path}`, () => {
//               const visibility = map.getLayoutProperty(`rainviewer_${frame.path}`, 'visibility');
//               map.setLayoutProperty(`rainviewer_${frame.path}`, 'visibility', visibility === 'visible' ? 'none' : 'visible');

//               // Update rainLayersVisible based on layer visibility
//               rainLayersVisible = map.getStyle().layers.some(layer => layer.id.startsWith('rainviewer_') && layer.layout.visibility === 'visible');
//               rainButton.textContent = rainLayersVisible ? "Hide Rain" : "Show Rain";

//               // Update legend and timestamp only if layer is now visible and rain is on
//               if (visibility !== 'visible' && rainLayersVisible) {
//                 createLegend();
//                 showTimestamp(frame);
//               }
//             });
//           });

//           // Rain Animation Logic
//           let i = 0;
//           let animationInterval = setInterval(() => {
//             if (!rainLayersVisible) {
//               // Clear the interval when rain is hidden
//               clearInterval(animationInterval);
//               return;
//             }
//             if (i > apiData.radar.past.length - 1) {
//               i = 0; // Loop back to the beginning
//             }
//             apiData.radar.past.forEach((frame, index) => {
//               map.setLayoutProperty(
//                 `rainviewer_${frame.path}`,
//                 "visibility",
//                 index === i || index === i - 1 ? "visible" : "none"
//               );
//             });
//             if (i - 1 >= 0) {
//               const frame = apiData.radar.past[i - 1];
//               let opacity = 1;
//               setTimeout(() => {
//                 const fadeInterval = setInterval(() => {
//                   if (opacity <= 0 || !rainLayersVisible) {
//                     clearInterval(fadeInterval);
//                     return;
//                   }
//                   map.setPaintProperty(
//                     `rainviewer_${frame.path}`,
//                     "raster-opacity",
//                     opacity
//                   );
//                   opacity -= 0.1;
//                 }, 50);
//               }, 400);
//             }
//             i += 1;
//           }, 2000);
//         })
//         .catch(console.error);
//     });

//     // Button Click Event
//     rainButton.addEventListener("click", () => {
//     rainLayersVisible = !rainLayersVisible;
//     rainButton.textContent = rainLayersVisible ? "Hide Rain" : "Show Rain";

//       // Update all Rainviewer layers' visibility
//       map.getStyle().layers.forEach(layer => {
//         if (layer.id.startsWith("rainviewer_")) {
//           map.setLayoutProperty(layer.id, "visibility", rainLayersVisible ? "visible" : "none");
//         }
//       });
//     });

//     // Legend & Timestamp Functions (unchanged)
//     // ... (same as before)
//   </script>
// </body>
// </html>
