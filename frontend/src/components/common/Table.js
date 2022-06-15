import React from "react";

function Table({ listOfItem,onUpdate,onRemove,student=false }) {
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {listOfItem.length > 0 &&
              Object.keys(listOfItem[0]).map((head,key) => !['id','staffID','password','studentID'].includes(head) && <th key={key} scope="col">{head.toUpperCase()}</th> )}
            {(listOfItem.length > 0 && !student)&& <th scope="col">ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {listOfItem?.map((item,key) => (
            <tr key={key}>
              {Object.keys(item).map((contentHead,no) => (
                !['id','staffID','password','studentID'].includes(contentHead)&& <td key={no}>{item[contentHead]}</td>
              ))}
              <td style={{width:'250px'}}>
                 {(!item.enrolTime && !student )&& <button onClick={() =>onUpdate(item)} className="btn btn-primary  ml-3" >Update</button>}
                  {!student && <button onClick={() =>onRemove(item)} className="btn btn-danger  ml-3">Remove</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
