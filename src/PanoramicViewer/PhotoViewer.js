import React, {Component} from "react";
import {Pannellum} from "pannellum-react";
import testpan from "../resources/testcntower4 1.png"

class PhotoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null
        }
    }

    render() {
        return (
            <div>
                <Pannellum
                    width="100%"
                    height="500px"
                    image={testpan}
                    pitch={10}
                    yaw={180}
                    hfov={110}
                    autoLoad
                    showZoomCtrl={false}
                    onLoad={() => {
                        console.log("panorama loaded");
                    }}
                >
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={31}
                        yaw={150}
                        handleClick={(evt, name) => console.log(name)}
                        name="hs1"
                    />
                </Pannellum>
            </div>
        );
    }
}

export default PhotoViewer;