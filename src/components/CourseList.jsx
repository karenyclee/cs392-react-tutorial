import Course from "./Course"
import "./CourseList.css"
import "./SelectTerm"

const CourseList = ({courses, term}) => {

  const filtered = Object.entries(courses).filter(
    ([id, courseinfo]) => courseinfo.term === term
  );

  return(
    <div className="course-list">
      {filtered.map(([id, courseinfo]) => 
        <Course key={id} courseinfo={courseinfo} />
      )}
    </div>
  );
};


export default CourseList;