import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_API = 'http://localhost:5000/api/students';

function App() {
  const [studentsList, setStudentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [className, setClassName] = useState('');

  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Search functionality state
  const [filterText, setFilterText] = useState('');

  // Sort functionality state
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Load student data on component mount
  useEffect(() => {
    loadAllStudents();
  }, []);

  const loadAllStudents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BACKEND_API);
      setStudentsList(res.data);
      setErrorMsg(null);
    } catch (err) {
      console.error("Failed to retrieve students:", err);
      setErrorMsg("Unable to connect to server. Please verify backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFormInputs = () => {
    setFullName('');
    setStudentAge('');
    setClassName('');
    setCurrentEditId(null);
  };

  const showCreateDialog = () => {
    clearFormInputs();
    setDisplayAddForm(true);
  };

  const hideCreateDialog = () => {
    setDisplayAddForm(false);
    clearFormInputs();
  };

  // Create new student record
  const submitNewStudent = async (e) => {
    e.preventDefault();
    if (!fullName || !studentAge || !className) return;

    const studentData = {
      name: fullName,
      age: Number(studentAge),
      class: className
    };

    try {
      const res = await axios.post(BACKEND_API, studentData);
      setStudentsList(prevList => [...prevList, res.data]);
      hideCreateDialog();
      alert('Student added successfully!');
    } catch (err) {
      console.error("Failed to add student:", err);
      alert('Error occurred while adding student!');
    }
  };

  // Open edit dialog with student data
  const showUpdateDialog = (studentData) => {
    setCurrentEditId(studentData._id);
    setFullName(studentData.name);
    setStudentAge(studentData.age);
    setClassName(studentData.class);
    setDisplayEditForm(true);
  };

  const hideUpdateDialog = () => {
    setDisplayEditForm(false);
    clearFormInputs();
  };

  // Update existing student record
  const submitUpdatedStudent = async (e) => {
    e.preventDefault();
    if (!currentEditId) return;

    const updatedData = {
      name: fullName,
      age: Number(studentAge),
      class: className
    };

    try {
      const res = await axios.put(`${BACKEND_API}/${currentEditId}`, updatedData);
      setStudentsList(prevList => prevList.map(item => item._id === currentEditId ? res.data : item));
      hideUpdateDialog();
      alert('Student updated successfully!');
    } catch (err) {
      console.error("Failed to update:", err);
      alert('Error occurred while updating student!');
    }
  };

  // Remove student from database
  const removeStudentRecord = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`${BACKEND_API}/${studentId}`);
      setStudentsList(prevList => prevList.filter(item => item._id !== studentId));
      alert('Student deleted successfully!');
    } catch (err) {
      console.error("Failed to delete:", err);
      alert('Error occurred while deleting student!');
    }
  };

  // Filter students by name search
  const searchResults = studentsList.filter(student =>
    student.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort students alphabetically
  const finalStudentList = [...searchResults].sort((first, second) => {
    const firstName = first.name.toLowerCase();
    const secondName = second.name.toLowerCase();
    if (firstName < secondName) return ascendingOrder ? -1 : 1;
    if (firstName > secondName) return ascendingOrder ? 1 : -1;
    return 0;
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Student Information Management</h1>

        {/* Add new student button */}
        <div className="action-bar">
          <button onClick={showCreateDialog} className="btn-add-new">
            ➕ Create New Record
          </button>
        </div>

        {/* Search functionality */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by student name..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Sort controls */}
        <div className="sort-section">
          <button onClick={() => setAscendingOrder(prev => !prev)} className="btn-sort">
            🔄 Order: {ascendingOrder ? 'A → Z' : 'Z → A'}
          </button>
          <span className="result-count">
            Showing {finalStudentList.length} of {studentsList.length} records
          </span>
        </div>

        {/* Display student records */}
        {isLoading ? (
          <p className="message">⏳ Loading data, please wait...</p>
        ) : errorMsg ? (
          <p className="error">{errorMsg}</p>
        ) : finalStudentList.length === 0 ? (
          <p className="message">
            {filterText ? '⚠️ No matching students found.' : '📄 No student records available yet.'}
          </p>
        ) : (
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {finalStudentList.map((record, idx) => (
                  <tr key={record._id}>
                    <td>{idx + 1}</td>
                    <td>{record.name}</td>
                    <td>{record.age}</td>
                    <td>{record.class}</td>
                    <td className="action-buttons">
                      <button 
                        onClick={() => showUpdateDialog(record)} 
                        className="btn-edit"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => removeStudentRecord(record._id)} 
                        className="btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create new student dialog */}
      {displayAddForm && (
        <div className="modal-overlay" onClick={hideCreateDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎓 Create New Student</h2>
              <button className="btn-close" onClick={hideCreateDialog}>✕</button>
            </div>
            <form onSubmit={submitNewStudent} className="modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter student's full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Class *</label>
                <input
                  type="text"
                  placeholder="Enter class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={hideCreateDialog} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  ✔️ Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update student dialog */}
      {displayEditForm && (
        <div className="modal-overlay" onClick={hideUpdateDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Edit Student Details</h2>
              <button className="btn-close" onClick={hideUpdateDialog}>✕</button>
            </div>
            <form onSubmit={submitUpdatedStudent} className="modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter student's full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Class *</label>
                <input
                  type="text"
                  placeholder="Enter class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={hideUpdateDialog} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  💾 Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
