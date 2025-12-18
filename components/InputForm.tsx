
import React, { useState, useRef } from 'react';
import { LessonData } from '../types';
import { SUBJECTS, GRADES, TEXTBOOKS, METHODS, STUDENTS } from '../constants';
import { Button } from './Button';

interface InputFormProps {
  onSubmit: (data: LessonData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LessonData>({
    subject: SUBJECTS[0],
    lessonName: '',
    grade: GRADES[9],
    duration: '45 phút',
    textbook: TEXTBOOKS[0],
    method: METHODS[0],
    students: STUDENTS[0],
    digitalCompetence: '',
    layout: 'standard',
  });

  const [selectedFile, setSelectedFile] = useState<{name: string, type: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File quá lớn. Vui lòng chọn file dưới 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        setFormData(prev => ({
          ...prev,
          fileData: {
            data: base64Data,
            mimeType: file.type,
            fileName: file.name
          }
        }));
        setSelectedFile({ name: file.name, type: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFormData(prev => ({ ...prev, fileData: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center font-serif">
        <i className="fas fa-edit mr-3 text-teal-600"></i>
        Thông tin bài dạy
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lớp</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tên bài học</label>
          <input
            type="text"
            name="lessonName"
            value={formData.lessonName}
            onChange={handleChange}
            placeholder="VD: Định luật bảo toàn khối lượng"
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Thời lượng</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="VD: 45 phút"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sách giáo khoa</label>
            <select
              name="textbook"
              value={formData.textbook}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
            >
              {TEXTBOOKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
            <i className="fas fa-file-upload mr-2 text-teal-600"></i>
            Tài liệu tham khảo (PDF hoặc Hình ảnh)
          </label>
          <p className="text-xs text-slate-500 mb-3">AI sẽ dùng nội dung từ tệp này để soạn giáo án chính xác hơn.</p>
          
          {!selectedFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer hover:bg-slate-100 transition-colors py-4 flex flex-col items-center justify-center border border-slate-300 rounded-md bg-white"
            >
              <i className="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
              <span className="text-sm text-slate-600 font-medium">Nhấp để tải lên (Tối đa 10MB)</span>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf,image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-md">
              <div className="flex items-center overflow-hidden">
                <i className={`${selectedFile.type.includes('pdf') ? 'fas fa-file-pdf text-red-500' : 'fas fa-file-image text-blue-500'} text-xl mr-3`}></i>
                <div className="truncate">
                  <p className="text-sm font-medium text-slate-800 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500 uppercase">{selectedFile.type.split('/')[1]}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={removeFile}
                className="ml-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Xóa tệp"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Định hướng phương pháp</label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
          >
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tích hợp năng lực số</label>
          <textarea
            name="digitalCompetence"
            value={formData.digitalCompetence}
            onChange={handleChange}
            placeholder="VD: Tra cứu thông tin trên Internet, sử dụng phần mềm mô phỏng..."
            rows={2}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block"
          />
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
           <label className="block text-sm font-semibold text-slate-700 mb-3">Hình thức trình bày</label>
           <div className="flex flex-col sm:flex-row gap-4">
             <label className="flex items-center cursor-pointer">
               <input 
                 type="radio" 
                 name="layout" 
                 value="standard"
                 checked={formData.layout === 'standard'}
                 onChange={handleChange}
                 className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
               />
               <span className="ml-2 text-sm text-slate-700">Văn bản (Không chia cột)</span>
             </label>
             <label className="flex items-center cursor-pointer">
               <input 
                 type="radio" 
                 name="layout" 
                 value="column"
                 checked={formData.layout === 'column'}
                 onChange={handleChange}
                 className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
               />
               <span className="ml-2 text-sm text-slate-700">Bảng (Chia cột GV-HS)</span>
             </label>
           </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="w-full py-3 text-base shadow-md font-serif"
            icon={<i className="fas fa-magic"></i>}
          >
            {isLoading ? 'Đang xử lý tài liệu...' : 'Soạn Kế Hoạch Bài Dạy'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
