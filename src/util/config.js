export const cardProps = {
    bodyStyle: {padding: 0},
    size: "small",
}

export const requiredField = [{ required: true, message: "Campo requerido" }]

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
});

export const currencyFE = {
  decimal: ".",
  thousand: ",",
  precision: 2,
}

export const numbersOnly = (e) => {
  let t = e.which
  return (!e.shiftKey && (8 === t || 37 === t || 46 === t || 39 === t || 9 === t || (48 <= t && t <= 58) || (96 <= t && t <= 105))) || (e.preventDefault() && !1)
}

export const currencyOnly = (e) => {
  let t = e.which
  return (!e.shiftKey && (110 === t || 190 === t || 8 === t || 37 === t || 46 === t || 39 === t || 9 === t || (48 <= t && t <= 58) || (96 <= t && t <= 105))) || (e.preventDefault() && !1)
}
