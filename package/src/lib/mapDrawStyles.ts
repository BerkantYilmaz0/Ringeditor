export const drawStyles: any = [
    // ACTIVE (being drawn)
    // line stroke
    {
        "id": "gl-draw-line-inactive",
        "type": "line",
        "filter": ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#3bb2d0",
            "line-width": 2
        }
    },
    {
        "id": "gl-draw-line-active",
        "type": "line",
        "filter": ["all", ["==", "active", "true"], ["==", "$type", "LineString"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#fbb03b",
            "line-dasharray": ["literal", [0.2, 2]],
            "line-width": 2
        }
    },
    // polygon fill
    {
        "id": "gl-draw-polygon-fill-inactive",
        "type": "fill",
        "filter": ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "paint": {
            "fill-color": "#3bb2d0",
            "fill-outline-color": "#3bb2d0",
            "fill-opacity": 0.1
        }
    },
    {
        "id": "gl-draw-polygon-fill-active",
        "type": "fill",
        "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        "paint": {
            "fill-color": "#fbb03b",
            "fill-outline-color": "#fbb03b",
            "fill-opacity": 0.1
        }
    },
    // polygon mid points
    {
        "id": "gl-draw-polygon-midpoint",
        "type": "circle",
        "filter": ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
        "paint": {
            "circle-radius": 3,
            "circle-color": "#fbb03b"
        }
    },
    // polygon outline stroke
    {
        "id": "gl-draw-polygon-stroke-inactive",
        "type": "line",
        "filter": ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#3bb2d0",
            "line-width": 2
        }
    },
    {
        "id": "gl-draw-polygon-stroke-active",
        "type": "line",
        "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#fbb03b",
            "line-dasharray": ["literal", [0.2, 2]],
            "line-width": 2
        }
    },
    // vertex point halos
    {
        "id": "gl-draw-point-point-stroke-inactive",
        "type": "circle",
        "filter": ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 5,
            "circle-opacity": 0,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff"
        }
    },
    {
        "id": "gl-draw-point-point-stroke-active",
        "type": "circle",
        "filter": ["all", ["==", "active", "true"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 7,
            "circle-opacity": 0,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff"
        }
    },
    // vertex points
    {
        "id": "gl-draw-point-inactive",
        "type": "circle",
        "filter": ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 3,
            "circle-color": "#3bb2d0"
        }
    },
    {
        "id": "gl-draw-point-active",
        "type": "circle",
        "filter": ["all", ["==", "active", "true"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 5,
            "circle-color": "#fbb03b"
        }
    },
    // INACTIVE (static, existing features)
    {
        "id": "gl-draw-line-static",
        "type": "line",
        "filter": ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 3
        }
    },
    {
        "id": "gl-draw-polygon-fill-static",
        "type": "fill",
        "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        "paint": {
            "fill-color": "#000",
            "fill-outline-color": "#000",
            "fill-opacity": 0.1
        }
    },
    {
        "id": "gl-draw-polygon-stroke-static",
        "type": "line",
        "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 3
        }
    }
];
