import { useEffect } from "react";

const useInputHandler = (player) => {
    useEffect(() => {
        if (!player) return;

        window.addEventListener("keydown", handleInputDown);
        window.addEventListener("keyup", handleInputUp);
        return () => {
            window.removeEventListener("keydown", handleInputDown);
            window.removeEventListener("keyup", handleInputUp);
        };
    }, [player]);

    const handleInputDown = (e) => {
        e.preventDefault();

        switch(e.key) {
        case "a":
            player.startMove(false);
            break;
        case "d":
            player.startMove(true);
            break;
        default:
            return;
        }
    };

    const handleInputUp = (e) => {
        e.preventDefault();
        
        switch(e.key) {
        case "a":
        case "d":
            player.stopMove();
            break;
        default:
            return;
        }
    };
};

export default useInputHandler;