import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import { AiOutlineDownload } from 'react-icons/ai';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfViewer = ({ base64String, fileName }) => {
  const handleDownloadClick = () => {
    if (base64String) {
      const byteArray = atob(base64String);
      const byteNumbers = new Array(byteArray.length);

      for (let i = 0; i < byteArray.length; i++) {
        byteNumbers[i] = byteArray.charCodeAt(i);
      }

      const byteArrayUint8 = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArrayUint8], { type: 'application/pdf' });

      saveAs(blob, fileName);
    }
  };

  return (
    <div>
      {base64String ? (
        <div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleDownloadClick}
              className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative inline-flex px-10 py-2.5 transition-all ease-in duration-75 text-white bg-black rounded-md group-hover:bg-opacity-0">
                <AiOutlineDownload className="mr-2 mt-0.5" /> Baixar {fileName}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default PdfViewer;
