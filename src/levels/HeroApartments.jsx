import { useEffect, useRef, useState } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
import { Player } from "../instances/Player";

import AppartmentsFront_1 from "../assets/apartments/appartments_front_1.png";
import HeroSpritesheet from "../assets/characters/hero.png";
import { normalize } from "../helpers/common";
import useGameLoop from "../hooks/useGameLoop";
import useInputHandler from "../hooks/useInputHandler";

const HeroApartments = () => {
    const [player, setPlayer] = useState();
    const [frontSprite, setFrontSprite] = useState();
    
    const canvasRef = useRef();
    const context = useCanvasContext(canvasRef);
    const gameLoop = useGameLoop(() => {
        player.update();
        context.drawImage(
            frontSprite, 
            0, 
            canvasRef.current.height - normalize(70), 
            normalize(48), 
            normalize(70)
        );
    }, context, canvasRef);
    useInputHandler(player);

    useEffect(() => {
        if (!context) return;

        // Instantiate a player
        const heroSprite = new Image();
        heroSprite.src = HeroSpritesheet;
        heroSprite.onload = () => {         
            const pl = new Player({ context, sprite: heroSprite });
            setPlayer(pl);

            const appartFront = new Image();
            appartFront.src = AppartmentsFront_1;
            appartFront.onload = () => {
                setFrontSprite(appartFront);

                // Start game loop
                gameLoop.start(); 
            };            
        };
    }, [context]);


    return	(
        <>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
        </>
    );
};

export default HeroApartments;