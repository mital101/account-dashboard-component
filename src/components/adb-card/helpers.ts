export const NumberFormatter = (value:string, decimal:number) => {
    return Number(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
};