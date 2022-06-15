import React, { useState, useEffect } from "react";
import apiClient from "../../request";

function EnrollClass({ info, setCancel, onCreate, students }) {
  const [change, setChange] = useState(info);
  const [classes, setClasses] = useState([]);

  const handleCreate = (event) => {
    event.preventDefault();
    if (change.class_id == "" || change.student_id == "")
      return alert("please fill details");

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    change["enrolTime"] = dateTime;
    onCreate(change);
  };

  const handleChange = ({ target: { value, name } }) => {
    const oldvalue = { ...change };
    oldvalue[name] = value;
    setChange(oldvalue);
  };

  const getInfo = async () => {
    const { ok, data } = await apiClient.get("class/");
    if (ok) {
      setClasses(data.classes);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">Add Enroll</h3>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Student</label>
            <select
              id="inputState"
              class="form-control"
              name="student_id"
              required
              value={change.student}
              onChange={handleChange}
            >
              <option selected defaultValue="">
                Choose student
              </option>
              {students.map((item) => (
                <option value={item.studentID}>
                  {item.first_name} {item.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Class</label>
            <select
              id="inputState"
              class="form-control"
              name="class_id"
              required
              value={change.class_id}
              onChange={handleChange}
            >
              <option selected defaultValue="">
                Choose class
              </option>
              {classes.map((item) => (
                <option value={item.id}>class-{item.number}</option>
              ))}
            </select>
          </div>
          <button onClick={handleCreate} className="btn btn-primary">
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

export default EnrollClass;
