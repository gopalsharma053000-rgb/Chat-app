import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";


const ChatContainer = () => {

  const { selectedUser,messages, getMessagesByUserId,isMessagesLoading} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=>{
    getMessagesByUserId(selectedUser._id);
  },[selectedUser,getMessagesByUserId])

  return (
    <>
    <ChatHeader/>
    <div className="flex-1 px-6 overflow-auto py-6">
      {/* {messages.length > 0 ? () : ()} */}
    </div>
    </>
  )
}

export default ChatContainer
