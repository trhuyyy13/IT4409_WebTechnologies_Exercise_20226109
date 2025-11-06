import React, { useState, useEffect } from 'react';

function generateMockUsers() {
    const names = [
        'Linh Tran', 'Minh Hoang', 'An Nguyen', 'Hoa Pham', 'Tuan Le', 'Phuc Do',
        'Quynh Vu', 'Dung Bui', 'Khanh Ng', 'Hai Ly', 'Thao Mai', 'Son Pham'
    ];
    return names.map((n, i) => ({
        id: i + 1,
        name: n,
        username: n.split(' ').map(s => s[0].toLowerCase()).join('') + (100 + i),
        email: `${n.split(' ').join('.').toLowerCase()}@example.com`,
        address: { city: ['Hanoi', 'HCMC', 'Da Nang', 'Hue'][i % 4] },
        phone: `+84-9${Math.floor(10000000 + Math.random() * 90000000)}`,
        website: `www.${n.split(' ').join('').toLowerCase()}.vn`
    }));
}

function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        // Simulate API loading, but using our own mock dataset so data is different
        const t = setTimeout(() => {
            setUsers(generateMockUsers());
            setLoading(false);
        }, 600);
        return () => clearTimeout(t);
    }, []);

    // Thêm người dùng mới (đến từ AddUser)
    useEffect(() => {
        if (user) {
            setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
            onAdded();
        }
    }, [user, onAdded]);

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.username.toLowerCase().includes(keyword.toLowerCase())
    );

    // Edit flow
    function editUser(u) {
        setEditing({ ...u, address: { ...(u.address || {}) } });
    }

    function handleEditChange(field, value) {
        if (["street", "suite", "city"].includes(field)) {
            setEditing({ ...editing, address: { ...editing.address, [field]: value } });
        } else {
            setEditing({ ...editing, [field]: value });
        }
    }

    function saveUser() {
        if (!editing) return;
        if (editing.name === "" || editing.username === "") {
            alert("Vui lòng nhập Name và Username!");
            return;
        }
        setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
        setEditing(null);
    }

    function removeUser(id) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }

    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

    return (
        <div>
            {filteredUsers.length === 0 ? (
                <div className="no-data">Không tìm thấy người dùng nào</div>
            ) : (
                <div className="card-grid">
                    {filteredUsers.map((u) => (
                        <div className="user-card" key={u.id}>
                            <div className="user-top">
                                <div className="avatar">{u.name.split(' ').map(n=>n[0]).slice(-2).join('')}</div>
                                <div className="user-meta">
                                    <h3 className="user-name">{u.name}</h3>
                                    <div className="user-username">@{u.username}</div>
                                </div>
                            </div>
                            <div className="user-body">
                                <div className="meta-row"><strong>Email:</strong> {u.email}</div>
                                <div className="meta-row"><strong>City:</strong> {u.address?.city || '-'}</div>
                                <div className="meta-row"><strong>Phone:</strong> {u.phone}</div>
                                <div className="meta-row"><strong>Website:</strong> {u.website}</div>
                            </div>
                            <div className="card-actions">
                                <button className="btn-edit" onClick={() => editUser(u)}>Sửa</button>
                                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal chỉnh sửa */}
            {editing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Chỉnh sửa người dùng</h4>
                        <div className="form-group">
                            <label htmlFor="edit-name">Name:</label>
                            <input
                                id="edit-name"
                                type="text"
                                value={editing.name}
                                onChange={(e) => handleEditChange("name", e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-username">Username:</label>
                            <input
                                id="edit-username"
                                type="text"
                                value={editing.username}
                                onChange={(e) => handleEditChange("username", e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-email">Email:</label>
                            <input
                                id="edit-email"
                                type="email"
                                value={editing.email}
                                onChange={(e) => handleEditChange("email", e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-city">City:</label>
                            <input
                                id="edit-city"
                                type="text"
                                value={editing.address?.city || ''}
                                onChange={(e) => handleEditChange("city", e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-phone">Phone:</label>
                            <input
                                id="edit-phone"
                                type="text"
                                value={editing.phone}
                                onChange={(e) => handleEditChange("phone", e.target.value)}
                            />
                        </div>
                        <div className="form-actions">
                            <button className="btn-save" onClick={saveUser}>Lưu</button>
                            <button className="btn-cancel" onClick={() => setEditing(null)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultTable;
