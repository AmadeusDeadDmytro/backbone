import { useEffect, useState } from "react";

const useCanvasContext = (canvasRef) => {
    const [context, setContext] = useState(null);

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            setContext(ctx);
        }
    }, [canvasRef]);

    return context;
};

export default useCanvasContext;