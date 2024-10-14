import './Modal.css';

const Modal = ({ children, open, close }) => (
  <div
    className={`modal ${open ? 'modal-show' : ''}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={close}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children.length === 0 ? (
            <p>No courses selected. Please click on the courses to select them.</p>
          ):(
            <div>
              {children.map((courseinfo) => (
                <div key={courseinfo.number}>
                  <h4>CS {courseinfo.number}</h4>
                  <h5>{courseinfo.term} CS {courseinfo.number}: {courseinfo.title}</h5>
                  <p>{courseinfo.meets}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
