import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearWalletAddress } from '../store/walletSlice';

const Sidebar = () => {
  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const navigate = useNavigate();
  const pathname = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { title: 'Add Product', icon: <AddIcon />, page: 'add-product' },
    { title: 'Track Product', icon: <SearchIcon />, page: 'track-product' },
  ];

  const formatWalletAddress = (address) => {
    if (!address) return 'Not Connected';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Clear wallet address from Redux store
    dispatch(clearWalletAddress());
    // clearWalletAddress();
    // Optionally, navigate to a different page after logout
    navigate('/login');
  }
  return (
    <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
  <div className="p-4">
    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">TrackChain</h1>
    <div className="text-xs text-gray-400 mt-1 truncate">
      Connected: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not connected'}
    </div>
  </div>
  
  <nav className="mt-8 flex-1">
    <div className="px-4 space-y-1">
      <button 
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${pathname === '/dashboard' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        onClick={() => navigate('/')}
      >
        <DashboardIcon />
        <span>Dashboard</span>
      </button>
      <button 
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${pathname === '/add-product' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        onClick={() => navigate('/add')}
      >
        <AddIcon />
        <span>Add Product</span>
      </button>
      
      <button 
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${pathname === '/track' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        onClick={() => navigate('/track')}
      >
        <SearchIcon />
        <span>Track Order</span>
      </button>
      
      
    </div>
  </nav>
  
  <div className="p-4 border-t border-white/10 mt-auto">
    <button 
      className="flex items-center gap-2 p-2 w-full text-gray-400 hover:text-white rounded-lg transition"
      onClick={handleLogout}
    >
      <LogoutIcon />
      <span>Logout</span>
    </button>
  </div>
</div>
  );
};

// Icons (same style as your dashboard)
const DashboardIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const AddIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export default Sidebar;