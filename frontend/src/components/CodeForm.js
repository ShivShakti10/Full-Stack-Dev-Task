import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CodeForm.css";
import axios from "axios";

const CodeForm = () => {
  const [username, setUsername] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentTime = new Date().toLocaleString();
    console.log(currentTime)
    const formData = {
      username,
      codeLanguage,
      stdin,
      sourceCode,
      timestamp: currentTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/submit-form",
        formData
      );
      console.log(response.data);
      setIsSubmit(true)
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  return (
    <div className="container">
      <div>
        <h1>Code Form</h1>
      </div>
      <div className="form-container">
        <form >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="codeLanguage">Preferred Code Language:</label>
            <select
              id="codeLanguage"
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div>
            <label htmlFor="stdin">Standard Input (stdin):</label>
            <textarea
              id="stdin"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sourceCode">Source Code:</label>
            <textarea
              id="sourceCode"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit} >
              Submit
            </button>
          <Link to="/data">
           <button>Formdata</button>
          </Link>
          {isSubmit && <p>Form submitted !!</p>}
   
        </form>
      </div>
    </div>
  );
};

export default CodeForm;
