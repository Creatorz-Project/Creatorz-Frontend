export default function convertFileToOctetStream(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.addEventListener('load', () => {
          const binaryString = reader.result;
          const octetStreamData = new Uint8Array(binaryString);
  
          resolve(octetStreamData);
        });
  
        reader.addEventListener('error', () => {
          reject(new Error('Failed to read the file'));
        });
  
        reader.readAsArrayBuffer(file);
      });
}