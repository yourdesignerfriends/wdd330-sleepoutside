const baseURL = import.meta.env.VITE_SERVER_URL
// export th path to get the information of the products
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}
  // AD- Modify getData(category) to apply getResponsiveImage(product.Images) to each product before returning them.
  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    const response = await fetch(url);
    const data = await convertToJson(response);

    // AD- Add responsive image selection before returning the products
    const products = data.Result.map(product => ({
      ...product,
      responsiveImage: getResponsiveImage(product.Images),
    }));

    console.log("Adjusted products:", products);

    return products;
  }

  async findProductById(id) {
    const url = `${baseURL}product/${id}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }
}

// AD- Function to determine the appropriate image size based on screen width
function getResponsiveImage(images) {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1200) {
    return images.PrimaryExtraLarge; // here is the Large image
  } else if (screenWidth >= 768) {
    return images.PrimaryLarge; // Medium-sized image
  } else {
    return images.PrimarySmall; // Small image for mobile
  }
}