import '../css/model.css'
import { useState, useEffect} from 'react'

export default function Model ({ children, closed }) {
    const [modelPop, setModelPop] = useState(document.getElementById('modelPop'))

    useEffect(() => setModelPop(document.getElementById('modelPop')), [])

    useEffect(() => {
        const closeModelIfClickedOutside = (e) => {
            if (modelPop && !modelPop.contains(e.target)) closed()
        }
        
        document.addEventListener('click', closeModelIfClickedOutside)

        return () => document.removeEventListener('click', closeModelIfClickedOutside)
    })

    return(
        <>
            <div className="model" id="modelPop">
                <div className="close" onClick={closed}>
                    <i className="fa-regular fa-circle-xmark"></i>
                </div>
                <div className="model-container" style={ {margin: '40px'}}>
                    { children }
                </div>
            </div>
        </>
    ) 
}