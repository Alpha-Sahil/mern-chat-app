import { useMemo } from "react"
import { setCurrentConversationUser as setCurrentConversationUserSlice, setCurrentConversation } from "../redux/slices/conversation"
import { searchUserConversation } from '../redux/slices/users'
import { useDispatch } from "react-redux"

const SearchList = ({users, closeList}) => {
    const dispatch = useDispatch()

    const list = useMemo(() => {
        const setCurrentConversationUser = async (user) => {
            let response = await searchUserConversation({ conversationUser: user })
            
            dispatch(setCurrentConversationUserSlice(user))

            dispatch(setCurrentConversation(response.shift()))

            closeList()
        }

        return users.map((user, i) => {
            return <div
                id="search-input"
                className="searching-list-item"
                key={ i }
                onClick={ () => setCurrentConversationUser(user)}>
                    { user.name }
            </div>
        })
    }, [users])

    return <>
        <div className="search-list">
            <div className="search-list-container">
                { list }
            </div>
        </div>
    </>
}

export default SearchList