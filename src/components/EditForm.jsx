import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} defaultValue={state.values?.[name]} onChange={change}/>
    <div className="invalid-feedback">{state.errors?.[name]}</div>
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='mb-3'>Edit Course - {term} CS {number}</h4>
      <InputField name="title" text="Course Title: " state={''} change={handleChange} />
      <InputField name="meets" text="Course Meets: " state={''} change={handleChange} />
      <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn btn-primary me-auto">Submit</button>
      </div>
    </form>
  );
};

export default EditForm;