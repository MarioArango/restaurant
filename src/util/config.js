export const cardProps = {
    bodyStyle: {padding: 0},
    size: "small",
}

export const tableProps = {
  size: "small",
  pagination: false,
  bordered: false,
  sticky: true,
  scroll: { y: `45vh`, x: `80vh` },
  footer: (records) => `TOTAL REGISTROS: ${records && records.length}`,
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

export const dateFormatList = [
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "DD/MM/YYYY HH:mm:ss",
  "YYYYMMDD",
  "YYYYMM",
  "YYYY-MM",
  "DD/MM/YYYY HH:mm",
  "YYYY-MM-DD HH:mm:ss",
  "DD/MM/YYYY HH:mm a",
  "YYYY-MM-DD HH:mm:ss A",
  "HH:mm:ss",
  "HH:mm",
  "YYYY-MM-DD HH:mm",
  "DD/MM/YYYY hh:mm A"
]

export const customScroll = (query = ".ant-table-body") => {
  const vpHeight = window.innerHeight
  const tableBody = window.document.querySelector(query)
  if (tableBody) {
    const tblBoundle = tableBody.getBoundingClientRect()
    const tblHeight = (vpHeight - ((tblBoundle.top) + 30 + 50 + 55))
    const data = { y: tblHeight, x: `80vh` }
    return data
  }
  return { y: `45vh`, x: `80vh` }
}
