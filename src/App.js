import { useEffect, useRef } from "react";
import useCanvasContext from "./hooks/useCanvasContext";

const App = () => {
    const canvasRef = useRef();
    const context = useCanvasContext(canvasRef);

    useEffect(() => {
        if (context) {
            context.fillStyle = "darkgray";
            context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }, [context]);

    return (
        <div>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
};

export default App;
