import axios from "axios";

const headerConfig = {
  headers: { Authorization: `bearer ${localStorage.getItem("auth")}` },
};

export const addToWishlist = async (id) => {
  const result = await axios.post(
    `http://localhost:6060/api/v1/wishlist/${id}`,
    {},
    headerConfig,
  );
  return result;
};

export const getWishlist = async () => {
  const result = await axios.get(
    `http://localhost:6060/api/v1/wishlist/`,
    headerConfig,
  );
  return result;
};

export const removeFromWishList = async (id) => {
  const result = await axios.put(
    `http://localhost:6060/api/v1/wishlist/${id}`,
    {},
    headerConfig,
  );
  return result;
};