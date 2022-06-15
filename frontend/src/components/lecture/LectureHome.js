import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";
import ManageMark from "./ManageMark";

function LectureHome() {
  const [lists, setLists] = useState([]);
  const [manageMode, setManageMode] = useState();

  const getInfo = async () => {
    const { ok, data } = await apiClient.get("lecturerbook/");
    if (ok) {
      setLists(data.enrolls);
    }
  };

  const handleUpdate = async (mark) => {
    const { ok, data } = await apiClient.put("lecturerbook/", {
      mark,
      st_id: manageMode.id,
    });
    if (ok) {
      getInfo();
      setManageMode(false)
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Student Lists</h1>
      {!manageMode ? (
        <Table
          listOfItem={lists}
          onUpdate={(obj) => {
            setManageMode(obj);
          }}
          onRemove={() => {}}
          student={false}
        />
      ) : (
        <ManageMark
          book={manageMode}
          setCancel={setManageMode}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default LectureHome;
