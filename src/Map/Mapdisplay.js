import React, {Component} from "react";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import 'ol/ol.css'
import {fromLonLat} from "ol/proj";
import {Fill, Icon, Stroke, Style} from 'ol/style';
import {Point, LineString} from 'ol/geom';
import location_pin from "../resources/location_pin.png"

import {
    Pointer as PointerInteraction,
    defaults as defaultInteractions,
} from 'ol/interaction';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Feature from "ol/Feature";

const FixedCoords = {
    toronto: [-79.3871, 43.6426],
    west_bound: [-79.79959268124549, 43.45345748942859],
    east_bound: [-78.84378213239296, 44.251140933010575]
}

class PublicMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: fromLonLat(FixedCoords.toronto),
            zoom: 10,
            bounds: fromLonLat(FixedCoords.west_bound).concat(fromLonLat(FixedCoords.east_bound)),
            pointCoords: fromLonLat(FixedCoords.toronto)
        };

        let pointFeature = new Feature(new Point(this.state.pointCoords));

        this.olmap = new Map({
            target: null,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [pointFeature]
                    }),
                    style: new Style({
                        image: new Icon({
                            anchor: [0.5, 0],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            anchorOrigin: 'bottom-right',
                            opacity: 0.95,
                            scale:0.05,
                            src: location_pin,
                        }), stroke: new Stroke({
                            width: 3,
                            color: [255, 0, 0, 1],
                        }), fill: new Fill({
                            color: [0, 0, 255, 0.6],
                        }),
                    })
                })
            ],
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom,
                // extent: this.state.bounds
            }),
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");
        // this.setState({pointer: new Feature(new Point(this.state.pointerCoords))})
        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({center, zoom});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    userAction() {
        this.setState({center: [546000, 6868000], zoom: 5});
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
            <div id="map" style={{width: "100%", height: "600px"}}>
                <button>try me</button>
            </div>
        );
    }
}

export default PublicMap;
