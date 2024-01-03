import bannerImage from '../assets/images/banner.png'

export default function Banner () {
    return(
        <div className="header section-layout">
            <div className="banner">
                <div className="banner-container">
                    <div className="banner-image">
                        <img src={bannerImage} alt="Loading..." />
                    </div>
                    <div className="banner-text">
                        <div className="banner-text-container">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </p>
                        </div>
                        <div className="banner-buttons">
                            <button className="chatting-button">
                                Get Started
                            </button>
                            <button className="chatting-button">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}