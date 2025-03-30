import React from 'react';
import Sidebar from '../layout/Sidebar';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Products', 
      value: '128', 
      icon: <BoxIcon />, 
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      text: 'text-white'
    },
    { 
      title: 'In Transit', 
      value: '32', 
      icon: <TruckIcon />, 
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      text: 'text-white'
    },
    { 
      title: 'Delivered', 
      value: '87', 
      icon: <CheckCircleIcon />, 
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      text: 'text-white'
    }
  ];
  
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Sidebar */}
      <Sidebar/>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Dashboard Overview</h1>
        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4 text-white">Recent Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left font-medium">Product ID</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Date Added</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <ProductRow 
                  id="#PRD-0025" 
                  name="Premium Headphones" 
                  date="Mar 28, 2025" 
                  status="shipped" 
                />
                <ProductRow 
                  id="#PRD-0024" 
                  name="Smart Watch X200" 
                  date="Mar 27, 2025" 
                  status="delivered" 
                />
                <ProductRow 
                  id="#PRD-0023" 
                  name="Wireless Earbuds Pro" 
                  date="Mar 25, 2025" 
                  status="pending" 
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ id, name, date, status }) => {
  const statusClasses = {
    pending: "bg-yellow-400 text-white",
    shipped: "bg-blue-400 text-white",
    delivered: "bg-green-400 text-white"
  };
  
  const statusText = {
    pending: "Pending",
    shipped: "Shipped",
    delivered: "Delivered"
  };
  
  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition">
      <td className="py-4 px-4">{id}</td>
      <td className="py-4 px-4">{name}</td>
      <td className="py-4 px-4">{date}</td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
          {statusText[status]}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-white">
            <EyeIcon />
          </button>
          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-white">
            <EditIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Icons (updated with white fill for better visibility)
const DashboardIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const BoxIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default Dashboard;