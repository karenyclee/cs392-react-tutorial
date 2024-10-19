import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';
import { checkConflicts } from '../utilities/conflicts';

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  // Filter courses by term
  const filtered = Object.entries(courses).filter(
    ([id, course]) => course.term === term
  );

  return (
    <div className="course">
      {filtered.map(([id, courseinfo]) => {
        const conflict = checkConflicts(courseinfo, selected, courses);
        const alreadySelected = selected.includes(id);
        return (
          <div
            key={id}
            className={`course ${alreadySelected ? "selected" : ""} ${
              conflict && !alreadySelected ? "conflict" : ""
            }`}
            onClick={() => {
              if (alreadySelected || !conflict) {
                toggleSelected(id);
              }
            }}
          >
            <div className="course-body">
              <h5>
                {courseinfo.term} CS {courseinfo.number}
              </h5>
              <p>{courseinfo.title}</p>
              <div className="course-bottom">
                <p>{courseinfo.meets}</p>
              </div>
              <p className="card-text">
                <Link to={`/edit/${id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;