import { MessageCircleMore } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full  text-center p-6">
        <div className="size-15 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleMore className="size-8 text-cyan-400"/>
        </div>
        <div>
            <h4 className="text-slate-200 font-medium mb-1">Select a conversation</h4>
            <p className="text-slate-500 text-sm px-6">
              Chose a contact from the sidebar to start chatting or <br/> continue a previous conversation.
            </p>
        </div>
    </div>
  )
}

export default NoConversationPlaceholder
