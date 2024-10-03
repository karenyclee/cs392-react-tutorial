const CourseList = ({courses}) => (
  <div>
    {Object.values(courses).map((courseinfo) => (
      <p>
        {courseinfo.term} CS {courseinfo.number}: {courseinfo.title}
      </p>
    ))}
  </div>
)

export default CourseList;