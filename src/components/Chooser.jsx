import { useState } from 'react';
import SelectTerm from "./SelectTerm";
import CourseList from "./CourseList";
import Modal from './Modal';

// course page
const Chooser = ({courses}) => {
  const [choice, setChoice] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-dark top-right-button" onClick={openModal}>
          <i className="bi bi-cart4">Course Plan</i>
        </button>
      </div>

      <SelectTerm selection={choice} setSelection={setChoice}/>
      <CourseList courses={courses} term={choice} selected={selected} toggleSelected={toggleSelected}/>
      <Modal children={selected.map(key => courses[key])} open={open} close={closeModal}></Modal>
    </>
  );
};

export default Chooser;
