import { useEffect, useRef, useState } from "react";
import { Player } from "../instances/Player";

import AppartmentsBack_1 from "../assets/apartments/appartments_back_1.png";
import AppartmentsFront_1 from "../assets/apartments/appartments_front_1.png";
import HeroSpritesheet from "../assets/characters/hero.png";
import useGameLoop from "../hooks/useGameLoop";
import useInputHandler from "../hooks/useInputHandler";
import { World } from "../instances/World";

const HeroApartments = () => {
    const [player, setPlayer] = useState();
    const [world, setWorld] = useState();

    const [frontSprite, setFrontSprite] = useState();
    const [backSprite, setBackSprite] = useState();
    
    const canvasRef = useRef();
    const { context, ...gameLoop } = useGameLoop(() => {
        world.drawFullfilledImage(backSprite, canvasRef.current.height);
        player.update();
        world.drawFullfilledImage(frontSprite, canvasRef.current.height);
    }, canvasRef);

    useInputHandler(player, world);

    useEffect(() => {
        if (!context) return;

        const w = new World({ context });
        setWorld(w);

        const heroSprite = new Image();
        heroSprite.src = HeroSpritesheet;
        heroSprite.onload = () => {         
            const pl = new Player({ context, sprite: heroSprite, world });
            setPlayer(pl);

            const appartFront = new Image();
            appartFront.src = AppartmentsFront_1;
            appartFront.onload = () => {
                setFrontSprite(appartFront);

                const appartBack = new Image();
                appartBack.src = AppartmentsBack_1;
                appartBack.onload = () => {
                    setBackSprite(appartBack);
    
                    // Start game loop
                    gameLoop.start(); 
                }; 
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