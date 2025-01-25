import Messages from './Messages/Index'
import Profile from "./Profile/Index"
import Users from "./Users"

const Home = () => {
    return <div className="wrapper">
        <Users />

        <Messages />
        
        <Profile />
    </div>
}

export default Home