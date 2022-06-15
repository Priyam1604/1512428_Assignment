import React, { useEffect, useState } from "react";
import apiClient from "../../request";

export const ManageCourse = ({
  info,
  setCancel,
  onUpdate,
  onCreate,
  isUpdate = false,
}) => {
  const [change, setChange] = useState(info);
  const [semesters, setSemesters] = useState([]);

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(change);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if(change.code == '' || change.name == '' || change.semesters.length  == 0) return alert('Please fill fields')
    onCreate(change);
  };

  const handleChange = ({ target: { value, name } }) => {
    const oldvalue = { ...change };
    oldvalue[name] = value;
    setChange(oldvalue);
  };

  const handleSemesterChange = ({target:{value}}) => {
    if(value){
        const oldvalue = {...change}
        try {
            oldvalue['semesters'].push(value)
            setChange(oldvalue)
        } catch (error) {
            oldvalue['semesters'] = []
            oldvalue['semesters'].push(value)
            setChange(oldvalue)
        }
    }
  }

  const getSemesters = async () => {
    const {ok,data} = await apiClient.get("semester/");
    if(ok){
        setSemesters(data.semesters)
    }
  };


  useEffect(() => {
    getSemesters()
  },[])

  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">
            {isUpdate ? "Update course" : "Create course"}{" "}
          </h3>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Code</label>
            <input
              required
              type="text"
              className="form-control"
              name="code"
              value={change.code}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Name</label>
            <input
              required
              type="text"
              className="form-control"
              name="name"
              value={change.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Semesters</label>
            <select
              multiple
              required
              name="semester"
              onChange={handleSemesterChange}
              value={change.semesters}
              className="form-control"
              id="exampleFormControlSelect2"
            >
              {semesters?.map(item => (
                  <option value={item.id}>{item.semester}</option>
              ))}
            </select>
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
