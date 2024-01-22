import React, { useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

export default function Room() {
    const params = useParams();
    useEffect(() => {
        console.log(params);
    }, [params]);
    
    return (
        <div>

        </div>
    )
}
