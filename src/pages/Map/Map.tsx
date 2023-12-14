import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import press from "./../../assets/icons/press.svg";
import zoom from "./../../assets/icons/zoom.svg";
// import { Modal } from "../../components/Modal/Modal";
import { Canvas } from "../../components/Canvas/Canvas";
import "./Map.scss";
// import { data, data2, data3, data4 } from "./data";
import { data3 } from "./data";
import { MapService } from "../../sevices/map.service";
import { Button } from "../../components/Button/Button";

export const Map = () => {
  const [longClickMarker, setLongClickMarker] = useState<any | null>(null);
  // const [showModal, setShowModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  // const [typeMarker, setTypeMarker] = useState("");
  // const [img, setImg] = useState("");
  // const arr: Array<string> = [];

  const tooltip1 = useRef<HTMLDivElement>(null);
  const tooltip2 = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [lnglat, setLngLat] = useState<any>([]);

  const fetchMarkers = async () => {
    try {
      const markersData = await MapService.get();
      setMarkers(markersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logFunc = document.querySelector(".log_button");
  const logButton = document.querySelector(".log_button button");
  logButton?.addEventListener("click", () => {
    if (logFunc?.classList.contains("logout")) {
      localStorage.clear();
      sessionStorage.clear();
      location.replace("/sign-in");
    } else {
      location.replace("/sign-in");
    }
  });
  useEffect(() => {
    // Fetch markers data and update state

    fetchMarkers();
  }, []);

  useEffect(() => {
    // mapboxgl token
    mapboxgl.accessToken =
      "pk.eyJ1Ijoieml5b2RpbGxhZGV2IiwiYSI6ImNsbnN6dnExejIxOHAya29kNTBxaWhteDkifQ.uoYam7HhtKLenz823udziw";

    // default data

    // map parameters
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-65.017, -16.457],
      zoom: 10,
    });

    // pulsing dot for user for knowing where he/she is

    const size = 200;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      context: null as CanvasRenderingContext2D | null,

      onAdd: function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        if (context !== null) {
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
          context.fill();

          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // Render label
          const label = "You";
          context.font = "20px Arial";
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.textAlign = "center";
          context.fillText(label, this.width / 2, this.height - 40);

          const imageData = context.getImageData(0, 0, this.width, this.height);
          this.data = new Uint8Array(imageData.data.buffer);

          map.triggerRepaint();

          return true;
        }
      },
    };

    // finding user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.on("load", () => {
            map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

            map.addSource("dot-point", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [longitude, latitude],
                    },
                  },
                ],
              },
            });
            map.addLayer({
              id: "layer-with-pulsing-dot",
              type: "symbol",
              source: "dot-point",
              layout: {
                "icon-image": "pulsing-dot",
              },
            });
          });
          map.flyTo({
            center: [longitude, latitude],
            zoom: 10,
            speed: 1.2,
            curve: 1.42,
            easing: (t: number) => t,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }

    // settting  markers

    markers?.map((marker: any) => {
      const el = document.createElement("div");
      el.className = "long-click-marker";
      el.innerHTML = `
            <svg
              id="marker"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="58"
              viewBox="0 0 40 58"
            >
              <circle cx="20" cy="55" r="3" fill="#FF2E00"></circle>
              <path
                d="M20,48,34.142,33.521a19.531,19.531,0,0,0,5.474-10.054,19.315,19.315,0,0,0-1.138-11.345,19.725,19.725,0,0,0-7.367-8.813,20.309,20.309,0,0,0-22.222,0,19.725,19.725,0,0,0-7.367,8.813A19.315,19.315,0,0,0,.384,23.467,19.531,19.531,0,0,0,5.858,33.521Z"
                fill="#FF2E00"
              ></path>
              <path
                transform="translate(12.5,12.5)"
                fill="#ffffff"
                id="path4133"
                d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703 C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"
              ></path>
            </svg>`;
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      // pop up settings
      const popup = new mapboxgl.Popup({
        // closeButton: false,
        closeOnClick: false,
      });

      // popup on hover
      el.addEventListener("mouseenter", () => {
        popup
          .setLngLat(marker.attributes.coordinates.split(":"))
          .setHTML(
            `
          <img class="popup_img" src="http://localhost:1337${
            marker.attributes.image.data[0].attributes.url
          }" alt="img"/> 
          <h2 class="popup_title">${marker.attributes.title}</h2>
          <p class="popup_desc">${marker.attributes.description}</p>
 <div class="marker_bottom">
 <div class="popup_time">
 <img class="clock_icon" src="https://cdn.icon-icons.com/icons2/3863/PNG/512/timer_start_icon_241289.png" alt="clock"/>
 <span>${
   new Date().getFullYear() ==
     new Date(marker.attributes.createdAt).getFullYear() &&
   new Date().getMonth() == new Date(marker.attributes.createdAt).getMonth() &&
   new Date().getDate() - new Date(marker.attributes.createdAt).getDate() > 0
     ? new Date().getDate() -
       new Date(marker.attributes.createdAt).getDate() +
       " days ago"
     : new Date().getFullYear() ==
         new Date(marker.attributes.createdAt).getFullYear() &&
       new Date().getMonth() ==
         new Date(marker.attributes.createdAt).getMonth() &&
       new Date().getDate() - new Date(marker.attributes.createdAt).getDate() ==
         0
     ? "Today"
     : new Date().getFullYear() ==
         new Date(marker.attributes.createdAt).getFullYear() &&
       new Date().getMonth() !=
         new Date(marker.attributes.createdAt).getMonth() &&
       new Date().getMonth() -
         new Date(marker.attributes.createdAt).getMonth() >
         0
     ? new Date().getMonth() -
       new Date(marker.attributes.createdAt).getMonth() +
       " month ago"
     : new Date().getFullYear() -
       new Date(marker.attributes.createdAt).getFullYear() +
       " year ago"
 }</span>
 </div>
 <div class="rating_imgs">
     <span>★${marker.attributes.rating}</span>
 </div>
 </div>
          `
          )
          .addTo(map);
      });

      // removing popup
      el.addEventListener("mouseleave", () => {
        popup.remove();
      });

      // adding popup on click

      // el.addEventListener("click", () => {
      //   popup
      //     .setLngLat(marker.coordinates.split(":"))
      //     .setHTML("<h1>Hello World!</h1>")
      //     .addTo(map);
      // });

      new mapboxgl.Marker(el)
        .setLngLat(marker.attributes.coordinates.split(":"))
        .addTo(map);

      return null;
    });

    // long click functionality for desktop devices
    let timeoutId: number | undefined;

    function handleMouseDown(e: any) {
      timeoutId = setTimeout(() => {
        const lngLat = e.lngLat.toArray();
        setLngLat(lngLat);

        addLongClickMarker(lngLat);
      }, 1150) as unknown as number;
    }

    function handleMouseUp() {
      clearTimeout(timeoutId);
    }

    // long click functionality for mobile devices

    function handleTouchStart(e: any) {
      timeoutId = setTimeout(() => {
        const lngLat = e.lngLat.toArray();

        setLngLat(lngLat);
        addLongClickMarker(lngLat);
      }, 1150) as unknown as number;
    }

    function handleTouchEnd() {
      clearTimeout(timeoutId);
    }

    // add marker function
    function addLongClickMarker(lngLat: number[]) {
      const zoom = map.getZoom();

      if (longClickMarker || zoom < 14) {
        longClickMarker.remove();
      }

      const el = document.createElement("div");
      el.className = "long-click-marker";
      el.innerHTML = `
        <svg
          id="marker"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="58"
          viewBox="0 0 40 58"
        >
          <circle cx="20" cy="55" r="3" fill="#FF2E00"></circle>
          <path
            d="M20,48,34.142,33.521a19.531,19.531,0,0,0,5.474-10.054,19.315,19.315,0,0,0-1.138-11.345,19.725,19.725,0,0,0-7.367-8.813,20.309,20.309,0,0,0-22.222,0,19.725,19.725,0,0,0-7.367,8.813A19.315,19.315,0,0,0,.384,23.467,19.531,19.531,0,0,0,5.858,33.521Z"
            fill="#FF2E00"
          ></path>
          <path
            transform="translate(12.5,12.5)"
            fill="#ffffff"
            id="path4133"
            d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703 C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"
          ></path>
        </svg>`;
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el).setLngLat(lngLat).addTo(map);

      map.flyTo({
        center: [lngLat[0], lngLat[1] - 0.001],
        zoom: 14,
        speed: 1.2,
        curve: 1.42,
        easing: (t: number) => t,
      });

      setLongClickMarker(marker);
      // setShowModal(true);
      setShowCanvas(true);
    }

    // zoom event

    map.on("zoom", () => {
      const zoom = map.getZoom();
      if (zoom < 14) {
        if (tooltip2.current) {
          tooltip2.current.style.display = "flex";
        }
        if (tooltip1.current) {
          tooltip1.current.style.display = "none";
        }
      } else {
        if (tooltip1.current) {
          tooltip1.current.style.display = "flex";
        }
        if (tooltip2.current) {
          tooltip2.current.style.display = "none";
        }
      }
    });

    map.on("mousedown", handleMouseDown);
    map.on("mouseup", handleMouseUp);
    // for mobile
    map.on("touchstart", handleTouchStart);
    map.on("touchend", handleTouchEnd);

    // cursor for animated dot of user's location
    map.on("mouseenter", "layer-with-pulsing-dot", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "layer-with-pulsing-dot", () => {
      map.getCanvas().style.cursor = "";
    });

    // blocking road
    // function generateNavigationRoute(start: number[], end: number[], map: any) {
    //   const queryParams: {
    //     waypoints: { coordinates: number[] }[];
    //     exclude: string;
    //     alternatives: boolean;
    //   } = {
    //     waypoints: [{ coordinates: start }, { coordinates: end }],
    //     exclude: "toll",
    //     alternatives: false,
    //   };

    //   // Add the markersToAvoid as additional waypoints to avoid
    //   for (const markerCoords of geojson.features) {
    //     const coordinates: number[] = markerCoords.geometry.coordinates;

    //     if (Array.isArray(coordinates) && coordinates.length >= 2) {
    //       queryParams.waypoints.push({
    //         coordinates,
    //       });
    //     }
    //   }

    //   // Convert the waypoints array to a comma-separated list
    //   const waypointsString: string = queryParams.waypoints
    //     .map((wp) => wp.coordinates.join(","))
    //     .join(";");
    //   console.log(waypointsString);

    //   // Make a request to the Directions API
    //   // const url: string = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${waypointsString}?exclude=${queryParams.exclude}&alternatives=${queryParams.alternatives}&access_token=pk.eyJ1Ijoieml5b2RpbGxhZGV2IiwiYSI6ImNsbnN6dnExejIxOHAya29kNTBxaWhteDkifQ.uoYam7HhtKLenz823udziw`;
    //   const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/69.5883282,42.3146962;69.2787079,41.3123363?exclude=toll&alternatives=false&access_token=pk.eyJ1Ijoieml5b2RpbGxhZGV2IiwiYSI6ImNsbnN6dnExejIxOHAya29kNTBxaWhteDkifQ.uoYam7HhtKLenz823udziw`;
    //   // 69.5883282,42.3146962;69.2787079,41.3123363;-66.324462,-16.024695;-61.21582,-15.971891;-63.292236,-18.281518

    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);

    //       // Remove the existing navigation route layer, if it exists
    //       if (map.getSource("navigation-route")) {
    //         map.removeLayer("navigation-route");
    //       }

    //       // Create a new navigation route layer
    //       const route: any = data.routes[0].geometry;
    //       map.addSource("navigation-route", {
    //         type: "geojson",
    //         data: {
    //           type: "Feature",
    //           geometry: route,
    //         },
    //       });
    //       map.addLayer({
    //         id: "navigation-route",
    //         type: "line",
    //         source: "navigation-route",
    //         paint: {
    //           "line-color": "#d95700",
    //           "line-width": 3,
    //         },
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("Error:", error);
    //     });
    // }

    // // Function to handle user input and generate navigation route
    // function handleSearch() {
    //   setTimeout(() => {
    //     const startInput: HTMLInputElement = document.querySelectorAll(
    //       ".mapboxgl-ctrl-geocoder input"
    //     )[0] as HTMLInputElement;
    //     const endInput: HTMLInputElement = document.querySelectorAll(
    //       ".mapboxgl-ctrl-geocoder input"
    //     )[1] as HTMLInputElement;
    //     // Get the start and end values from user input
    //     const startValue: string = startInput.value;
    //     const endValue: string = endInput.value;
    //     geocode(startValue)
    //       .then((startCoords: { longitude: number; latitude: number }) => {
    //         return geocode(endValue).then(
    //           (endCoords: { longitude: number; latitude: number }) => {
    //             const start: number[] = [
    //               startCoords.longitude,
    //               startCoords.latitude,
    //             ];
    //             const end: number[] = [endCoords.longitude, endCoords.latitude];
    //             generateNavigationRoute(start, end, map);
    //           }
    //         );
    //       })
    //       .catch((error: Error) => {
    //         console.log("Geocoding Error:", error);
    //       });
    //   }, 1000);
    // }

    // // Function to convert address to coordinates using a geocoding service
    // async function geocode(address: string) {
    //   const geocoderUrl =
    //     await `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    //       address
    //     )}.json?access_token=pk.eyJ1Ijoieml5b2RpbGxhZGV2IiwiYSI6ImNsbnN6dnExejIxOHAya29kNTBxaWhteDkifQ.uoYam7HhtKLenz823udziw`;

    //   return fetch(geocoderUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const features = data.features;
    //       if (features.length > 0) {
    //         const { center } = features[0];
    //         const longitude = center[0];
    //         const latitude = center[1];
    //         return { longitude, latitude };
    //       } else {
    //         throw new Error("No results found");
    //       }
    //     });
    // }

    // setTimeout(() => {
    //   const startInput = document.querySelectorAll(
    //     ".mapboxgl-ctrl-geocoder input"
    //   )[0];
    //   const endInput = document.querySelectorAll(
    //     ".mapboxgl-ctrl-geocoder input"
    //   )[1];
    //   startInput.addEventListener("input", () => {
    //     handleSearch();
    //   });
    //   endInput.addEventListener("input", () => {
    //     handleSearch();
    //   });
    // }, 1000);

    // controls

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        interactive: false,
      }),
      "top-left"
    );

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");
    map.addControl(new mapboxgl.ScaleControl(), "bottom-left");

    const transportType = document.querySelectorAll(
      ".mapbox-directions-clearfix label"
    );

    transportType[0].innerHTML = "🚦Traffic";
    transportType[1].innerHTML = "🚘Driving";
    transportType[2].innerHTML = "🚶‍♂️Walking";
    transportType[3].innerHTML = "🚴‍♀️Cycling";

    return () => map.remove();
  }, [markers]);

  // removemarker
  const removeMarker = () => {
    if (longClickMarker) {
      longClickMarker.remove();
      setLongClickMarker(null);
    }
  };

  return (
    <>
      <div
        id="map"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <div className="tooltip" ref={tooltip1}>
        <img
          src={press}
          alt="press"
          style={{ width: "24px", height: "24px" }}
        />
        <span>Long press to mark a place</span>
      </div>
      <div className="tooltip" ref={tooltip2}>
        <img src={zoom} alt="press" style={{ width: "24px", height: "24px" }} />
        <span>Zoom in to mark a place</span>
      </div>
      {/* {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          setTypeMarker={setTypeMarker}
          setShowCanvas={setShowCanvas}
          removeMarker={removeMarker}
        />
      ) : (
        ""
      )} */}

      {showCanvas ? (
        <Canvas
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
          removeMarker={removeMarker}
          data={data3}
          onSubmit={fetchMarkers}
          lnglat={lnglat}
        />
      ) : (
        ""
      )}
      {localStorage.getItem("token") || sessionStorage.getItem("token") ? (
        <div className="log_button logout">
          <Button>Logout</Button>
        </div>
      ) : (
        <div className="log_button login">
          <Button>Login</Button>
        </div>
      )}
    </>
  );
};
