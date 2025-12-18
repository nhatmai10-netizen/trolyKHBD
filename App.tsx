import React, { useState } from 'react';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import { generateLessonPlan } from './services/geminiService';
import { LessonData, LoadingState } from './types';

function App() {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [lessonPlan, setLessonPlan] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LessonData) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setLessonPlan('');

    try {
      const result = await generateLessonPlan(data);
      setLessonPlan(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-teal-700 text-white shadow-md no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-graduation-cap text-2xl mr-3"></i>
              <span className="font-bold text-xl tracking-tight">Trợ Lý Giáo Viên 5512</span>
            </div>
            <div className="hidden md:block text-sm text-teal-100">
              Công cụ hỗ trợ soạn giảng chuẩn Công văn 5512
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 xl:col-span-4 no-print">
            <div className="sticky top-24">
               <InputForm onSubmit={handleGenerate} isLoading={loadingState === LoadingState.LOADING} />
               
               {/* Error Message */}
               {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                   <div className="flex">
                     <div className="flex-shrink-0">
                       <i className="fas fa-exclamation-circle text-red-500"></i>
                     </div>
                     <div className="ml-3">
                       <h3 className="text-sm font-medium text-red-800">Lỗi hệ thống</h3>
                       <div className="mt-1 text-sm text-red-700">{error}</div>
                     </div>
                   </div>
                </div>
               )}

               {/* Tips Section */}
               <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-blue-800 mb-2">
                    <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                    Gợi ý soạn bài
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
                    <li>Nhập tên bài học cụ thể để AI hiểu rõ ngữ cảnh.</li>
                    <li>Chọn phương pháp phù hợp với đối tượng học sinh.</li>
                    <li>Sau khi tạo, thầy/cô nên kiểm tra và chỉnh sửa lại cho phù hợp thực tế.</li>
                  </ul>
               </div>
            </div>
          </div>

          {/* Right Column: Display Result */}
          <div className="lg:col-span-7 xl:col-span-8">
            {loadingState === LoadingState.IDLE && (
              <div className="h-full flex flex-col items-center justify-center p-10 bg-white border-2 border-dashed border-slate-300 rounded-xl text-center min-h-[400px]">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-book-open text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">Chưa có giáo án nào được tạo</h3>
                <p className="text-slate-500 max-w-sm">
                  Vui lòng điền thông tin bài học ở cột bên trái và nhấn nút "Soạn Kế Hoạch Bài Dạy" để bắt đầu.
                </p>
              </div>
            )}

            {loadingState === LoadingState.LOADING && (
              <div className="h-full flex flex-col items-center justify-center p-10 bg-white border border-slate-200 rounded-xl min-h-[600px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-6"></div>
                <h3 className="text-lg font-semibold text-slate-800 animate-pulse">Đang phân tích và soạn giáo án...</h3>
                <p className="text-slate-500 mt-2">Quá trình này có thể mất vài giây.</p>
                <div className="mt-8 max-w-md w-full space-y-3">
                  <div className="h-2 bg-slate-100 rounded overflow-hidden">
                    <div className="h-full bg-teal-500 w-1/2 animate-progress"></div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded overflow-hidden">
                     <div className="h-full bg-teal-300 w-3/4 animate-progress" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {loadingState === LoadingState.SUCCESS && (
              <PlanDisplay content={lessonPlan} />
            )}
            
            {loadingState === LoadingState.ERROR && (
               <div className="h-full flex flex-col items-center justify-center p-10 bg-white border border-red-200 rounded-xl min-h-[400px]">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-times text-3xl text-red-500"></i>
                </div>
                 <h3 className="text-lg font-medium text-slate-800">Không thể tạo giáo án</h3>
                 <p className="text-slate-500 mt-2">Vui lòng thử lại sau ít phút.</p>
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Trợ Lý Giáo Viên 5512. Powered by Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
