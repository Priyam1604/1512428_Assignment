import React, { useState, useEffect } from "react";
import apiClient from "../../request";
import Table from "../common/Table";

function EnrollLists() {
  const [lists, setLists] = useState([]);

  const getInfo = async () => {
    const { ok, data } = await apiClient.get("enroll/");
    if (ok) {
      setLists(data.enrolls);
    }
  };

  const onRemove = async ({ id }) => {
    const { ok } = await apiClient.delete("enroll/", { id });
    if (ok) {
      getInfo();
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <h1 className="text-center mt-4">Student Enrolls</h1>

      <Table listOfItem={lists} onRemove={onRemove} onUpdate={() => {}} />
    </>
  );
}

export default EnrollLists;
