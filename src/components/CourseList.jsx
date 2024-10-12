import Course from "./Course"
import "./CourseList.css"
import "./SelectTerm"

const CourseList = ({courses, term, selected, toggleSelected}) => {
    const filtered = Object.entries(courses).filter(
      ([id, course]) => course.term === term);
    
    return(
      <div className="course">
        {filtered.map(([id, courseinfo]) => (
          <div 
            key={id}
            className={`course ${selected.includes(id) ? 'selected' : ''}`}
            onClick={() => toggleSelected(id)}
          >
            <div className="course-body">
              <h5>
                {courseinfo.term} CS {courseinfo.number}
              </h5>
              <p>{courseinfo.title}</p>
              <div className = "course-bottom">
                <p>{courseinfo.meets}</p>
              </div>
              </div>
          </div>
        ))}
      </div>
    );
};

export default CourseList;