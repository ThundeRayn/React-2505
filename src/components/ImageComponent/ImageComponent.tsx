import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface Props{
    src:string;
}

export default function ImageCompoennet({src}:Props){
    
    const [imageLoaded,setImageLoaded] = useState(false);
    
    useEffect(()=>{
        const img = new Image();
        img.onload = () =>{
            setImageLoaded(true);
        }
        img.src=src;
    },[src]);

    return (
    <>
        {!imageLoaded && (
            <Blurhash
                hash="LiEyPhRk%MRj~qofofWB-;oyM{j["
                height={250}
                resolutionX={32}
                resolutionY={32}
                punch={1}
            />
        )}
        {imageLoaded && (
            <img 
            src={src}
            alt=""
            height={150}
        />)}
    </>
    )
}