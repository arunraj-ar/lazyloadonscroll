import "./App.css";
import { LazyLoader } from "./components/LazyLoader";
import LazyLoaderClass from "./components/LazyLoaderClass";

function App() {
  return (
    <>
      <div className="appWrapper">
        <LazyLoader />
        <LazyLoaderClass />
      </div>
    </>
  );
}

export default App;
