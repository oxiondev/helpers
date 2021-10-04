import {
  calculatePriceObjectFromTotalPrice
} from "../lib/calculators";


export const createExpenseInvoiceObject = (orderData) => {
  let totalDiscount = 0;
  let products = [];
  let voucherAmount = 0;
  let discountAmount = 0;

  if (orderData.returnedProducts && Object.keys(orderData.returnedProducts).length) {
    Object.values(orderData.returnedProducts).forEach((product: any) => {
      for (let q = 0; q < Number(product.quantity || product.saleCount); q += 1) {
        products.push(product);
      }
    })
  }

  if (orderData.changedProducts && Object.keys(orderData.changedProducts).length) {
    Object.values(orderData.changedProducts).forEach((product: any) => {
      for (let q = 0; q < Number(product.quantity || product.saleCount); q += 1) {
        products.push(product);
      }
    })
  }

  if (orderData.nonDeliveredProducts && Object.keys(orderData.nonDeliveredProducts).length) {
    Object.values(orderData.nonDeliveredProducts).forEach((product: any) => {
      for (let q = 0; q < Number(product.quantity || product.saleCount); q += 1) {
        products.push(product);
      }
    });
  }

  if (orderData.productsToOperate && orderData.productsToOperate.length) {
    orderData.productsToOperate.forEach((product: any) => {
      for (let q = 0; q < Number(product.saleCount || product.quantity); q += 1) {
        products.push(product);
      }
    });
  }

  const numberAmountOfVoucher = Number(String(orderData.voucherAmount));
  if (numberAmountOfVoucher) {
    voucherAmount += numberAmountOfVoucher;
  }

  const numberAmountOfDiscount = Number(String(orderData.discountAmount));
  if (numberAmountOfDiscount) {
    discountAmount += numberAmountOfDiscount;
  }

  totalDiscount = discountAmount + voucherAmount;
  const totalDiscountPerProduct = totalDiscount / products.length;

  products = products.map(product => {
    const returnObject = {
      productName: '',
      amount: 0,
      amountCleanFormat: '',
      vatAmount: 0,
      vatRate: 8,
      vatCleanFormat: '',
      unit: ''
    }
    if (product.variantName) {
      let campaignDiscountAmount = 0;

      if(product.campaignDiscountAmount) {
        campaignDiscountAmount = Number(product.campaignDiscountAmount)
      }

      const totalPrice = Number((Number(product.sellingPrice) - totalDiscountPerProduct - campaignDiscountAmount).toFixed(2))
      const {
        amountWithoutVat,
        amountCleanFormat,
        vatAmount,
        vatCleanFormat
      } = calculatePriceObjectFromTotalPrice(totalPrice, returnObject.vatRate);

      returnObject.productName = `${product.name} ${product.variantName}`;
      returnObject.amount = Number((amountWithoutVat).toFixed(2));
      returnObject.amountCleanFormat = amountCleanFormat;
      returnObject.vatAmount = Number((vatAmount).toFixed(2));
      returnObject.vatCleanFormat = vatCleanFormat;
      returnObject.unit = product.unit;
    } else if (product.productName) {
      let campaignDiscountAmount = 0;

      if(product.campaignDiscountAmount) {
        campaignDiscountAmount = Number(product.campaignDiscountAmount)
      }
      returnObject.productName = product.productName;
      let totalPrice = 0;
      if (product.SatisAniSatisFiyat && product.SatisAniSatisFiyatKdv) {
        totalPrice = Number((Number(product.SatisAniSatisFiyat) + Number(product.SatisAniSatisFiyatKdv) - campaignDiscountAmount).toFixed(2))
      } else if(product._id){
        totalPrice = Number(product.amount)
      } else {
        totalPrice = Number((Number(product.amount) + Number(product.vatAmount)).toFixed(2))
      }
      if (
        product.additionalOptionList &&
        product.additionalOptionList.webOrderAdditionalOption &&
        product.additionalOptionList.webOrderAdditionalOption.description
      ) {
        returnObject.productName = `${returnObject.productName} ${product.additionalOptionList.webOrderAdditionalOption.description}`
      }
      if (product.vatRate) {
        returnObject.vatRate = Number(product.vatRate);
      }

      const {
        amountWithoutVat,
        amountCleanFormat,
        vatAmount,
        vatCleanFormat
      } = calculatePriceObjectFromTotalPrice(totalPrice, returnObject.vatRate);

      returnObject.amount = Number((amountWithoutVat).toFixed(2));
      returnObject.amountCleanFormat = amountCleanFormat;
      returnObject.vatAmount = Number((vatAmount).toFixed(2));
      returnObject.vatCleanFormat = vatCleanFormat;
      returnObject.unit = product.unit;
    }

    return returnObject
  });

  let totalAmount = products.reduce((acc, cur) => acc + cur.amount, 0);
  let totalVat = products.reduce((acc, cur) => acc + cur.vatAmount, 0);

  const totalVatIncludedAmount = Number((totalAmount + totalVat).toFixed(2));

  totalAmount = Number(Number(totalAmount).toFixed(2))
  totalVat = Number(Number(totalVat).toFixed(2))

  return {
    totalDiscount,
    products,
    totalAmount,
    totalVat,
    totalVatIncludedAmount
  }

}

