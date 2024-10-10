import { useState } from 'react';
import SelectTerm from "./SelectTerm";
import CourseList from "./CourseList";

const Chooser = ({courses}) => {
  const [choice, setChoice] = useState("Fall");

  return (
    <>
      <SelectTerm selection={choice} setSelection={setChoice}/>
      <CourseList courses={courses} term={choice}/>
    </>
  );
};

export default Chooser;