import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#00C49F', '#FF8042'];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const data = [
  { name: "January", income: 1200, expense: 800 },
  { name: "February", income: 1500, expense: 900 },
  { name: "March", income: 1700, expense: 1100 },
  { name: "April", income: 1300, expense: 950 },
  { name: "May", income: 1600, expense: 1000 },
  { name: "June", income: 1400, expense: 850 },
  { name: "July", income: 1800, expense: 1200 },
  { name: "August", income: 1600, expense: 1100 },
  { name: "September", income: 1700, expense: 1000 },
  { name: "October", income: 1900, expense: 1300 },
  { name: "November", income: 2000, expense: 1400 },
  { name: "December", income: 2100, expense: 1500 },
];

const Sidebar = ({ onSelectSection, onDeleteClick, onSignOutClick }) => (
  <div className="bg-[#15182c] h-screen w-64 p-5 flex flex-col text-white fixed">
    <div className="text-xl font-bold mb-8 flex items-center gap-2">
      <FiMenu />
      Admin Panel
    </div>
    <nav className="flex flex-col gap-6">
      <button onClick={() => onSelectSection("info")} className="text-left hover:text-blue-400">Info</button>
      <button onClick={() => onSelectSection("transfer")} className="text-left hover:text-blue-400">Transfer</button>
      <button onClick={onDeleteClick} className="text-left hover:text-red-500">Delete Account</button>
      <button onClick={onSignOutClick} className="text-left hover:text-yellow-400">Sign Out</button>
    </nav>
  </div>
);

const Card = ({ title, icon, children }) => (
  <div className="bg-[#1e1e2f] text-white rounded-2xl shadow-md p-6 w-full">
    <div className="flex items-center gap-3 mb-4 text-lg font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-96">
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Confirm</button>
      </div>
    </div>
  </div>
);

const TransferForm = () => {
  const [senderCard, setSenderCard] = useState('');
  const [receiverCard, setReceiverCard] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('AZN');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isFormValid = senderCard && receiverCard.length === 16 && amount && currency;

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowOtp(true);
    } else {
      setMessage('Please fill in all the fields correctly.');
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') {
      setMessage('✅ Transfer completed successfully!');
      setTimeout(() => {
        // Reset everything
        setSenderCard('');
        setReceiverCard('');
        setAmount('');
        setCurrency('AZN');
        setOtp('');
        setShowOtp(false);
        setConfirmed(false);
        navigate('/admin');
      }, 2000);
    } else {
      setMessage('❌ OTP code is wrong.');
    }
  };

  return (
    <Card title="Transfer Funds" icon={<FaExchangeAlt />}>
      <form onSubmit={showOtp ? handleFinalSubmit : handleInitialSubmit} className="space-y-4 text-white">
        <div>
          <label className="block mb-1 font-medium">Sender Card:</label>
          <select
            value={senderCard}
            onChange={(e) => setSenderCard(e.target.value)}
            className="w-full p-2 rounded text-black"
            disabled={showOtp}
          >
            <option value="">-- Select Sender --</option>
            <option value="1111222233334444">1111 2222 3333 4444</option>
            <option value="5555666677778888">5555 6666 7777 8888</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Receiver Card:</label>
          <input
            type="number"
            value={receiverCard}
            onChange={(e) => setReceiverCard(e.target.value.slice(0, 16))}
            className="w-full p-2 rounded text-black"
            placeholder="Enter 16-digit card number"
            disabled={showOtp}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded text-black"
            min="1"
            placeholder="Enter amount"
            disabled={showOtp}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 rounded text-black"
            disabled={showOtp}
          >
            <option value="AZN">AZN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {showOtp && (
          <div>
            <label className="block mb-1 font-medium">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
            />
          </div>
        )}

        <button
          type="submit"
          className={`px-4 py-2 rounded transition duration-300 ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={showOtp && otp.length !== 6}
        >
          {showOtp ? 'Confirm Transfer' : 'Send'}
        </button>

        {message && (
          <p className="mt-2 text-sm font-semibold text-yellow-300">{message}</p>
        )}
      </form>
    </Card>
  );
};


const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState('info');
  const [selectedCard, setSelectedCard] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Account deleted.");
    setShowDeleteModal(false);
  };

  const handleSignOut = () => {
    console.log("Signed out.");
    setShowSignOutModal(false);
    navigate("/");
  };

  const monthData = data.find(d => d.name === selectedMonth);

  return (
    <div className="flex bg-[#0f0f1a] min-h-screen">
      <Sidebar
        onSelectSection={setSelectedSection}
        onDeleteClick={() => setShowDeleteModal(true)}
        onSignOutClick={() => setShowSignOutModal(true)}
      />
      <div className="ml-64 w-full p-8 space-y-12">
        <h1 className="text-3xl font-bold text-white mb-4">Hello Gulshan 👋</h1>

        {selectedSection === 'info' && (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="p-2 rounded text-black">
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="p-2 rounded text-black">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <select value={selectedCard} onChange={e => setSelectedCard(e.target.value)} className="p-2 rounded text-black">
                <option value="1">1111-2222-3333-4444</option>
                <option value="2">5555-6666-7777-8888</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <Card title="Ödənişlər və Gəlirlər" icon={<FaChartLine />}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={[monthData]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={3} />
                    <Line type="monotone" dataKey="expense" stroke="#FF8042" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Pie Chart: Faizlə" icon={<FaChartLine />}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={[
                      { name: "Income", value: monthData?.income || 0 },
                      { name: "Expense", value: monthData?.expense || 0 },
                    ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {selectedSection === 'transfer' && <TransferForm />}
      </div>

      {showDeleteModal && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete your account?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showSignOutModal && (
        <Modal
          title="Confirm Sign Out"
          message="Are you sure you want to sign out?"
          onConfirm={handleSignOut}
          onCancel={() => setShowSignOutModal(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
