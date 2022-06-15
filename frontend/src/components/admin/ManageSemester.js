import React, { useState } from "react";

export const ManageSemester = ({ info, setCancel, onUpdate, onCreate,isUpdate=false }) => {
  const [change, setChange] = useState(info);

  const handleUpdate = (event) => {
      event.preventDefault()
    onUpdate(change)
  }

  const handleCreate = (event) =>{
    event.preventDefault()
    onCreate(change)
  }

  const handleChange = ({target:{value,name}}) => {
    const oldvalue = {...change}
    oldvalue[name] = value
    setChange(oldvalue)
  }
  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">
            {isUpdate ? "Update semster" : "Create semester"}{" "}
          </h3>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Semester</label>
            <input
              required
              type="text"
              className="form-control"
              name="semester"
              value={change.semester}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Year</label>
            <input
              required
              type="text"
              className="form-control"
              name="year"
              value={change.year}
              onChange={handleChange}
            />
          </div>
          {isUpdate ? (
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>
          ) : (
            <button onClick={handleCreate} className="btn btn-primary">
              Create
            </button>
          )}
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
};
