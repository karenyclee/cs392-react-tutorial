import Course from "./Course"
import "./CourseList.css"

const CourseList = ({courses}) => {
  return(
    <div className="course-list">
      {Object.entries(courses).map(([id, courseinfo]) => 
        <Course key={id} courseinfo={courseinfo} />
      )}
    </div>
  );
};


export default CourseList;