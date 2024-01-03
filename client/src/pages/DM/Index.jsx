export default function Index () {
    return(
        <>
            <section>
                <div className="header section-layout">
                    <div className="user-dm-container">
                        <div className="users">
                            <div className="user-container">
                                <div className="single-user">
                                    <div className="single-user-container">
                                        <div className="user-name">Vampy</div>
                                        <div className="lastest-message">Hello bro</div>
                                    </div>
                                    <div className="single-user-container">
                                        <div className="user-name">Vampy</div>
                                        <div className="lastest-message">Hello bro</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="message-container">
                            <div className="message-box">
                                <div className="user-message">
                                    <div className="selected-user single-message">
                                        <div className="message">
                                            Lorem Ipsum is simply dummy text of the printing and 
                                            typesetting industry. Lorem Ipsum has been the industry`s

                                            <small className="dm-time">time</small>
                                        </div>
                                    </div>

                                    <div className="current-user single-message">
                                        <div className="message">
                                            Lorem Ipsum is simply dummy text of the printing and 
                                            typesetting industry. Lorem Ipsum has been the industry`s

                                            <small className="dm-time">time</small>
                                        </div>
                                    </div>

                                    <div className="selected-user single-message">
                                        <div className="message">
                                            Lorem Ipsum is simply dummy text of the printing and 
                                            typesetting industry. Lorem Ipsum has been the industry`s

                                            <small className="dm-time">time</small>
                                        </div>
                                    </div>

                                    <div className="current-user single-message">
                                        <div className="message">
                                            Lorem Ipsum is simply dummy text of the printing and 
                                            typesetting industry. Lorem Ipsum has been the industry`s

                                            <small className="dm-time">time</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="message-user-dm">
                                    <div className="message-user-dm-container">
                                        <textarea className="vampire-dm-input" rows="2"></textarea>
                                    </div>

                                    <div className="vampire-link">
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}