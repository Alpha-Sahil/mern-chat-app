import Header from "../components/Header"
import Footer from "../components/Footer"
import '../css/index.css'

export default function AppLayout({children}) {
    return(
        <>
            <Header />
                { children }
            <Footer />
        </>
    )
}