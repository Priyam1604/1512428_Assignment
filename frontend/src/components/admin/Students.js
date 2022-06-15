import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../request";
import Table from "../common/Table";
import EnrollClass from "./EnrollClass";
import ManageStudents from "./ManageStudents";



function Students() {
  const navigator = useNavigate()
  const initial = {
    studentID: "",
    first_name: "",
    first_name: "",
    email: "",
    DOB: "",
    password: "",
  };
  const [lists, setLists] = useState([]);
  const [changeInfo, setChangeInfo] = useState(initial);
  const [manageMode, setManageMode] = useState(false);
  const [enroll, setEnroll] = useState(false);
  const getStudents = async () => {
    const { ok, data } = await apiClient.get("student/");
    if (ok) {
      setLists(data.students);
      setManageMode(false);
      enroll && navigator('/admin/enrolls')
      setChangeInfo(initial);
    }
  };

  const onUpdate = async (obj) => {
    const { ok } = await apiClient.put("student/", obj);
    if (ok) {
      getStudents();
    }
  };

  const onRemove = async ({ studentID }) => {
    const { ok } = await apiClient.delete("student/", { studentID });
    if (ok) {
      getStudents();
    }
  };

  const onCreate = async (obj) => {
    const { ok } = await apiClient.post("student/", obj);
    if (ok) {
      getStudents();
    }
  };

  const onEnroll = async (obj) => {
    const { ok } = await apiClient.post("enroll/", obj);
    if (ok) {
      getStudents();
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Students</h1>
      <div className="row">
        {(!manageMode && !enroll )&& (
          <div>
            <button
              className="btn btn-info mb-3"
              onClick={() => setManageMode(true)}
            >
              Create student
            </button>
            <button
              className="btn btn-info mb-3 ml-4"
              onClick={() => setEnroll(true)}
            >
              Enroll student
            </button>
          </div>
        )}
        {enroll ? (
          <EnrollClass
            setCancel={setEnroll}
            info={{ student_id: "", class_id: "" }}
            onCreate={onEnroll}
            students={lists}
          />
        ) : manageMode ? (
          <ManageStudents
            setCancel={setManageMode}
            info={changeInfo}
            onCreate={onCreate}
            onUpdate={onUpdate}
            isUpdate={changeInfo.studentID == "" ? false : true}
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

export default Students;
