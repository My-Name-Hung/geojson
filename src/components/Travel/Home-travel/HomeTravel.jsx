import { React, useEffect, useRef, useState } from 'react';
// MapBOX
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import * as turf from '@turf/turf';
import mapboxgl, { accessToken } from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import NavBar from '../../NavBar/NavBar';
// import markerHotel from './HotelMarker.png';
import markerFood from './RestaurantMarker.png';
// import markerPlace from './TravelMarker.png';
import Legend from './legend';
import {Button} from "@nextui-org/react";
import GoongGeocoder from '@goongmaps/goong-geocoder';
import travelMarker from './Travel.png';
import hotelMarker from './Hotel.png'
import geojson from '../../../../test.json';
import './Home.css' 
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js'


goongjs.accessToken = import.meta.env.VITE_GOONGMAP_KEY;
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function HomeTravel() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.660172);
  const [lat, setLat] = useState(10.762622);
  const [zoom, setZoom] = useState(8.5);
  const [pitch, setPitch] = useState(0);
  const [activeLayers, setActiveLayers] = useState([]); // Track active layers
  //Open weather Map
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTemp, setShowTemp] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const [showClouds, setShowClouds] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [legends, setLegends] = useState([]);
  const [layerTimestamps, setLayerTimestamps] = useState({}); // Lưu trữ timestamp cho mỗi layer
  const [geojsonData, setGeojsonData] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const directionsContainerRef = useRef(null);
  const printoutContainerRef = useRef(null);
  // google cloud -- verify signup
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NNQ1HWW2J3');
  // DROPDOWN layer
  const layerOptions = [
    { 
      id: 'travelLayer', 
      label: 'Địa điểm du lịch', 
      source: '../../../../travel.geojson', 
      icon: travelMarker, 
      nameProperty: 'Name',
      properties: ['Name', 'Address', 'Rating', 'AccountRating', 'Open/Close'],
      propertyLabels: { // Add labels in Vietnamese
        'Name': 'Tên',
        'Address': 'Địa chỉ',
        'Rating': 'Đánh giá',
        'AccountRating': 'Số đánh giá',
        'Open/Close': 'Giờ hoạt động'
      } 
    },
    { id: 'hoLayer', 
      label: 'Cơ sở lưu trú', 
      source: '../../../../motel_hotel_homestay.geojson', 
      icon: hotelMarker, 
      nameProperty: 'Name',
      properties: ['Name', 'Price', 'Address', 'Rating', 'AccountRat', 'Open/Close'],
      propertyLabels: { // Add labels in Vietnamese
        'Name': 'Tên',
        'Price':'Giá',
        'Address': 'Địa chỉ',
        'Rating': 'Đánh giá',
        'AccountRat': 'Số đánh giá',
        'Open/Close': 'Giờ hoạt động'
      } 
    },
    { 
      id: 'resLayer', 
      label: 'Cơ sở ẩm thực', 
      source: '../../../../restaurant.geojson', 
      icon: markerFood, 
      nameProperty: 'Name',
      properties: ['Name', 'Address', 'Rating', 'AccountRating', 'Open/Close'],
      propertyLabels: { // Add labels in Vietnamese
        'Name': 'Tên',
        'Address': 'Địa chỉ',
        'Rating': 'Đánh giá',
        'AccountRating': 'Số đánh giá',
        'Open/Close': 'Giờ hoạt động'
      }   
    },
  ]
  const layerOptions2 = [
    { 
      id: 'huyenLayer', 
      label: 'Địa phận huyện', 
      type: 'line', 
      source: '../../../../huyen.geojson', 
      color: '#000000'
    },
    { 
      id: 'dpxaLayer', 
      label: 'Địa phận xã', 
      type: 'line', 
      source: '../../../../xaa.geojson', 
      color: '#000000'
    },
    { 
      id: 'duongboLayer', 
      label: 'Giao thông đường bộ', 
      type: 'line', 
      source: '../../../../giaothong.geojson', 
      color: '#FF0000'
    },
    { 
      id: 'gtduongthuyLayer', 
      label: 'Giao thông đường thủy', 
      type: 'line', 
      source: '../../../../duongthuyy.geojson', 
      color: '#0000FF'
    },
  ]
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      pitch: pitch,
      zoom: zoom,
      locale: {
        'NavigationControl.ZoomIn': 'Phóng to',
        'NavigationControl.ZoomOut': 'Thu nhỏ',
        'GeolocateControl.FindMyLocation': 'Vị trí của bạn',
        'NavigationControl.ResetBearing': 'Thay đổi hướng',
        'GeolocateControl.LocationNotAvailable': 'Vị trí không tồn tại'
      }
    });
    //NavigationControl MAPBOX
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-left')
  

    // Fetch GeoJSON data
    const fetchGeoJSONData = async () => {
      const response = await fetch('../../../../all.geojson');
      const data = await response.json();
      setGeojsonData(data);
    };
    fetchGeoJSONData();

    // GoongGeocoder
    const geocoder = new GoongGeocoder({
      accessToken: goongjs.accessToken,
      goongjs: goongjs,
            flyTo: true,
      placeholder: "Tìm kiếm",
      radius: 5000,
    });
    if (geojson) {
      console.log('GeoJSON data loaded:', geojson);
    }
    // Custom handling for input field
    geocoder.onAdd = function (map) {
      const container = GoongGeocoder.prototype.onAdd.call(this, map);
      const input = container.querySelector('.mapboxgl-ctrl-geocoder--input');

      input.addEventListener('input', function (event) {
        // Handle Unicode input properly
        this.value = event.target.value.normalize('NFC');
      });

      input.addEventListener('keydown', function (event) {
        // Handle backspace key
        if (event.key === 'Backspace') {
          event.preventDefault();
          const start = this.selectionStart;
          const end = this.selectionEnd;

          if (start === end) {
            this.value = this.value.slice(0, start - 1) + this.value.slice(end);
            this.selectionStart = this.selectionEnd = start - 1;
          } else {
            this.value = this.value.slice(0, start) + this.value.slice(end);
            this.selectionStart = this.selectionEnd = start;
          }
      }
    });
      return container;
    };
    // Handle Geocoder results
    geocoder.on('result', async (event) => {
      const query = event.result.place_name;
      const results = await handleSearch(query);
      console.log(results);
      // Handle the combined results from GeoJSON and GoongGeocoder
    });

    map.current.addControl(geocoder, 'top-right');

    const handleSearch = async (query) => {
      // Search in GeoJSON data
      const localResults = geojsonData.features.filter((feature) =>
        feature.properties.name.toLowerCase().includes(query.toLowerCase())
      );
  
      // Search using GoongGeocoder
      const goongResults = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=${goongjs.accessToken}&input=${query}`);
      const goongData = await goongResults.json();
  
      return [...localResults, ...goongData.predictions];
    }
   
  // SET DIRECTIONS
  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving-traffic',
    language: 'vi',
    geocoder: {
      language: 'vi'
    },
    interactive: false,  // OFF ENVET CLICK MAP
    placeholderDestination: "Điểm đến",
    placeholderOrigin: "Điểm đi",
    alternatives: true
  });  
  map.current.addControl(directions, 'top-right')
    // GET LOCATION MAPBOX
    const locationCurrent = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })
    
    map.current.addControl(locationCurrent,'top-left')
    // Measure distance
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
          line_string: true,
          trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_line_string'
  });
  
  map.current.addControl(draw, "top-left");

  map.current.on('draw.create', updateArea);
  map.current.on('draw.delete', updateArea);
  map.current.on('draw.update', updateArea);
  map.current.on('style.load', function() {
    // Modify the hover text for the line_string button
    const lineButton = document.querySelector('.mapbox-gl-draw_line'); // Adjust the selector based on the actual class name used by MapboxDraw
    if (lineButton) {
      lineButton.title = 'Vẽ đường thẳng'; // Your custom hover text
    }
    // Modify the hover text for the trash button
    const trashButton = document.querySelector('.mapbox-gl-draw_trash'); // Adjust the selector based on the actual class name used by MapboxDraw
    if (trashButton) {
      trashButton.title = 'Xóa đường thẳng'; // Your custom hover text
    }
  });
  function updateArea(e) {
      const data = draw.getAll();
      const answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
        const lineString = turf.lineString(data.features[0].geometry.coordinates); // Convert to LineString geometry
        const distance = turf.length(lineString, { units: 'kilometers' });
        const roundedDistance = Math.round(distance * 100) / 100;
        answer.innerHTML = `<p>Khoảng cách: ${roundedDistance} km</p>`; // In Vietnamese
      } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete') {
          alert('Click vào đây để vẽ đường thẳng tính khoảng cách'); // In Vietnamese
      }
    }
  }

    // SET LANGUAGE MAP STYLE
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js');
    const language = new MapboxLanguage({defaultLanguage: 'vi'})
    map.current.addControl(language)

    // Chang Style Map
    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
    input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.current.setStyle('mapbox://styles/mapbox/' + layerId);
    };}
    // Xử lý layer
    map.current.on('style.load', () => {
      layerOptions.forEach(layer => {
        map.current.addSource(layer.id, {
          type: 'geojson',
          data: layer.source,
        });
        if (layer.icon) { // Check if it's a marker layer
          map.current.loadImage(layer.icon, (error, image) => {
            if (error) throw error;
            map.current.addImage(layer.id, image); // Add custom image to map
            map.current.addLayer({
              id: layer.id,
              type: 'symbol', // Use 'symbol' type for markers
              source: layer.id,
              layout: {
                'icon-image': layer.id,
                'icon-size': 0.05, // Adjust size as needed
                'text-field': ['get', layer.nameProperty], // Display the name
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 1.25], // Adjust as needed for positioning
                'text-anchor': 'top',
                'visibility': activeLayers.includes(layer.id) ? 'visible' : 'none'
              }
            });
            // Add click event listener for popups
            map.current.on('click', layer.id, (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const properties = e.features[0].properties;
              // Create popup content
              let popupContent = '';
              layer.properties.forEach(prop => {
                if (properties[prop]) {
                  const label = layer.propertyLabels[prop] || prop; // Use label if defined, else use the property name
                  popupContent += `<div><strong>${label}:</strong> ${properties[prop]}</div>`;
                }
              });
              // Create and show the popup
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popupContent)
                .addTo(map.current);
            });
            // Add mouseenter and mouseleave events for cursor change
            map.current.on('mouseenter', layer.id, () => {
              map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', layer.id, () => {
              map.current.getCanvas().style.cursor = ''; // Reset to default
            });
          });
        } else { 
          // Handle non-marker layers (e.g., 'fill')
          map.current.addLayer({
            id: layer.id,
            type: activeLayers.includes(layer.id) ? 'circle' : 'fill',
            source: layer.id,
            paint: activeLayers.includes(layer.id) 
              ? { 'circle-radius': 5, 'circle-color': '#00c8ff' }
              : { 'fill-color': layer.color },
            layout: {
              visibility: activeLayers.includes(layer.id) ? 'visible' : 'none'
            }
          });
        }
      });
    });
    // Process layers
    map.current.on('style.load', () => {
      layerOptions2.forEach(layer => {
      map.current.addSource(layer.id, {
          type: 'geojson',
          data: layer.source,
        });

      if (layer.icon) { // Check if it's a marker layer
          map.current.loadImage(layer.icon, (error, image) => {
              if (error) throw error;
              map.current.addImage(layer.id, image); // Add custom image to map
              map.current.addLayer({
                  id: layer.id,
                  type: 'symbol', // Use 'symbol' type for markers
                  source: layer.id,
                  layout: {
                      'icon-image': layer.id,
                      'icon-size': 0.05, // Adjust size as needed
                      'text-field': ['get', layer.nameProperty], // Display the name
                      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                      'text-offset': [0, 1.25], // Adjust as needed for positioning
                      'text-anchor': 'top',
                      'visibility': activeLayers.includes(layer.id) ? 'visible' : 'none'
                  }
              });
              // Add click event listener for popups
              map.current.on('click', layer.id, (e) => {
                  const coordinates = e.features[0].geometry.coordinates.slice();
                  const properties = e.features[0].properties;
                  // Create popup content
                  let popupContent = '';
                  layer.properties.forEach(prop => {
                      if (properties[prop]) {
                          const label = layer.propertyLabels[prop] || prop; // Use label if defined, else use the property name
                          popupContent += `<div><strong>${label}:</strong> ${properties[prop]}</div>`;
                      }
                  });
                  // Create and show the popup
                  new mapboxgl.Popup()
                      .setLngLat(coordinates)
                      .setHTML(popupContent)
                      .addTo(map.current);
              });
              // Add mouseenter and mouseleave events for cursor change
              map.current.on('mouseenter', layer.id, () => {
                  map.current.getCanvas().style.cursor = 'pointer';
              });
              map.current.on('mouseleave', layer.id, () => {
                  map.current.getCanvas().style.cursor = ''; // Reset to default
              });
          });
      } else {
          // Handle non-marker layers (e.g., 'fill' and 'line')
          const layerType = layer.type === 'line' ? 'line' : 'fill'; // Determine the layer type
          const paint = layerType === 'line'
                ? { 'line-color': layer.color, 'line-width': 0.5 }
                : { 'fill-color': layer.color };
          if (layerType === 'line' && (layer.id === 'dpxaLayer')) {
            paint['line-dasharray'] = [2, 2]; // Adjust dash pattern as needed
          }
          map.current.addLayer({
              id: layer.id,
              type: layerType,
              source: layer.id,
              paint: paint,
              layout: {
                  visibility: activeLayers.includes(layer.id) ? 'visible' : 'none'
              }
          });

          // Add click event listener for popups for non-marker layers
          map.current.on('click', layer.id, (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const properties = e.features[0].properties;
              // Create popup content
              let popupContent = '';
              layer.properties.forEach(prop => {
                  if (properties[prop]) {
                      const label = layer.propertyLabels[prop] || prop; // Use label if defined, else use the property name
                      popupContent += `<div><strong>${label}:</strong> ${properties[prop]}</div>`;
                  }
              });
              // Create and show the popup
              new mapboxgl.Popup()
                  .setLngLat(coordinates)
                  .setHTML(popupContent)
                  .addTo(map.current);
          });
          // Add mouseenter and mouseleave events for cursor change
          map.current.on('mouseenter', layer.id, () => {
              map.current.getCanvas().style.cursor = 'pointer';
          });
          map.current.on('mouseleave', layer.id, () => {
              map.current.getCanvas().style.cursor = ''; // Reset to default
          });
      }
  });
});

    // OpenWeatherMap VIEWER MAP
      // Hàm để lấy dữ liệu thời tiết từ OpenWeatherMap 
      async function fetchWeatherData(lat, lon) {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?cities=true&lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=342e67e3841b908a0ed7851e768cf240`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
      }

      function addWeatherLayer(layerName, displayName, checked = false) {
        map.current.addSource(layerName, {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=342e67e3841b908a0ed7851e768cf240`,
          ],
          tileSize: 256,
        });
        map.current.addLayer({
          id: layerName,
          type: "raster",
          source: layerName,
          layout: { visibility: checked ? "visible" : "none" },
        });
      }
      

        
      // Thêm các lớp thời tiết khi bản đồ đã tải xong
        map.current.on("style.load", async () => {
        const { lat, lng } = map.current.getCenter();
        const weatherData = await fetchWeatherData(lat, lng);

        addWeatherLayer("temp", "Nhiệt độ", showTemp);
        addWeatherLayer("wind", "Gió", showWind);
        addWeatherLayer("rain", "Lượng mưa", showRain);
        addWeatherLayer("clouds", "Độ phủ mây", showClouds);
        // Cập nhật thời gian cho các layer
        setLayerTimestamps({
          temp: new Date(),
          wind: new Date(),
          rain: new Date(),
          clouds: new Date(),});
        });

        // Lấy phần tử DOM chứa bản đồ
      const mapElement = mapContainer.current;

      // Thêm các legend vào phần tử DOM chứa bản đồ
      const legendData = [
        { id: 'legend-temp', layer: 'temp', title: 'Nhiệt độ (°C)', colors: ['#0000ff', '#0064ff', '#00c8ff', '#00ff00', '#ffff00', '#ffc800', '#ff6400', '#ff0000', '#960000'], values: [-40, -30, -20, -10, 0, 10, 20, 30, 40] },
        { id: 'legend-wind', layer: 'wind', title: 'Gió (m/s)', colors: ['#90EE90', '#00FF7F', '#228B22', '#FFFF00', '#FFD700', '#FFA500', '#FF4500'], values: [0, 5, 10, 15, 20, 25, 30] },
        { id: 'legend-rain', layer: 'rain', title: 'Lượng mưa (mm)', colors: ['#f2f2f2', '#e6f2ff', '#bae4ff', '#73c2fb', '#2288f5', '#0050c8'], values: [0, 1, 5, 10, 20, 30] },
        { id: 'legend-clouds', layer: 'clouds', title: 'Mây (%)', colors: ['#ffffff', '#f2f2f2', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'], values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
      ];
      setLegends(legendData.map((data) => <Legend key={data.id} {...data} selectedLayer={selectedLayer} />));

      const mapElements = mapContainer.current;
      if (mapElements) {
        legends.forEach(legend => {
          mapElement.appendChild(legend);
      })}


    const rainButton = document.getElementById("rainButton");
    let rainLayersVisible = false;
    let apiData = null;
    const legendContainer = document.getElementById("legendContainer");
    const timestampContainer = document.getElementById("timestampContainer");
    
    map.current.on("load", () => {
      fetch("https://api.rainviewer.com/public/weather-maps.json")
        .then(res => res.json())
        .then(data => {
          apiData = data;

          // Add Rain Layers with Click Events
          apiData.radar.past.forEach(frame => {
            map.current.addLayer({
              id: `rainviewer_${frame.path}`,
              type: "raster",
              source: {
                type: "raster",
                tiles: [apiData.host + frame.path + '/256/{z}/{x}/{y}/2/1_1.png'],
                tileSize: 256
              },
              layout: { visibility: "none" }, // Initially hidden
              minzoom: 0,
              maxzoom: 12
            }, 'waterway-label');  // Add layer above 'waterway-label'

            map.current.on('click', `rainviewer_${frame.path}`, () => {
              const visibility = map.current.getLayoutProperty(`rainviewer_${frame.path}`, 'visibility');
              map.current.setLayoutProperty(`rainviewer_${frame.path}`, 'visibility', visibility === 'visible' ? 'none' : 'visible');

              // Update rainLayersVisible based on layer visibility
              rainLayersVisible = map.current.getStyle().layers.some(layer => layer.id.startsWith('rainviewer_') && layer.layout.visibility === 'visible');
              rainButton.textContent = rainLayersVisible ? "Hide Rain" : "Show Rain";

              // Update legend and timestamp only if layer is now visible and rain is on
              if (visibility !== 'visible' && rainLayersVisible) {
                createLegend();
                showTimestamp(frame);
              }
            });
          });

          // Rain Animation Logic
          let i = 0;
          let animationInterval = setInterval(() => {
            if (!rainLayersVisible) {
              // Clear the interval when rain is hidden
              clearInterval(animationInterval);
              return;
            }
            if (i > apiData.radar.past.length - 1) {
              i = 0; // Loop back to the beginning
            }
            apiData.radar.past.forEach((frame, index) => {
              map.current.setLayoutProperty(
                `rainviewer_${frame.path}`,
                "visibility",
                index === i || index === i - 1 ? "visible" : "none"
              );
            });
            if (i - 1 >= 0) {
              const frame = apiData.radar.past[i - 1];
              let opacity = 1;
              setTimeout(() => {
                const fadeInterval = setInterval(() => {
                  if (opacity <= 0 || !rainLayersVisible) {
                    clearInterval(fadeInterval);
                    return;
                  }
                  map.current.setPaintProperty(
                    `rainviewer_${frame.path}`,
                    "raster-opacity",
                    opacity
                  );
                  opacity -= 0.1;
                }, 50);
              }, 400);
            }
            i += 1;
          }, 2000);
        })
        .catch(console.error);
      })
      // Button Click Event
      rainButton.addEventListener("click", () => {
        rainLayersVisible = !rainLayersVisible;
    
        // Update all Rainviewer layers' visibility
        map.current.getStyle().layers.forEach(layer => {
          if (layer.id.startsWith("rainviewer_")) {
            map.current.setLayoutProperty(layer.id, "visibility", rainLayersVisible ? "visible" : "none");
          }
      });
      if (rainLayersVisible) {
        // createLegend();
        showTimestamp(apiData.radar.past[0]);
      } else {
        hideLegend();
        hideTimestamp();
      }
    });
    // Functions to create and hide legend and timestamp
    // const createLegend = () => {
    //   // Create and append legend elements
    //   if (!legendContainer.innerHTML) {
    //     const legend = document.createElement("div");
    //     legend.id = "rain-legend";
    //     legend.innerHTML = "<p>Legend content here</p>";
    //     legendContainer.appendChild(legend);
    //   }
    // };
    const showTimestamp = (frame) => {
      // Create and append timestamp elements
      if (!timestampContainer.innerHTML) {
        const timestamp = document.createElement("div");
        timestamp.id = "rain-timestamp";

        // Get the current time and add 30 minutes
        const currentTime = new Date();
        const timestampDate = new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes

        // Format the date
      const hours = timestampDate.getHours().toString().padStart(2, '0');
      const minutes = timestampDate.getMinutes().toString().padStart(2, '0');
      const second = timestampDate.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${second}`;
        timestamp.innerHTML = `<p>Thời gian dự báo: ${formattedTime}</p>`;
        timestampContainer.appendChild(timestamp);
      }
    };
    const hideLegend = () => {
      const legend = document.getElementById("rain-legend");
      if (legend) {
        legendContainer.removeChild(legend);
      }
    };
    const hideTimestamp = () => {
      const timestamp = document.getElementById("rain-timestamp");
      if (timestamp) {
        timestampContainer.removeChild(timestamp);
      }
    };
  }, [activeLayers,geojsonData,layerOptions2, layerOptions, legends, selectedLayer, showDropdown, showTemp, showWind, showRain, showClouds, lng, lat, zoom, pitch]);


    // Xử lý bật/tắt lớp thời tiết
    const handleLayerToggle = (layerId) => {
      const visibility = map.current.getLayoutProperty(layerId, "visibility");
      map.current.setLayoutProperty(
        layerId,
        "visibility",
        visibility === "visible" ? "none" : "visible"
      );
      setSelectedLayer(layerId);
      
       // Ẩn tất cả legend
    const legends = document.querySelectorAll('.legend');
    legends.forEach(legend => legend.style.display = 'none');
    // Hiển thị legend tương ứng
    const legend = document.getElementById(`legend-${layerId}`);
    if (legend && visibility === 'none') { // Chỉ hiển thị nếu layer được bật
      legend.style.display = 'block';
    }
    // Show timestap weather
    setLayerTimestamps((prevTimestamps) => ({
      ...prevTimestamps,
      [layerId]: new Date(),
    }));
    // thuy he layer
    setActiveLayers(prevLayers => 
      prevLayers.includes(layerId) 
        ? prevLayers.filter(id => id !== layerId) 
        : [...prevLayers, layerId]
    );
    };
  return (
    <div>
      <NavBar />
      <div ref={mapContainer} className='!h-screen absolute w-full'></div>
      <div id="calculated-area" className='absolute font-medium bottom-[15rem] p-1 rounded-md left-2 bg-black text-white'></div>
      <div className='absolute font-medium bottom-2 right-2 bg-white p-5'>
        <span className='font-bold'>Chú giải</span>
        <div className="space-y-2">
          
          <div className="flex items-center">
              <div className="w-6 h-0.5 bg-black"></div>
              <span className="ml-2 text-sm text-gray-700">Địa phận huyện</span>
          </div>

      
          <div className="flex items-center">
              <div className="w-6 h-0.5 border-t-2 border-black border-dashed"></div>
              <span className="ml-2 text-sm text-gray-700">Địa phận xã</span>
          </div>

          <div className="flex items-center">
              <div className="w-6 h-0.5 bg-red-600"></div>
              <span className="ml-2 text-sm text-gray-700">Giao thông đường bộ</span>
          </div>

   
          <div className="flex items-center">
              <div className="w-6 h-0.5 bg-blue-800"></div>
              <span className="ml-2 text-sm text-gray-700">Giao thông đường thủy</span>
          </div>

          <div className="flex items-center">
              <img src={travelMarker} alt="Marker 1" className="w-5 h-5 " />
              <span className="ml-2 text-sm text-gray-700">Địa điểm du lịch</span>
          </div>

          <div className="flex items-center">
              <img src={hotelMarker} alt="Marker 1" className="w-5 h-5" />
              <span className="ml-2 text-sm text-gray-700">Cơ sở lưu trú</span>
          </div>

          <div className="flex items-center">
              <img src={markerFood} alt="Marker 1" className="w-5 h-5" />
              <span className="ml-2 text-sm text-gray-700">Cơ sở ẩm thực</span>
          </div>

        </div>
      </div>
      <div id="geocoder" className="geocoder absolute right-0 pt-[1rem]"></div>
      <div className="flex absolute top-[17.5rem] left-2 items-center">
      <Button isIconOnly id='rainButton' title='Dự báo thời tiết' color="danger"  aria-label="Like" size='sm'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.293,18.293,11.586,16H10a1,1,0,0,1-.707-1.707l4-4a1,1,0,0,1,1.414,1.414L12.414,14H14a1,1,0,0,1,.707,1.707l-4,4a1,1,0,0,1-1.414-1.414ZM18,7a3.965,3.965,0,0,0-1.334.245,4.977,4.977,0,0,0-9.332,0A3.993,3.993,0,1,0,6,15H7.007a2.991,2.991,0,0,1,.872-2.121l4-4A3,3,0,0,1,16.236,13a2.959,2.959,0,0,1,.757,2H18a4,4,0,0,0,0-8Z"/></svg>
      </Button>
      </div>
      <div className='absolute bg-white bottom-0 w-52 left-10 bg-opacity-80 rounded-md text-center pb-0 shadow-md'>
        <div id="timestampContainer" ></div>
      </div>
  
      <div className='absolute pt-2 ml-12 mr-auto w-[34rem] p-2 bg-white bg-opacity-95 rounded-sm'>
        <h4 className='font-semibold text-center'>Lớp nền Google</h4>
        <div id="menu" className='flex justify-center'>
        <input id="streets-v12" type="radio" name="rtoggle" value="streets" />
        <label form="streets-v12" className='pl-1 mr-2'>Mặc định</label>
        <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite" />
        <label form="traffic-satellite-streets-v12" className='pl-1 mr-2'>Vệ tinh</label>        
        <input id="traffic-day-v2" type="radio" name="rtoggle" value="traffic" />
        <label form="traffic-day-v2" className='pl-1 mr-2'>Đường bộ</label>
        <div className='absolute top-[4.4rem] left-[24rem] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium '>
        <Dropdown className='mt-1 border-none rounded-md ml-8 w-1/2 shadow-lg '>
          <DropdownTrigger>
            <button className='inline-flex'> 
              Lớp du lịch
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownMenu className='text-left' variant="flat" selectionMode="multiple" closeOnSelect={false} >
            {layerOptions.map(layer => (
              <DropdownItem key={layer.id} onClick={() => handleLayerToggle(layer.id)}>
                {layer.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        </div>
      </div>
      <div className='absolute top-[4.4rem] left-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium '>
        <Dropdown className='mt-1 border-none rounded-md ml-8 w-1/2 shadow-lg '>
          <DropdownTrigger>
            <button className='inline-flex'> 
              Lớp nền địa lý
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownMenu className='text-left' variant="flat" selectionMode="multiple" closeOnSelect={false} >
            {layerOptions2.map(layer => (
              <DropdownItem key={layer.id} onClick={() => handleLayerToggle(layer.id)}>
                {layer.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        </div>
      <div className="absolute top-[4.4rem] left-[12rem]">
        <div className="relative inline-block">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Lớp thời tiết
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {showDropdown && (
            <div
              className="origin-top-right absolute left-0 mt-1 w-[11rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
             <div className="py-1" role="none">
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="temp">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={showTemp} onClick={() => handleLayerToggle("temp")} onChange={() => setShowTemp(!showTemp)} /> Nhiệt độ không khí
                </div>
              </a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="rain">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={showRain} onClick={() => handleLayerToggle("rain")} onChange={() => setShowRain(!showRain)} /> Lượng mưa
                </div>
              </a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="wind">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={showWind} onClick={() => handleLayerToggle("wind")} onChange={() => setShowWind(!showWind)} /> Tốc độ gió
                </div>
              </a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="clouds">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={showClouds} onClick={() => handleLayerToggle("clouds")} onChange={() => setShowClouds(!showClouds)} /> Độ phủ mây
                </div>
              </a>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Legend  title="Nhiệt độ (°C)" colors={['#0000ff', '#0064ff', '#00c8ff', '#00ff00', '#ffff00', '#ffc800', '#ff6400', '#ff0000', '#960000']} values={[-40, -30, -20, -10, 0, 10, 20, 30, 40]} layer="temp" selectedLayer={selectedLayer} timestamp={layerTimestamps[selectedLayer]} />
    <Legend title="Gió (m/s)" colors={['#90EE90', '#00FF7F', '#228B22', '#FFFF00', '#FFD700', '#FFA500', '#FF4500']} values={[0, 5, 10, 15, 20, 25, 30]} layer="wind" selectedLayer={selectedLayer} timestamp={layerTimestamps[selectedLayer]}/>
    <Legend title="Lượng mưa (mm)" colors={['#f2f2f2', '#e6f2ff', '#bae4ff', '#73c2fb', '#2288f5', '#0050c8']} values={[0, 1, 5, 10, 20, 30]} layer="rain" selectedLayer={selectedLayer} timestamp={layerTimestamps[selectedLayer]}/>
    <Legend title="Mây (%)" colors={['#ffffff', '#f2f2f2', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000']} values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} layer="clouds" selectedLayer={selectedLayer} timestamp={layerTimestamps[selectedLayer]}/>
  </div>
  );
}

export default HomeTravel