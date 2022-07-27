import { useEffect, useState } from "react";
import useCanvasContext from "./useCanvasContext";

const FPS = 1000 / 30;
const useGameLoop = (levelBody, canvasRef) => {
    const [gameReady, setGameReady] = useState(false);
    const context = useCanvasContext(canvasRef);

    const start = () => setGameReady(true);

    const drawFrame = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);	          
        levelBody();
        setTimeout(() => {
            window.requestAnimationFrame(drawFrame);
        }, FPS);        
    };
	
    useEffect(() => {
        if (gameReady) {
            window.requestAnimationFrame(drawFrame);
        }
    }, [gameReady]);

    return { start, context };
};

export default useGameLoop;