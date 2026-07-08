import React, { useState, forwardRef, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [charRemaining, setCharRemaining] = useState(100);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'message') setCharRemaining(100 - value.length);
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form submitted successfully!\n' + JSON.stringify(formData, null, 2));
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgb(14, 31, 78)';
    e.target.style.boxShadow = '0 0 0 3px rgba(14, 31, 78, 0.1)';
  };
  const handleBlur = (e) => {
    if (!e.target.value && e.target.required) {
      e.target.style.borderColor = '#e63946';
    } else {
      e.target.style.borderColor = '#ccc';
    }
    e.target.style.boxShadow = 'none';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const el = document.querySelector('.contact-form-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-form-section fade-in" ref={ref}>
      <h2 className="form-heading">Have Questions About Planetary Science?</h2>
      <p className="form-subheading">
        Interested in learning more about space, astronomy, or how planetary data is collected and analyzed?
        Reach out and we'll get back to you.
      </p>

      <form id="contact-form" onSubmit={handleSubmit}>

        {/* Row 1: Full Name + Email */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Full Name<span className="required-field">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Email<span className="required-field">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        {/* Row 2: Phone Number + Message */}
        <div className="form-row form-row--stretch">
          <div className="form-group">
            <label className="form-label">
              Phone Number<span className="required-field">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Please enter a valid phone number."
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Message<span className="required-field">*</span>
            </label>
            <textarea
              name="message"
              className="form-textarea"
              maxLength="100"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <div className="char-counter">{charRemaining} characters</div>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
        </div>

        {/* Submit */}
        <div className="submit-container">
          <button type="submit" className="submit-button">
            Submit <span className="submit-arrow">&#x203A;</span>
          </button>
        </div>

      </form>
    </div>
  );
});

export default ContactForm;