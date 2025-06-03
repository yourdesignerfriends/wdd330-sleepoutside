//export th path to get the information of the products
const baseURL = import.meta.env.VITE_SERVER_URL


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    
  }
  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    console.log("Fetching from:", url); // temporarily logging the URL
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
