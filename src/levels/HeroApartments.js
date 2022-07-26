import { useEffect, useRef, useState } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
import { Player } from "../instances/Player";

import HeroSpritesheet from "../assets/characters/hero.png";
import useGameLoop from "../hooks/useGameLoop";


const HeroApartments = () => {
    const [player, setPlayer] = useState();
    
    const canvasRef = useRef();
    const context = useCanvasContext(canvasRef);
    const gameLoop = useGameLoop(() => {
        player.update();
    }, context, canvasRef);

    useEffect(() => {
        if (!context) return;

        // Instantiate a player
        const heroSprite = new Image();
        heroSprite.src = HeroSpritesheet;
        heroSprite.onload = () => {
            const pl = new Player({ context, sprite: heroSprite });
            setPlayer(pl);

            // Start game loop
            gameLoop.start(); 
        };
    }, [context]);


    return	(
        <>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
        </>
    );
};

export default HeroApartments;