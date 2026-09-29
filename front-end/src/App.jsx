import { Navigate, Routes , Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {checkAuth , isCheckingAuth, authUser} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  if(isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <Routes>
      <Route path="/" element={ authUser ? <ChatPage/> : <Navigate to={"/login"}/>}/>
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
      <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App;

