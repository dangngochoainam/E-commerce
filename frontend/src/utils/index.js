export const formatMoney = (price) =>
  String(price.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,"));
