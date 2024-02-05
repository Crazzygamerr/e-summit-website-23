import tess from "node-tesseract-ocr";

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// receive filename and return UPI ID and amount from the image
const OCR = async (name: string) => {
  const result = (await tess.recognize(name, config)).match(/[0-9\(\)]+/g);
  if (!result) return [null];
  return result.filter((s) => s.length === 12);
};

export default OCR;
