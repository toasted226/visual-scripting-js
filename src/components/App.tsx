import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import "../styles/App.css";

function App() {
    return (
        <div className="container">
            <Navbar />
            <Sidebar />
            <Canvas />
        </div>
    );
}

export default App;
