import { useDispatch, useSelector } from "react-redux";
import { ethers } from 'ethers';
import { setWalletAddress } from '../store/walletSlice';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.wallet.walletAddress);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'manufacturer'
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
        localStorage.setItem("role", formData.role);
        toast.success("Login successful");
        navigate("/");
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                setIsConnecting(true);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                dispatch(setWalletAddress(accounts[0]));  
                setIsConnecting(false);
                setIsConnected(true);
                setTimeout(() => {
                    toast.success("Wallet connected successfully!");
                }, 500);
            } catch (error) {
                console.error("Wallet connection failed:", error);
                setIsConnecting(false);
                setIsConnected(false);
                toast.error("Wallet connection failed. Please try again.");
            }
        } else {
            toast.error("MetaMask not detected! Please install MetaMask.");
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-xl"></div>
          
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              TrackChain
            </h1>
            <p className="text-white/70">Connect your wallet to track your products</p>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80" htmlFor="role">
                Select Your Role
              </label>
              <select 
                id="role" 
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-white/50 transition-all duration-200"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="manufacturer" className="bg-gray-800">Manufacturer</option>
                <option value="distributor" className="bg-gray-800">Distributor</option>
                <option value="retailer" className="bg-gray-800">Retailer</option>
                <option value="consumer" className="bg-gray-800">Consumer</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80" htmlFor="email">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-white/50 transition-all duration-200"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80" htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-white/50 transition-all duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            {isConnecting ? (
              <div className="w-full flex items-center justify-center py-3 px-6 rounded-xl">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : isConnected ? (
              <div className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-green-500/10 border border-green-400/30 rounded-xl text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connected
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-600 rounded-xl font-medium text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.02]"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="16" y1="12" x2="16" y2="12" />
                  <path d="M22 10V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2" />
                </svg>
                Connect Wallet
              </button>
            )}

            <button 
              onClick={handleLogin}
              type="button"
              className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              disabled={isConnecting || !isConnected}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
};

export default LoginPage;