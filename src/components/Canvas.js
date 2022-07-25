import { useEffect, useRef } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
import { Player } from "../instances/Player";

const Canvas = () => {
    const canvasRef = useRef();
    const context = useCanvasContext(canvasRef);

    const draw = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);			
        const player = new Player({ context });
    };

    useEffect(() => {
        if (context) {
            window.addEventListener("resize", draw);
            draw();
        }
		
        return () => {
            window.removeEventListener("resize", draw);
        };
    }, [context, window]);

    return	<canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default Canvas;