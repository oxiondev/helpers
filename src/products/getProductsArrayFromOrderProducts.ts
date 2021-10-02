
const getProductsArrayFromOrderProducts = (products) => {
  if (!products) {
    return [];
  }
  let productsArray = [];
  if (Array.isArray(products)) {
    return products;
  }
  if (products && products.webOrderProduct) {
    if (products.webOrderProduct['1']) {
      // TODO Ticimax specific
      productsArray = [...productsArray, ...Object.values(products.webOrderProduct)];
    } else {
      productsArray = [...productsArray, products.webOrderProduct];
    }
  }

  if (products && products.posOrderProduct) {
    productsArray = [...productsArray, ...products.posOrderProduct];
  }

  if (products && products.prostockOrderProduct) {
    productsArray = [...productsArray, ...products.prostockOrderProduct];
  }

  if(products && products.wooCommerceOrderProduct) {
    productsArray = [...productsArray, ...products.wooCommerceOrderProduct];
  }

  return productsArray;
}

export default getProductsArrayFromOrderProducts;
