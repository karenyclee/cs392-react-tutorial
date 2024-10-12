import { useState } from 'react';
import SelectTerm from "./SelectTerm";
import CourseList from "./CourseList";

const Chooser = ({courses}) => {
  const [choice, setChoice] = useState("Fall");
  const [selected, setSelected] = useState([]);

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );
  return (
    <>
      <SelectTerm selection={choice} setSelection={setChoice}/>
      <CourseList courses={courses} term={choice} selected={selected} toggleSelected={toggleSelected}/>
    </>
  );
};

export default Chooser;