// import React, { useEffect } from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./formdata.css";
import fetchData from "../util/fetchData";
import LoadingIndicator from "./LoadingIndicator";

const FormDataPage = () => {

  
  const { data, isPending } = useQuery({
    queryKey: ["fetch-data"],
    queryFn: fetchData,
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-data/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };


  let content;

  if (isPending) {
    content = <LoadingIndicator />;

  }



  if (data) {
    content = (
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Username</th>
            <th>Code Language</th>
            <th>Standard Input</th>
            <th>Source Code</th>
            <th>Timestamp</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            {/* <td>{data.id}</td> */}
            <td>{data.username}</td>
            <td>{data.code_language}</td>
            <td>{data.stdin}</td>
            <td>{data.source_code}</td>
            <td>{data.timestamp}</td>
            <td>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      
    );
  }




  return (
    <div className="form-data-page">
      <h1>Form Data</h1>
      {content}
    </div>
  );
};

export default FormDataPage;
