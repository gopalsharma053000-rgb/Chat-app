import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import NoChatsFound from "../components/NoChatsFound";


const ChatsLists = () => {

  const {getMyChatPartners , chats , isUsersLoading , setSelectedUser } = useChatStore();

  useEffect(()=>{
    getMyChatPartners
  },[getMyChatPartners]);

  if(isUsersLoading) return <UsersLoadingSkeleton/>
  if(chats.length === 0) return <NoChatsFound/>

  return (
    <div>
    </div>
  )
}

export default ChatsLists

