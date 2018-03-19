var PDFImage = require("pdf-image").PDFImage;
 
var pdfImage = new PDFImage("./_jj.pdf");
pdfImage.convertPage(0).then(function (imagePath) {
  // 0-th page (first page) of the slide.pdf is available as slide-0.png
  fs.existsSync("slide-0.png") // => true
});