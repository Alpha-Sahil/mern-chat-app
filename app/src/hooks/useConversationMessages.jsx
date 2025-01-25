import { useDispatch } from "react-redux"
import { addToConversationMessages } from '../redux/slices/conversation'

export default function useConversationMessages (props) {
    const dispatch = useDispatch()

    dispatch(addToConversationMessages(props.message))
}