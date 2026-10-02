import { useChatStore } from "../store/useChatStore";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsLists from "../components/ChatsLists";
import ContactList from "../components/ContactList";
import ProfileHeader from "../components/ProfileHeader";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";


const ChatPage = () => {

  const { activeTab , selectedUser} = useChatStore();
  return (
    <div className="relative flex flex-row w-full max-w-6xl h-screen">
      {/*LEFT SIDE */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsLists /> : <ContactList />}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col bg-slate-800/30 backdrop-blur-sm">
      {selectedUser ? <ChatContainer /> :<NoConversationPlaceholder />}
      </div>
    </div>
  )
}

export default ChatPage;
