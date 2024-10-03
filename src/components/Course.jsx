import "./Course.css"

const Course = ({courseinfo}) => (
  <div className = "course-body">
    <div>
      <h5>
        {courseinfo.term} CS {courseinfo.number}
      </h5>
      <p>{courseinfo.title}</p>
      <div className = "course-bottom">
        <p>{courseinfo.meets}</p>
      </div>
    </div>
  </div>
)

export default Course;