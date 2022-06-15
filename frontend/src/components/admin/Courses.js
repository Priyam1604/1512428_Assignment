import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";
import { ManageCourse } from "./ManageCourse";

function Courses() {
  const initial = { id: "", code: "", name: "", semesters: [] };
  const [lists, setLists] = useState([]);
  const [changeInfo, setChangeInfo] = useState(initial);
  const [manageMode, setManageMode] = useState(false);

  const getCourses = async () => {
    const { ok, data } = await apiClient.get("course/");
    if (ok) {
      setLists(data.courses);
      setManageMode(false);
      setChangeInfo(initial);
    }
  };

  const onUpdate = async (obj) => {
    const { ok } = await apiClient.put("course/", obj);
    if (ok) {
      getCourses();
    }
  };

  const onRemove = async ({ id }) => {
    const { ok } = await apiClient.delete("course/", { id });
    if (ok) {
      getCourses();
    }
  };

  const onCreate = async (obj) => {
    const { ok } = await apiClient.post("course/", obj);
    if (ok) {
      getCourses();
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Courses</h1>
      {!manageMode && (
        <button
          className="btn btn-info mb-3"
          onClick={() => setManageMode(true)}
        >
          Create new course
        </button>
      )}

      {!manageMode ? (
        <Table
          listOfItem={lists}
          onUpdate={(obj) => {
            setChangeInfo(obj), setManageMode(true);
          }}
          onRemove={onRemove}
        />
      ) : (
        <ManageCourse
          setCancel={setManageMode}
          info={changeInfo}
          onCreate={onCreate}
          onUpdate={onUpdate}
          isUpdate={changeInfo.id == "" ? false : true}
        />
      )}
    </>
  );
}

export default Courses;
