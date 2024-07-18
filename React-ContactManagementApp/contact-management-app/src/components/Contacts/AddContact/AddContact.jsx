import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    mobile: '',
    email: '',
    company: '',
    title: '',
    group: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/contacts/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response after adding contact:', response.data);
      alert('Contact added!');
      setFormData({
        name: '',
        photo: '',
        mobile: '',
        email: '',
        company: '',
        title: '',
        group: '',
      });
    } catch (error) {
      console.error('Error adding contact: ', error);
      alert('Error adding contact! Please try again.',error);
    }
  };

  return (
    <section className="add-contact p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h4 text-success fw-bold">Create Contact</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Photo URL"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <select
                  className="form-control"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                >
                  <option value="">Select a Group</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="colleagues">Colleagues</option>
                </select>
              </div>
              <div className="mb-2">
                <input type="submit" className="btn btn-success" value="Create" />
                <Link to="/contacts/list" className="btn btn-dark ms-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddContact;
