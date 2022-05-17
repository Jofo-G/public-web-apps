import axios from "axios";

const database_url = `http://localhost:5000/`;

const api = axios.create({
  baseURL: database_url,
});

export const getDefinition = async () => {
  try {
    const { data } = await api.get("/form");
    return data;
  } catch (error) {
    throw error
  }
};

export const getEnquiries = async () => {
  try {
    const { data } = await api.get("/enquiries");
    return data;
  } catch (error) {
    throw error
  }
};

export const postData = async (data) => {
  try {
    return await api.post("/enquiries", data); 
  } catch (error){
    throw error
  }
};
