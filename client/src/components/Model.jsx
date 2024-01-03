import '../css/model.css'

export default function Model ({ children, closed }) {
    return(
        <>
            <div className="model">
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