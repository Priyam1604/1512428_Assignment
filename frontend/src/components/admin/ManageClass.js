import React,{useState,useEffect} from "react";
import apiClient from "../../request";

function ManageClass({
  info,
  setCancel,
  onUpdate,
  onCreate,
  isUpdate = false,
}) {
  const [change, setChange] = useState(info);
  const [lecturers,setLecturers] = useState([])
  const [courses,setCourses] = useState([])


  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(change);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if(change.course == '' || change.number == '' || change.lecturer_details == '') return alert('please fill details')
    onCreate(change);
  };

  const handleChange = ({target:{value,name}}) => {
    const oldvalue = {...change}
    oldvalue[name] = value
    setChange(oldvalue)
  }


  const getInfo = async () => {
    const {ok,data} = await apiClient.get("classbaseinfo/");
    if(ok){
        setCourses(data.info.courses)
        setLecturers(data.info.teachers)
    }
  };


  useEffect(() => {
    getInfo()
  },[])

  return (
    <div className="card container mt-5 col-md-6 shadow">
      <div className="card-body">
        <form>
          <h3 className="mb-4">
            {isUpdate ? "Update Class" : "Create Class"}{" "}
          </h3>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Number</label>
            <input
              required
              type="text"
              className="form-control"
              name="number"
              value={change.number}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Course</label>
            <select id="inputState" class="form-control" name="course" required value={change.course} onChange={handleChange}>
                <option selected defaultValue=''>Choose course</option>
                {courses.map(item => <option value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Lecturer</label>
            <select id="inputState" class="form-control" name="lecturer_details" required value={change.lecturer_details} onChange={handleChange}>
                <option selected defaultValue=''>Choose Lecturer</option>
                {lecturers.map(item => <option value={item.email}>{item.first_name} {item.last_name}</option>)}
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
}

export default ManageClass;
