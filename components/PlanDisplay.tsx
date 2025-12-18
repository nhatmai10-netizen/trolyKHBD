import React from 'react';
import { Button } from './Button';

interface PlanDisplayProps {
  content: string;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ content }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const element = document.getElementById('lesson-plan-container');
    if (element) {
        navigator.clipboard.writeText(element.innerText).then(() => {
            alert("Đã sao chép nội dung giáo án (dạng văn bản)!");
        });
    }
  };

  const handleExportWord = () => {
    // Basic HTML to Word conversion wrapper
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Giáo án 5512</title>" +
            "<style>" +
            "@page Section1 {size:21cm 29.7cm; margin:2cm 2cm 2cm 2cm; mso-page-orientation:portrait;}" +
            "div.Section1 {page:Section1;}" +
            "body {font-family: 'Times New Roman', serif; font-size: 14pt;}" +
            "table {border-collapse: collapse; width: 100%;}" +
            "td, th {border: 1px solid black; padding: 5px;}" +
            ".knowledge-box {margin-top: 10px; margin-bottom: 10px; font-weight: normal;}" +
            ".knowledge-box-title {font-weight: bold; display: block; margin-bottom: 5px;}" +
            "</style>" +
            "<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml>" +
            "</head><body><div class=Section1>";
    
    const footer = "</div></body></html>";
    const sourceHTML = header + content + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'giao_an_5512.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header Actions */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap justify-between items-center gap-3 no-print">
        <h2 className="text-lg font-bold text-slate-800 flex items-center font-serif">
          <i className="fas fa-file-alt mr-2 text-teal-600"></i>
          Kết quả giáo án
        </h2>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} icon={<i className="fas fa-copy"></i>}>
                Sao chép Text
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportWord} icon={<i className="fas fa-file-word"></i>}>
                Xuất Word
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePrint} icon={<i className="fas fa-print"></i>}>
                In / PDF
            </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-12 overflow-y-auto max-h-[800px] print:max-h-none print:p-0 print:overflow-visible">
        {/* Render HTML content safely */}
        <div 
            id="lesson-plan-container"
            className="lesson-plan-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default PlanDisplay;
