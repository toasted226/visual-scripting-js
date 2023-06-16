import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./App.css";

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
