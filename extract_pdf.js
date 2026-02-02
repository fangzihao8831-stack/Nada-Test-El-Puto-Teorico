const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function extract() {
  const dataBuffer = fs.readFileSync('Manual  permiso B.pdf');
  const parser = new PDFParse(dataBuffer);
  const data = await parser.parse();
  
  // Get all text
  let allText = '';
  for (const page of data.pages) {
    allText += page.text + '\n\n--- PAGE BREAK ---\n\n';
  }
  
  fs.writeFileSync('manual_extracted.txt', allText);
  console.log('Pages:', data.pages.length);
  console.log('Text length:', allText.length);
}

extract().catch(console.error);
