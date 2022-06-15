import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";
import ManageClass from "./ManageClass";

function Class() {
  const initial = { id: "", number: "", course: "", lecturer_details: '' };
  const [lists, setLists] = useState([]);
  const [changeInfo, setChangeInfo] = useState(initial);
  const [manageMode, setManageMode] = useState(false);

  const getClass = async () => {
    const { ok, data } = await apiClient.get("class/");
    if (ok) {
      setLists(data.classes);
      setManageMode(false);
      setChangeInfo(initial);
    }
  };

  const onUpdate = async (obj) => {
    const { ok } = await apiClient.put("class/", obj);
    if (ok) {
      getClass();
    }
  };

  const onRemove = async ({ id }) => {
    const { ok } = await apiClient.delete("class/", { id });
    if (ok) {
      getClass();
    }
  };

  const onCreate = async (obj) => {
    const { ok } = await apiClient.post("class/", obj);
    if (ok) {
      getClass();
    }
  };

  useEffect(() => {
    getClass();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Classes</h1>
      {!manageMode && (
        <button
          className="btn btn-info mb-3"
          onClick={() => setManageMode(true)}
        >
          Create new Class
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
        <ManageClass
          setCancel={setManageMode}
          info={changeInfo}
          onCreate={onCreate}
          onUpdate={onUpdate}
          isUpdate={changeInfo.id == "" ? false : true}
        />
      )}
    </>
  )
}

export default Class