export * from "./web3Utils";
export const formatWalletAddress = (address: string ) => {
  return address.slice(0, 5) + '...' + address.slice(-4);
}

export const formatToCurrency = (amount: number) => {
  if(isNaN(amount)) {
    amount = 0;
  }
  return ("$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")).split(".")[0];
};