import React from "react"
export default function EditIt(props){

    console.log(props)
    const [editMeme, setEditMeme] = React.useState(
        {
        topText: "" + props.toptext,
        bottomText: "" + props.bottomtext,
        randomImage: "" + props.randomimage
        }
    )
    function saveEdit(event){
        event.preventDefault()
        setEditMeme(prevState=> {
            return {
                ...prevState,
                editMeme
            }
        })
        props.editIt(props.memeIndex, editMeme)
        setEditMeme({
            topText: "",
            bottomText: ""
        })
        props.setShowForm(false)
    }
    function handleEditChange(event){
        const {name, value} = event.target
        setEditMeme(prevEditMeme =>{
            return {
                ...prevEditMeme,
                [name]:value
            }
        })
        console.log(event.target.value)
    }
    return (
        <div>
            <form onSubmit={saveEdit}>
                <input
                    className="topText"
                    type="text"
                    name="topText"
                    placeholder="top line"
                    value={editMeme.topText}
                    onChange={handleEditChange}
                />
                <input
                    className="bottomText"
                    type="text"
                    name="bottomText"
                    placeholder="bottom line"
                    value={editMeme.bottomText}
                    onChange={handleEditChange}
                />
                <button>Save Changes</button>
            </form>
        </div>
    )
}