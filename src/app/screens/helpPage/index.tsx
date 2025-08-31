import React, { ChangeEvent, useState } from "react";
import {
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  HelpOutline,
  Search,
  Email,
  Phone,
  Schedule,
} from "@mui/icons-material";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import "../../../css/helpPage.css";

export default function HelpPage() {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const handleInputChange = (field: any) => (e: any) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="help-page">
      <div className="container">
        <div className="main-content">
          <div className="header">
            <div className="header-content">
              <HelpOutline className="header-icon" />
              <div className="header-title">Help Center</div>
              <div className="header-subtitle">
                Find answers to your questions and get support
              </div>
            </div>
          </div>

          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <Search />
          </div>

          <div className="tabs-container">
            <Tabs
              value={tab}
              onChange={handleTabChange}
              className="custom-tabs"
              centered
            >
              <Tab label="Terms" />
              <Tab label="FAQ" />
              <Tab label="Contact" />
            </Tabs>
          </div>

          <div className="content-container">
            {tab === 0 && (
              <div className="tab-content">
                <div className="content-header">
                  <div className="content-title">Terms & Conditions</div>
                </div>
                <div className="cards">
                  {terms.map((term, index) => (
                    <div className="card" key={index}>
                      <div className="icon">{term.icon}</div>
                      <div className="card-title">{term.title}</div>
                      <div className="card-desc">{term.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 1 && (
              <div className="tab-content">
                <div className="content-header">
                  <div className="content-title">FAQ</div>
                </div>
                <div className="faq-container">
                  {faq.map((item, index) => (
                    <div className="faq-item" key={index}>
                      <div className="faq-question">
                        <span className="faq-icon">{item.icon}</span>
                        {item.question}
                      </div>
                      <div className="faq-answer">{item.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 2 && (
              <div className="tab-content">
                <div className="content-header">
                  <div className="content-title">Contact Us</div>
                </div>
                <div className="contact-wrapper">
                  <div className="contact-info">
                    <div className="contact-item">
                      <Email className="contact-icon" /> support@example.com
                    </div>
                    <div className="contact-item">
                      <Phone className="contact-icon" /> +1 (555) 123-4567
                    </div>
                    <div className="contact-item">
                      <Schedule className="contact-icon" /> Mon-Fri: 9AM-6PM
                    </div>
                  </div>

                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <TextField
                        style={{ marginTop: "10px" }}
                        label="Your Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange("name")}
                      />
                      <TextField
                        style={{ marginTop: "10px" }}
                        label="Your Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                      />
                      <FormControl
                        style={{ marginTop: "10px" }}
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel>Subject</InputLabel>
                        <Select
                          value={formData.subject}
                          onChange={handleInputChange("subject")}
                          label="Subject"
                        >
                          <MenuItem value="">Choose a subject</MenuItem>
                          <MenuItem value="general">General</MenuItem>
                          <MenuItem value="order">Order</MenuItem>
                          <MenuItem value="billing">Billing</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        style={{ marginTop: "15px" }}
                        label="Your Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange("message")}
                      />
                      <button className="submit-button" type="submit">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
