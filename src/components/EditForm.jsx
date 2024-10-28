import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formValidation } from '../utilities/EditFormValidation';
import './EditForm.css';
import { useDbUpdate } from '../utilities/firebase';

const InputField = ({name, text, state, change, error}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} value={state} onChange={change}/>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

const EditForm = ({course, id}) => {
  const { term, number, title='', meets='' } = course || {};
  const navigate = useNavigate();
  const [updateCourse] = useDbUpdate(`/cs-courses/courses/${id}`);
  const [state, setState] = useState(
    {title, meets}
  );
  const [validationErrors, setValidationErrors] = useState({ title: "", meets: "" });
  const [noChange, setNoChange] = useState(false);

  const oldTitle = title;
  const oldMeets = meets;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previous) => ({ ...previous, [name]: value }));
    setNoChange(false);
    const errors = formValidation({ ...state, [name]: value });
    setValidationErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = formValidation(state);
    if (errors.title || errors.meets) {
      setValidationErrors(errors);
      return;
    }
    const changes = (state.title !== oldTitle || state.meets !== oldMeets);
    if (changes) {
      try {
        await updateCourse(state);
        navigate(-1);
      } catch (error) {
        console.error('Error changing course: ', error);
      }
    } else {
      setNoChange(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='mb-3'>Edit Course - {term} CS {number}</h4>
      <InputField name="title" text="Course Title: " state={state.title} change={handleChange} error={validationErrors.title} />
      <InputField name="meets" text="Course Meets: " state={state.meets} change={handleChange} error={validationErrors.meets} />
      {noChange && (
        <div className="alert alert-warning" role="alert">
          No change was made, click cancel to go back.
        </div>
      )}
      <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn btn-primary me-auto">Submit</button>
      </div>
    </form>
  );
};

export default EditForm;