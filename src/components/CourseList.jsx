import Course from "./Course"
import "./CourseList.css"

const CourseList = ({courses}) => (
  <div className="course-list">
    {Object.values(courses).map((courseinfo) => (
      <Course key={courseinfo.number} course={courseinfo} />
    ))}
  </div>
)

export default CourseList;