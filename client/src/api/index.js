import axios from "axios";

export const baseURL =
  "http://localhost:5001/fooddeliveryapp2-b119b/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

/// get all the products
export const getAllProducts = async () => {
  console.log("got into get All Products-1");
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    console.log("the d data-2 ", res.data.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

/// delete a product

export const deleteAProduct = async (product_Id) => {
  console.log("got into get All Products-1");
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${product_Id}`
    );
    console.log("the d data-2 ", res.data.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};
/// add an item to cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

///get all the cart items
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);

  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//cart decrement
