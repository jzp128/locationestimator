import logo from './logo.svg';
import './App.css';
import './Map/Mapdisplay'

import Mapdisplay from "./Map/Mapdisplay";
import PhotoViewer from "./PanoramicViewer/PhotoViewer";

function App() {


    return (
        <div className="App">
            <PhotoViewer/>
            {/*<Mapdisplay/>*/}
        </div>
    );
}

export default App;
