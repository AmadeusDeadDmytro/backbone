import { useEffect, useState } from "react";

const useCanvasContext = (canvasRef) => {
    const [context, setContext] = useState(null);

    useEffect(() => {
        if (canvasRef) {
            setContext(canvasRef.current.getContext("2d"));
        }
    }, [canvasRef]);

    return context;
};

export default useCanvasContext;