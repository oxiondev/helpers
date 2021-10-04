export const calculatePriceObjectFromTotalPrice = (totalPrice, vatRate) => {
  const amountWithoutVat = totalPrice / (1 + (vatRate / 100));
  const vatAmount =  amountWithoutVat * vatRate / 100;

  return {
    amountCleanFormat: amountWithoutVat.toFixed(2),
    vatCleanFormat: vatAmount.toFixed(2),
    amountWithoutVat,
    vatAmount
  }
}

export const calculatePriceObjectFromBasePrice = (unitPrice, quantity, vatRate) => {
  // let unitVat = calculateVatFromBaseAmount(quantity, unitPrice, vatRate)
  const unitTotalPrice = unitPrice * quantity * (1 + (vatRate / 100));
  // let unitTotalPrice = unitVat + unitPrice;


  const {
    amountCleanFormat,
    vatCleanFormat,
    amountWithoutVat,
    vatAmount
  } = calculatePriceObjectFromTotalPrice(unitTotalPrice, vatRate);

  return {
    unitTotalPrice,
    amountCleanFormat,
    vatCleanFormat,
    amountWithoutVat,
    vatAmount,
    // unitVat,
  }

}
