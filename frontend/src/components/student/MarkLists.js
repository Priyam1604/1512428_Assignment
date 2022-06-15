import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";

function MarkLists() {
  const [lists, setLists] = useState([]);
  const getInfo = async () => {
    const { ok, data } = await apiClient.get("gradebook/");
    if (ok) {
      setLists(data.marks);
    }
  };
  useEffect(() => {
    getInfo();
  },[]);
  return (
    <>
      <h1 className="text-center mt-4">Marks</h1>
      <Table
        listOfItem={lists}
        onUpdate={() => {}}
        onRemove={() => {}}
        student={true}
      />
    </>
  );
}

export default MarkLists;
