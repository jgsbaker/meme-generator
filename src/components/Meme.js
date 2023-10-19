import React from "react"
import NewMeme from "./NewMeme"
import EditIt from "./EditIt"
export default function Meme(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])
    const [memeList, setMemeList] = React.useState([])
    const [showForm, setShowForm] = React.useState(false)
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
        .catch(err => console.log(err))
    }, [])
    function handleClick() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        let url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }
    function save(){
        setMemeList(prevMemeList=> {
            return [
                ...prevMemeList,
                meme
            ]
        })
    }
    function deleteIt(memeIndex){
        setMemeList(prevMemeList => {
            return prevMemeList.filter((item, index)=> index !== memeIndex)
        })
    }
    const editIt = (memeIndex, updatedItem) =>{
        setMemeList(prevMeme => prevMeme.map((meme, index) => memeIndex !== index ? meme : updatedItem))
        setShowForm(prev => !prev)
    }
    let show = memeList.map((prevMemeList, index, item) => {
        return (
            <div>
                <NewMeme {...prevMemeList}/>
                <button onClick={()=> deleteIt(index)}>Delete</button>
                <div>
                {showForm ?
                <EditIt 
                    key={prevMemeList[index]}
                    toptext={prevMemeList.topText} 
                    bottomtext={prevMemeList.bottomText} 
                    memeIndex={index}
                    setShowForm={setShowForm}
                    editIt={editIt}
                    randomimage={prevMemeList.randomImage}
                /> :
                <button onClick={()=> setShowForm(prev => !prev)}>Edit</button>}
            </div>
            </div>
        )
    })
    return (
        <div className="form">
            <input 
                className="input"
                type="text"
                placeholder="top line"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
            />
            <input 
                className="input"
                type="text"
                placeholder="bottom line"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
            />
            <button className="submit" onClick={handleClick}>Get New Image</button>
            <button onClick={save} className="save">Save</button>
            <div className="meme">
                <img className="image" src={meme.randomImage} alt=""/>
                <h2 className="text top" >{meme.topText}</h2>
                <h2 className="text bottom" >{meme.bottomText}</h2>
            </div>
            {show}
        </div>
    )
}