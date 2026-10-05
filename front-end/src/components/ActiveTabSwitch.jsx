import { useChatStore } from "../store/useChatStore";


const ActiveTabSwitch = () => {

  const { activeTab , setActiveTab } = useChatStore();

  return (
    <div className="flex bg-slate-900/60 p-1 mx-4 my-3 rounded-xl border border-slate-700/50">
  <button
    onClick={() => setActiveTab("chats")}
    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-center ${
      activeTab === "chats"
        ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
    }`}
  >
    Chats
  </button>
  <button
    onClick={() => setActiveTab("contacts")}
    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-center ${
      activeTab === "contacts"
        ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
    }`}
  >
    Contacts
  </button>
</div>
  )
}

export default ActiveTabSwitch;
