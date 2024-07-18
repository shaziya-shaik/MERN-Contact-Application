// src/components/Contacts/ViewContact.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/contacts/${contactId}`);
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact: ', error);
      }
    };

    fetchContact();
  }, [contactId]);

  return (
    <React.Fragment>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic"></p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-contact mt-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img
                src={
                  contact.photo ||
                  'https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography.png'
                }
                alt=""
                className="contact-img"
              />
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  Name: <span className="fw-bold">{contact.name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Mobile Number: <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Email: <span className="fw-bold">{contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Company: <span className="fw-bold">{contact.company}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Title: <span className="fw-bold">{contact.title}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Group: <span className="fw-bold">{contact.group}</span>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col">
                <Link to="/contacts/list" className="btn btn-warning">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewContact;
