import React from "react"
export default function NewMeme(props){
    return (
        <div className="meme" id={props.index}>
            <img className="image" src={props.randomImage} alt=""/>
            <h2 className="text top" >{props.topText}</h2>
            <h2 className="text bottom" >{props.bottomText}</h2>
        </div>
    )
}