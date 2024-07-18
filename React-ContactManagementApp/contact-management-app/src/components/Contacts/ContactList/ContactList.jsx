import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contacts/');
    
      setContacts(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error fetching contacts: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
      alert('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact: ', error);
      alert('Error deleting contact! Please try again.');
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/contacts/search?name=${searchQuery}`);
      setContacts(response.data); // Update contacts state with search results
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
      <section className="container-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Management
                  <Link to="/contacts/add" className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row" onSubmit={handleSearch}>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Names"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className="btn btn-outline-dark" value="Search" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-list">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredContacts.map((contact) => (
              <div className="col" key={contact._id}>
                <div className="card h-100">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={contact.photo || 'https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography.png'}
                        alt=""
                        className="contact-img me-3"
                      />
                      <div>
                        <h5 className="card-title mb-1">{contact.name}</h5>
                        <p className="card-text mb-1">Mobile: {contact.mobile}</p>
                        <p className="card-text mb-0">Email: {contact.email}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <Link to={`/contacts/view/${contact._id}`} className="btn btn-warning my-1">
                        <i className="fa fa-eye"></i>
                      </Link>
                      <Link to={`/contacts/edit/${contact._id}`} className="btn btn-primary my-1">
                        <i className="fa fa-pen"></i>
                      </Link>
                      <button className="btn btn-danger my-1" onClick={() => handleDelete(contact._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ContactList;
