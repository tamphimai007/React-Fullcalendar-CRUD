import axios from "axios";

export const queryDate = async (values) =>
  await axios.post(process.env.REACT_APP_API + "/query", values);

export const createEvent = async (values) =>
  await axios.post(process.env.REACT_APP_API + "/event", values);

export const listEvent = async () =>
  await axios.get(process.env.REACT_APP_API + "/event");

export const updateEvent = async (values) =>
  await axios.put(process.env.REACT_APP_API + "/event", values);

export const removeEvent = async (values) =>
  await axios.delete(process.env.REACT_APP_API + "/event/" + values);

export const handleCurrentMonth = async (values) =>
  await axios.post(process.env.REACT_APP_API + "/current-month", values);

export const updateImage = async (values) =>
  await axios.post(process.env.REACT_APP_API + "/update-image", values);
