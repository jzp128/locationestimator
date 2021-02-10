import React, {Component} from "react";
import {Pannellum} from "pannellum-react";
import testpan from "../resources/testcntower4 1.png"
import "./PhotoViewer.css"

class PhotoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null
        }
    }

    render() {
        return (
            <div className="PhotoContainer">
                <Pannellum
                    width="100%"
                    height="100%"
                    image={testpan}
                    pitch={10}
                    yaw={180}
                    hfov={1}
                    autoLoad10
                    showZoomCtrl={false}
                    onLoad={() => {
                        console.log("panorama loaded");
                    }}
                >
                </Pannellum>
            </div>
        );
    }
}

export default PhotoViewer;