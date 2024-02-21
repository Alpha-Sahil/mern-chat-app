import GuestLayout from "../layouts/GuestLayout"
import Banner from "../components/Banner"
import extra from "../assets/images/extra.png"
import messageImage from "../assets/images/message.png"
import signUpImage from "../assets/images/signup.png"
import useLogin from "../hooks/useLogin"

export default function Home () {
    useLogin()

    return(
        <GuestLayout>
            <Banner />
            <section>
                <div className="extra-section-layout about-app-container in-actiave">
                    <div className="about-app">
                        <div className="extra-image">
                            <img style={{width: '100%'}} src={extra} alt="" />
                        </div>
                        <div className="extra-div">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </div>
                    </div>
                    <div className="about-app">
                        <div className="extra-div">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </div>
                        <div className="extra-image">
                            <img style={{width: '100%'}} src={messageImage} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="section-layout">
                    <div className="registration">
                        <div className="registration-container">
                            <img src={signUpImage} alt="" width="100%" />
                        </div>
                        <div className="registration-form">
                            <div className="form">
                                <div className="form-input">
                                    <label htmlFor="name">Name</label><br /><br />
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-input">
                                    <label htmlFor="name">Email</label><br /><br />
                                    <input type="email" />
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-input">
                                    <label htmlFor="name">Phone</label><br /><br />
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    )
}