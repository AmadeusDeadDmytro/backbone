import { useEffect, useState } from "react";
import useCanvasContext from "./useCanvasContext";

const useGameLoop = (update, canvasRef, isStop = false) => {
    const [gameReady, setGameReady] = useState(false);

    const context = useCanvasContext(canvasRef);

    const start = () => setGameReady(true);

    const drawFrame = (timeStamp, oldTimeStamp = 0) => {    
        const secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);	          
        update(secondsPassed);
        if (!isStop) {
            window.requestAnimationFrame((t) => {
                drawFrame(t, oldTimeStamp);
            });      
        } 
    };
	
    useEffect(() => {
        if (gameReady) {
            window.requestAnimationFrame(drawFrame);
        }
    }, [gameReady]);

    return { start, context };
};

export default useGameLoop;