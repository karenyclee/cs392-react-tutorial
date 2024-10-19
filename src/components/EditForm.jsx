import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formValidation } from '../utilities/EditFormValidation';
import './EditForm.css';

const InputField = ({name, text, state, change, error}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} value={state[name]} onChange={change}/>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

const EditForm = ({course}) => {
  const { term, number, title, meets } = course || {};
  const navigate = useNavigate();
  const [state, setState] = useState({
    values: {title: title, meets: meets},
    errors: {},
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previous) => ({...previous, 
      values: {...previous.values,[name]: value}
    }))
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = formValidation(state.values);
    if (Object.keys(validationErrors).length > 0) {
      setState((previous) => ({...previous, errors: validationErrors}));
      return;
    }
    setState((previous) => ({...previous, errors: {}}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='mb-3'>Edit Course - {term} CS {number}</h4>
      <InputField name="title" text="Course Title: " state={state.values} change={handleChange} error={state.errors.title} />
      <InputField name="meets" text="Course Meets: " state={state.values} change={handleChange} error={state.errors.meets} />
      <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn btn-primary me-auto">Submit</button>
      </div>
    </form>
  );
};

export default EditForm;