import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/fetch-data");
    const resData = await (response.data);
    return resData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
