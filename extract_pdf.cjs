const fs = require('fs');

async function extract() {
  const pdfParse = (await import('pdf-parse-new')).default;
  const dataBuffer = fs.readFileSync('Manual  permiso B.pdf');
  const data = await pdfParse(dataBuffer);
  fs.writeFileSync('manual_extracted.txt', data.text);
  console.log('Pages:', data.numpages);
  console.log('Text length:', data.text.length);
}

extract().catch(console.error);
