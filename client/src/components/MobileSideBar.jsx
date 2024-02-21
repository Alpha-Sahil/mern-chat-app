import '../css/index.css'
import { useState, useEffect} from 'react'

export default function MobileSideBar ({ showSideBar, closed }) {    
    const [sideBar, setSideBar] = useState(document.getElementById('sibe-bar'))

    useEffect(() => setSideBar(document.getElementById('sibe-bar')), [])

    useEffect(() => {
        const closeSideBar = (e) => {
            if (sideBar && !sideBar.contains(e.target)) closed() 
        }
        
        document.addEventListener('click', closeSideBar)

        return () => document.removeEventListener('click', closeSideBar)
    })

    return(
        <>
            <aside id='sibe-bar'>
                <div className='mobile-side-bar-container'>
                    <div className="mobile-side-bar-inner">
                        <div className="mobile-link">
                            Message
                        </div>
                        <div className="mobile-link">
                            Login
                        </div>
                        <div className="mobile-link">
                            Register
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}