import { forwardRef, useEffect } from "react";
import { useImmer } from "use-immer";

const LinkFormComponent = forwardRef(({ link, onSaveLink, ...props }, ref) => {
  const [formData, setFormData] = useImmer({
    link: "",
    title: "",
  });
  // ref handler event
  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setFormData({ link: "", title: "" });
      });
    }
  }, [ref]);
  // watch change for link
  useEffect(() => {
    if (link) {
      setFormData(() => {
        return link;
      });
    }
  }, [link]);
  // watch change for fields
  const onFieldChange = (e) => {
    setFormData((v) => {
      v[e.target.name] = e.target.value;
    });
  };
  const onSaveChanges = () => {
    onSaveLink(formData);
    // close modal
  };

  return (
    <div id="LinkFormComponent" className="modal" tabIndex="-1" ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{link ? "Edit Link" : "Add Link"}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Link</label>
              <input
                type="link"
                name="link"
                className="form-control"
                value={formData.link}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={onFieldChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

LinkFormComponent.displayName = "LinkFormComponent";

export default LinkFormComponent;
