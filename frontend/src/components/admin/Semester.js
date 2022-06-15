import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";
import { ManageSemester } from "./ManageSemester";

function Semester() {
  const initial = { id: "", semester: "", year: "" };
  const [lists, setLists] = useState([]);
  const [changeInfo, setChangeInfo] = useState(initial);
  const [manageMode, setManageMode] = useState(false);

  const getSemesters = async () => {
    const { ok, data } = await apiClient.get("semester/");
    if (ok) {
      setLists(data.semesters);
      setManageMode(false);
      setChangeInfo(initial);
    }
  };

  const onUpdate = async (obj) => {
    const { ok } = await apiClient.put("semester/", obj);
    if (ok) {
      getSemesters();
    }
  };

  const onRemove = async ({ id }) => {
    const { ok } = await apiClient.delete("semester/", { id });
    if (ok) {
      getSemesters();
    }
  };

  const onCreate = async (obj) => {
    const { ok } = await apiClient.post("semester/", obj);
    if (ok) {
      getSemesters();
    }
  };

  useEffect(() => {
    getSemesters();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Semesters</h1>
      <div className="row">
        {!manageMode && (
          <button
            className="btn btn-info mb-3"
            onClick={() => setManageMode(true)}
          >
            Create semester
          </button>
        )}
        {manageMode ? (
          <ManageSemester
            setCancel={setManageMode}
            info={changeInfo}
            onCreate={onCreate}
            onUpdate={onUpdate}
            isUpdate={changeInfo.semester == "" ? false : true}
          />
        ) : (
          <Table
            listOfItem={lists}
            onRemove={onRemove}
            onUpdate={(obj) => {
              setChangeInfo(obj), setManageMode(true);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Semester;
