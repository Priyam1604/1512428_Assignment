import React, { useState } from "react";

function ManageMark({ setCancel, onUpdate }) {
  const [mark, setMark] = useState();

  const handleUpdate = (event) => {
    event.preventDefault()
    onUpdate(mark)
  }
  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">
            Add Grade
          </h3>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Grade</label>
            <input
              required
              type="text"
              className="form-control"
              name="number"
              value={mark}
              onChange={({target:{value}}) => setMark(value)}
            />
          </div>
    
          <button onClick={handleUpdate} className="btn btn-primary">
            Create
          </button>
          <button
            type="submit"
            onClick={() => setCancel(false)}
            className="btn btn-danger ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageMark;
