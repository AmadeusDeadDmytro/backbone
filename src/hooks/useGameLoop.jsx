import { useEffect, useState } from "react";

const FPS = 1000 / 30;
const useGameLoop = (levelBody, context, canvasRef) => {
    const [gameReady, setGameReady] = useState(false);

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
            setTimeout(() => {
                window.requestAnimationFrame(drawFrame);
            }, FPS);
        }
    }, [gameReady]);

    return { start };
};

export default useGameLoop;