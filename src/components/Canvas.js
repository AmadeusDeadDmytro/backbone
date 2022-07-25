import { useEffect, useRef, useState } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
import { Player } from "../instances/Player";

import HeroSpritesheet from "../assets/characters/hero.png";

const FPS = 1000 / 30;

const Canvas = () => {
    const [player, setPlayer] = useState();
    const [gameReady, setGameReady] = useState(false);
    
    const canvasRef = useRef();
    const context = useCanvasContext(canvasRef);

    const drawFrame = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);	 
         
        player.update();

        setTimeout(() => {
            window.requestAnimationFrame(drawFrame);
        }, FPS);        
    };

    useEffect(() => {
        if (context) {
            // Instantiate a player
            const heroSprite = new Image();
            heroSprite.src = HeroSpritesheet;
            heroSprite.onload = () => {
                const pl = new Player({ context, sprite: heroSprite });
                setPlayer(pl);

                // TODO: Start a game loop when load all sprites, not only one
                // Start game loop
                setGameReady(true);   
            };
        }
    }, [context]);

    useEffect(() => {
        if (gameReady) {
            setTimeout(() => {
                window.requestAnimationFrame(drawFrame);
            }, FPS);
        }
    }, [gameReady]);

    return	(
        <>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
        </>
    );
};

export default Canvas;