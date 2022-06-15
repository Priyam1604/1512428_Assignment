import React, { useEffect, useState } from "react";
import apiClient from "../../request";
import Table from "../common/Table";
import ManageLectures from "./ManageLectures";

function Lecturers() {
  const initial = { staffID:'',first_name: "", last_name: "",email:'',DOB:'',password:'' }
  const [lists, setLists] = useState([]);
  const [changeInfo, setChangeInfo] = useState(initial);
  const [manageMode, setManageMode] = useState(false);

  const getLecturers = async () => {
    const {ok,data} = await apiClient.get("lecturer/");
    if(ok){
      setLists(data.lecturers)
      setManageMode(false)
      setChangeInfo(initial)
    }
  };

  const onUpdate = async(obj) => {
    const {ok} = await apiClient.put('lecturer/',obj)
    if(ok){
      getLecturers()
    }
  };

  const onRemove = async({staffID}) => {
    const {ok} = await apiClient.delete('lecturer/',{staffID})
    if(ok){
      getLecturers()
    }
  };

  

 

  const onCreate = async (obj) => {
    const {ok} = await apiClient.post("lecturer/", obj);
    if(ok){
      getLecturers()
    }
  };

  useEffect(() => {
    getLecturers()
  }, []);
  return (
    <>
      <h1 className="text-center mt-4">Lecturers</h1>
      <div className="row">
      {!manageMode && (
        <button
          className="btn btn-info mb-3"
          onClick={() => setManageMode(true)}
        >
          Create a lecture
        </button>
      )}
      {manageMode ? (
        <ManageLectures
          setCancel={setManageMode}
          info={changeInfo}
          onCreate={onCreate}
          onUpdate={onUpdate}
          isUpdate={changeInfo.staffID == '' ? false : true}
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
    
  )
}

export default Lectures