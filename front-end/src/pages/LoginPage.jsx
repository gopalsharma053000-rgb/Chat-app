
import { useState } from 'react';
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login,isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };
  
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-950'>
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <div className='w-full flex flex-col md:flex-row'>
          {/* FROM COLUMN-LEFT SIDE */}
          <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-700/20 bg-gradient-to-bl from-slate-800/20 to-transparent'>
            <div className='w-full max-w-md'>
              {/* HEADING TEXT */}
              <div className='text-center mb-8'>
                <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                <h2 className='text-2xl font-bold text-slate-200 mb-2'>Welcome Back</h2>
                <p className='text-slate-400'>Login to access to your account </p>
              </div>
              {/* FORM */}
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* email */}
                <div>
                  <label className="block text-sm font-medium text-[15px]  text-slate-300 mb-2">
                    Email
                  </label>
                  <div className="relative w-full">
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Your Email"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 py-1 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                {/* password */}
                <div>
                  <label className="block text-sm font-medium text-[15px]  text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative w-full">
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5 pointer-events-none" />
                    <input
                      type='password'
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-11 pr-11 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>
                {/* submit button */}
                <button className='auth-btn' type='submit' disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <LoaderIcon className='w-full h-5 animate-spin text-center' />
                  ) : (
                    "Sign In"
                    )}
                </button>
              </form>
              <div className='mt-6 text-center'>
                <Link to="/signup" className='auth-link'>
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
          {/*From Column-Right side*/}
          <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-bl from-slate-800/30 to-transparent relative overflow-hidden">
            <div className="flex flex-col items-center justify-center max-w-lg w-full text-center">
              <div className="w-full flex items-center justify-center mb-6">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full max-h-[380px] lg:max-h-[440px] object-contain drop-shadow-xl"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl lg:text-2xl font-semibold text-cyan-400">
                  Connect anytime, anywhere
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className='auth-badge'>Free</span>
                  <span className='auth-badge'>Easy Setup</span>
                  <span className='auth-badge'>Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
