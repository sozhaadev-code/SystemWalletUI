import React, { useState, useEffect } from 'react';
import { 
  IoMdAdd, 
  IoMdClose,
  IoMdRemove, 
} from "react-icons/io";
import { 
  MdGridView, 
  MdMoreVert, 
  MdEdit, 
  MdDeleteOutline 
} from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import toast from 'react-hot-toast';
import './Admin.css'; 

function Dashboard() {
  
  const [activeModal, setActiveModal] = useState(null); 
  const [selectedMember, setSelectedMember] = useState(null);
  const [amount, setAmount] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null); 

  // New Member Form State
  const [newMemberForm, setNewMemberForm] = useState({
    userId: 'ARRA' + Math.floor(100000 + Math.random() * 900000),
    name: '',
    email: '',
    phone: '',
    panCard: '',
    aadharNo: '',
    panFile: null,
    aadharFile: null
  });

  // Add Money Form State
  const [addMoneyForm, setAddMoneyForm] = useState({
    currency: 'Dollars',
    amount: ''
  });



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-container')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [members, setMembers] = useState([
    { id: 1, name: 'Zoya Blanchard', memberId: 'ARRA109485', email: 'zoya.blanchard@example.com', phone: '444-555-6666', avatar: 'https://i.pravatar.cc/150?u=1', password: 'Abcd@12345', panCard: 'ABCDE1234F', aadhar: '1234 1234 1234 1234', balance: 1000 },
    { id: 2, name: 'Kiaan Dorsey', memberId: 'ARRA957392', email: 'kiaan.dorsey@example.com', phone: '555-666-7777', avatar: 'https://i.pravatar.cc/150?u=2', password: 'Xyz@67890', panCard: 'FGHIJ5678K', aadhar: '5678 5678 5678 5678', balance: 2000 },
    { id: 3, name: 'Anya Hamer', memberId: 'ARRA846295', email: 'anya.hamer@example.com', phone: '666-777-8888', avatar: 'https://i.pravatar.cc/150?u=3', password: 'Pass@9012', panCard: 'KLMNO9012P', aadhar: '9012 9012 9012 9012', balance: 1500 },
    { id: 4, name: 'Amara Rowland', memberId: 'ARRA736482', email: 'amara.rowland@example.com', phone: '777-888-9999', avatar: 'https://i.pravatar.cc/150?u=4', password: 'Test@3456', panCard: 'QRSTU3456V', aadhar: '3456 3456 3456 3456', balance: 3000 },
    { id: 5, name: 'Euan Buckner', memberId: 'ARRA638591', email: 'euan.buckner@example.com', phone: '888-999-0000', avatar: 'https://i.pravatar.cc/150?u=5', password: 'Demo@7890', panCard: 'WXYZAB7890', aadhar: '7890 7890 7890 7890', balance: 2500 },
  ]);

  const requests = [
    { id: 1, name: 'Name', type: 'Transfer Request', amount: '$ 250', time: '10 Mins Ago' },
    { id: 2, name: 'Name', type: 'Transfer Request', amount: '$ 250', time: '10 Mins Ago' },
    { id: 3, name: 'Name', type: 'Transfer Request', amount: '$ 250', time: '10 Mins Ago' },
    { id: 4, name: 'Name', type: 'Transfer Request', amount: '$ 250', time: '10 Mins Ago' },
    { id: 5, name: 'Name', type: 'Transfer Request', amount: '$ 250', time: '10 Mins Ago' },
  ];

  const handleDeduct = (id, amt) => {
    if (!amt) return toast.error("Enter amount");

    setMembers(prev =>
      prev.map(m =>
        m.id === id ? { ...m, balance: (m.balance || 0) - Number(amt) } : m
      )
    );

    toast.success(`$${amt} deducted successfully`);
    closeModal();
  };

  const handleOpenAddMoney = (member) => {
    setSelectedMember(member);
    setAddMoneyForm({ currency: 'Dollars', amount: '' });
    setActiveModal('addMoney');
  };

  const handleOpenViewDashboard = (member) => {
    setSelectedMember(member);
    setActiveModal('viewDashboard');
  };

  const handleOpenNewMember = () => {
    setNewMemberForm({
      userId: 'ARRA' + Math.floor(100000 + Math.random() * 900000),
      name: '',
      email: '',
      phone: '',
      panCard: '',
      aadharNo: '',
      panFile: null,
      aadharFile: null
    });
    setActiveModal('newMember');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedMember(null);
    setAmount(""); 
    setHoveredMemberId(null); 
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation(); 
    if (activeMenuId === id) {
      setActiveMenuId(null);
    } else {
      setActiveMenuId(id);
    }
  };

  const handleNewMemberInputChange = (e) => {
    const { name, value } = e.target;
    setNewMemberForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMemberForm(prev => ({ ...prev, [type]: file }));
      toast.success(`${type === 'panFile' ? 'PAN' : 'Aadhar'} file uploaded successfully!`);
    }
  };

  const handleOpenDeduct = (member) => {
    setSelectedMember(member);
    setActiveModal("deduct");
  };

  const handleAddMember = () => {
    if (!newMemberForm.name || !newMemberForm.email || !newMemberForm.phone) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const newMember = {
      id: members.length + 1,
      name: newMemberForm.name,
      memberId: newMemberForm.userId,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      avatar: `https://i.pravatar.cc/150?u=${members.length + 1}`,
      password: 'Default@123',
      panCard: newMemberForm.panCard || 'N/A',
      aadhar: newMemberForm.aadharNo || 'N/A',
      balance: 0 
    };
    
    setMembers([...members, newMember]);
    toast.success('Member added successfully!');
    closeModal();
  };

  const handleAddMoney = () => {
    if (!addMoneyForm.amount) {
      toast.error('Please enter an amount');
      return;
    }
    
    // Update member's balance
    setMembers(prev =>
      prev.map(m =>
        m.id === selectedMember.id 
          ? { ...m, balance: (m.balance || 0) + Number(addMoneyForm.amount) } 
          : m
      )
    );
    
    toast.success(`$${addMoneyForm.amount} added to ${selectedMember.name}'s account!`);
    closeModal();
  };

  const handleEditMember = (member) => {
    setActiveMenuId(null);
    toast.success(`Edit ${member.name}`);
  };

  const handleDeleteMember = (member) => {
    setActiveMenuId(null);
    toast((t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontWeight: 500, fontSize: '14px' }}>Delete {member.name}?</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#e5e7eb',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              color: '#374151'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setMembers(members.filter(m => m.id !== member.id));
              toast.dismiss(t.id);
              toast.success('Member deleted successfully!');
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              color: 'white'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: 4000 });
  };

  return (
    <div className="user-management-container">
      <div className="members-section">
        <div className="section-header">
          <h2>Members</h2>
          <button className="add-member-btn" onClick={handleOpenNewMember}>
            <IoMdAdd size={18} /> Add Member
          </button>
        </div>

        <div className="members-list">
          {members.map((member) => (
            <div 
              key={member.id} 
              className={`member-row ${hoveredMemberId === member.id ? 'hovered' : ''}`}
              onClick={() => handleOpenViewDashboard(member)} 
              onMouseEnter={() => setHoveredMemberId(member.id)}
              onMouseLeave={() => setHoveredMemberId(null)}
              style={{ cursor: 'pointer' }}
            >
              <div className="member-info">
                <img src={member.avatar} alt="avatar" className="avatar" />
                <div>
                  <span className="member-name">{member.name}</span>
                  <div className="member-balance">Balance: ${member.balance || 0}</div>
                </div>
              </div>
              <span className="member-id">{member.memberId}</span>
              <span className="member-email">{member.email}</span>
              <span className="member-phone">{member.phone}</span>
              
              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <div className="addmoney-menu-wrapper">
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === "add" + member.id ? null : "add" + member.id);
                      setSelectedMember(member);
                    }}
                  >
                     <span className="icon-group">
    <IoMdAdd size={15} /> |
    <IoMdRemove size={15} />
  </span>
                    <span className="tooltip-text">Add Money | Transfer Money</span>
                  </button>

                  {activeMenuId === "add" + member.id && (
                    <div className="addmoney-menu">
                      <div className="add-item" onClick={() => handleOpenAddMoney(member)}>
                        + Add Money
                      </div>
                      <div className="add-item subtract" onClick={() => handleOpenDeduct(member)}>
                        - Transfer Money
                      </div>
                    </div>
                  )}
                </div>

                <button className="action-btn" onClick={(e) => {
                  e.stopPropagation();
                  handleOpenViewDashboard(member);
                }}>
                  <MdGridView size={18} />
                  <span className="tooltip-text">View Dashboard</span>
                </button>

                <div className="menu-container">
                  <button className="action-btn" onClick={(e) => toggleMenu(e, member.id)}>
                    <MdMoreVert size={18} />
                  </button>
              {activeMenuId === member.id && (
  <div className="popup-menu">
    <button className="popup-item">
      <MdEdit size={16} /> Edit
    </button>
    <button className="popup-item delete">
      <MdDeleteOutline size={16} /> Delete
    </button>
  </div>
)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deduct Money Modal */}
      {activeModal === "deduct" && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Transfer / Deduct Money</div>
              <IoMdClose className="modal-close-icon" onClick={closeModal} />
            </div>

            <div className="modal-body">
              <h3>{selectedMember.name}</h3>
              <p className="available-balance">Available Balance: ${selectedMember.balance || 0}</p>

              <input 
                type="number" 
                placeholder="Enter amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {amount && (
                <p className="new-balance">New Balance: ${(selectedMember.balance || 0) - Number(amount)}</p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                <IoMdClose /> Cancel
              </button>
              <button 
                className="btn-submit"
                onClick={() => handleDeduct(selectedMember.id, amount)}
              >
                <IoMdAdd /> Deduct
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Right Section: Requests */}
      <div className="requests-section">
        <div className="section-header">
          <h2>Requests</h2>
          <div className="requests-bell">
            <IoMdNotificationsOutline size={24} />
            {requests.length > 0 && (
              <span className="notification-count">{requests.length}</span>
            )}
          </div>
        </div>
        <div className="requests-list">
          {requests.map((req, index) => (
            <div key={index} className="request-item">
              <div className="req-header">
                <strong>{req.name}</strong>
                <span className="req-time">{req.time}</span>
              </div>
              <div className="req-type">{req.type}</div>
              <div className="req-amount">{req.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* New Member Modal */}
      {activeModal === 'newMember' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">New Member</div>
              <IoMdClose className="modal-close-icon" onClick={closeModal} />
            </div>
            
            <div className="modal-body">
              <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>User Id</label>
                  <input 
                    type="text" 
                    name="userId"
                    value={newMemberForm.userId} 
                    disabled 
                    className="input-disabled" 
                  />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter Text" 
                    value={newMemberForm.name}
                    onChange={handleNewMemberInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={newMemberForm.email}
                    onChange={handleNewMemberInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone No</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone No" 
                    value={newMemberForm.phone}
                    onChange={handleNewMemberInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="panCard"
                    placeholder="Pan Card No" 
                    value={newMemberForm.panCard}
                    onChange={handleNewMemberInputChange}
                  />
                  <div className="attach-container">
                     <span>Attach :</span> 
                     <label htmlFor="panFileInput" style={{ cursor: 'pointer' }}>
                       <FiUpload className="attach-icon" />
                     </label>
                     <input 
                       id="panFileInput" 
                       type="file" 
                       accept="image/*,.pdf" 
                       style={{ display: 'none' }}
                       onChange={(e) => handleFileUpload('panFile', e)}
                     />
                     {newMemberForm.panFile && (
                       <span style={{ fontSize: '11px', color: '#10b981', marginLeft: '5px' }}>
                         ✓ {newMemberForm.panFile.name}
                       </span>
                     )}
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="aadharNo"
                    placeholder="Aadhar No" 
                    value={newMemberForm.aadharNo}
                    onChange={handleNewMemberInputChange}
                  />
                  <div className="attach-container">
                     <span>Attach :</span> 
                     <label htmlFor="aadharFileInput" style={{ cursor: 'pointer' }}>
                       <FiUpload className="attach-icon" />
                     </label>
                     <input 
                       id="aadharFileInput" 
                       type="file" 
                       accept="image/*,.pdf" 
                       style={{ display: 'none' }}
                       onChange={(e) => handleFileUpload('aadharFile', e)}
                     />
                     {newMemberForm.aadharFile && (
                       <span style={{ fontSize: '11px', color: '#10b981', marginLeft: '5px' }}>
                         ✓ {newMemberForm.aadharFile.name}
                       </span>
                     )}
                  </div>
                </div>
              </div>
            </div>

            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                 <IoMdClose /> Cancel
              </button>
              <button className="btn-submit" onClick={handleAddMember}>
                 <IoMdAdd /> Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {activeModal === 'addMoney' && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add Money</div>
              <IoMdClose className="modal-close-icon" onClick={closeModal} />
            </div>
            <div className="modal-body">
              <div className="view-profile-header">
                <img src={selectedMember.avatar} alt="avatar" className="profile-avatar" />
                <h3>{selectedMember.name}</h3>
              </div>
             
              <div className="form-group">
                <label>Enter Amount</label>
                <input 
                  type="number" 
                  placeholder="Enter Text" 
                  value={addMoneyForm.amount}
                  onChange={(e) => setAddMoneyForm({ ...addMoneyForm, amount: e.target.value })}
                />
              </div>
               <div className="form-group">
                <label>Conversion Currency</label>
                <select 
                  value={addMoneyForm.currency}
                  onChange={(e) => setAddMoneyForm({ ...addMoneyForm, currency: e.target.value })}
                >
                  <option>Dollars</option>
                  <option>Rupees</option>
                  <option>Euros</option>
                  <option>Pounds</option>
                </select>
              </div>
              <p className="conversion-note">
                {addMoneyForm.amount && `Amount enter ₹ ${(parseFloat(addMoneyForm.amount) * 89).toLocaleString()} converted amount $${parseFloat(addMoneyForm.amount).toLocaleString()}`}
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}><IoMdClose /> Cancel</button>
              <button className="btn-submit" onClick={handleAddMoney}><IoMdAdd /> Add Money</button>
            </div>
          </div>
        </div>
      )}

      {/* View Dashboard Modal */}
      {activeModal === 'viewDashboard' && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-md view-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close-wrapper">
               <IoMdClose className="modal-close-icon" onClick={closeModal} />
            </div>
            
            <div className="modal-body">
              <div className="view-profile-header">
                <img src={selectedMember.avatar} alt="avatar" className="profile-avatar-large" />
                <div>
                  <h3 className="profile-name">{selectedMember.name}</h3>
                  <p className="profile-balance">Balance: ${selectedMember.balance || 0}</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">User ID</span>
                  <span className="detail-value">{selectedMember.memberId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Password</span>
                  <span className="detail-value">{selectedMember.password}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedMember.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone No</span>
                  <span className="detail-value">{selectedMember.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pan Card No</span>
                  <div className="detail-value-wrapper">
                     <span className="detail-value">{selectedMember.panCard}</span>
                     <div className="id-box">
                       <div className="id-card-placeholder">
                         <span className="placeholder-text">PAN Front</span>
                       </div>
                       <div className="id-card-placeholder">
                         <span className="placeholder-text">PAN Back</span>
                       </div>
                     </div>
                  </div>
                </div>
                <div className="detail-row">
                   <span className="detail-label">Aadhar No</span>
                   <div className="detail-value-wrapper">
                     <span className="detail-value">{selectedMember.aadhar}</span>
                     <div className="id-box">
                       <div className="id-card-placeholder">
                         <span className="placeholder-text">Aadhar Front</span>
                       </div>
                       <div className="id-card-placeholder">
                         <span className="placeholder-text">Aadhar Back</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="modal-footer modal-footer-center">
              <button className="btn-action-secondary" onClick={() => {
                closeModal();
                toast.success(`Edit ${selectedMember.name}`);
              }}>
                <MdEdit /> Edit
              </button>
              <button className="btn-action-danger" onClick={() => {
                closeModal();
                handleDeleteMember(selectedMember);
              }}>
                <MdDeleteOutline /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;