// src/components/Contacts/EditContact.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditContact = () => {
  const { contactId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    mobile: '',
    email: '',
    company: '',
    title: '',
    group: '',
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/contacts/${contactId}`);
        const { name, photo, mobile, email, company, title, group } = response.data;
        setFormData({ name, photo, mobile, email, company, title, group });
      } catch (error) {
        console.error('Error fetching contact: ', error);
      }
    };

    fetchContact();
  }, [contactId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/contacts/update/${contactId}`, formData);
      alert('Contact updated!');
    } catch (error) {
      console.error('Error updating contact: ', error);
      alert('Error updating contact!');
    }
  };

  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-primary fw-bold">Edit Contact</p>
              <p className="first-italic"></p>
            </div>
          </div>
          <div className="row align-items-center">
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
                    placeholder="Photo"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="number"
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
                  <input type="submit" className="btn btn-primary" value="Update" />
                  <Link to="/contacts/list" className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img
                src={
                  formData.photo ||
                  'https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography.png'
                }
                className="contact-img"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default EditContact;
