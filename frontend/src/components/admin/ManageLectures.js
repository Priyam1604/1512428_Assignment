import React,{useState} from "react";

function ManageLectures({
  info,
  setCancel,
  onUpdate,
  onCreate,
  isUpdate = false,
}) {
  const [change, setChange] = useState(info);

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(change);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    onCreate(change);
  };

  const handleChange = ({ target: { value, name } }) => {
    const oldvalue = { ...change };
    oldvalue[name] = value;
    setChange(oldvalue);
  };
  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">
            {isUpdate ? "Update lecture" : "Create lecture"}{" "}
          </h3>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input
              required
              type="text"
              className="form-control"
              name="first_name"
              value={change.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input
              required
              type="text"
              className="form-control"
              name="last_name"
              value={change.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              required
              type="text"
              className="form-control"
              name="email"
              value={change.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">DOB</label>
            <input
              required
              type="date"
              className="form-control"
              name="DOB"
              value={change.DOB}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Password</label>
            <input
              required
              type="password"
              className="form-control"
              name="password"
              value={change.password}
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
}

export default ManageLectures;
