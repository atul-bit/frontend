import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date_of_birth: '',
    address: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        date_of_birth: employee.date_of_birth || '',
        address: employee.address || '',
        image: null
      });
      setPreview(employee.image || '');
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.name)) newErrors.name = 'Only letters and spaces allowed';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label>Name*</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email*</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="date-input"
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {(preview || (employee?.image && !formData.image)) && (
          <div className="image-preview">
            <img 
              src={preview || `http://localhost:5000${employee.image}`}
              alt="Preview"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {employee ? 'Update' : 'Create'} Employee
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;