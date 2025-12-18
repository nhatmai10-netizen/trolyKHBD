
import { GoogleGenAI } from "@google/genai";
import { LessonData } from "../types";
import { SYSTEM_PROMPT_TEMPLATE } from "../constants";

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 

export const generateLessonPlan = async (data: LessonData): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key chưa được cấu hình. Vui lòng kiểm tra biến môi trường process.env.API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Define layout specific instruction
  let layoutInstruction = "";
  if (data.layout === 'column') {
    layoutInstruction = `
    ĐẶC BIỆT VỀ ĐỊNH DẠNG (CHIA CỘT):
    Tại mục "III. Tiến trình dạy học":
    - Các mục a) Mục tiêu, b) Nội dung, c) Sản phẩm: Trình bày dạng văn bản bình thường.
    - Riêng mục "d) Tổ chức thực hiện": HÃY KẺ BẢNG HTML gồm 2 cột.
      + Cột 1: "Hoạt động của Giáo viên" (bao gồm chuyển giao nhiệm vụ, theo dõi, hỗ trợ, kết luận).
      + Cột 2: "Hoạt động của Học sinh" (bao gồm thực hiện nhiệm vụ, báo cáo, thảo luận).
    - SAU BẢNG (ngoài bảng), THÊM MỤC: 
      <div class="knowledge-box">
        <span class="knowledge-box-title">Giáo viên chốt:</span>
        <p>[Nội dung kiến thức chốt lại cần ghi vở...]</p>
      </div>
    `;
  } else {
    layoutInstruction = `
    ĐẶC BIỆT VỀ ĐỊNH DẠNG (KHÔNG CHIA CỘT - CHUẨN VĂN BẢN):
    Tại mục "III. Tiến trình dạy học", trình bày các hoạt động theo thứ tự a, b, c, d.
    Mục "d) Tổ chức thực hiện" trình bày thành các gạch đầu dòng (không dùng bảng).
    SAU ĐÓ THÊM MỤC:
    <div class="knowledge-box">
        <span class="knowledge-box-title">Giáo viên chốt:</span>
        <p>[Nội dung kiến thức chốt lại cần ghi vở...]</p>
    </div>
    `;
  }

  // Digital Competence instruction
  let digitalInstruction = "";
  if (data.digitalCompetence && data.digitalCompetence.trim() !== "") {
    digitalInstruction = `
    - YÊU CẦU BỔ SUNG VỀ NĂNG LỰC SỐ: Giáo viên yêu cầu tích hợp năng lực số: "${data.digitalCompetence}".
      + Hãy đưa nội dung này vào phần "I. Mục tiêu -> 2. Về năng lực" (Năng lực tin học/công nghệ).
      + Hãy đưa các thiết bị/phần mềm cần thiết vào phần "II. Thiết bị dạy học".
      + Hãy lồng ghép các hoạt động sử dụng công nghệ này vào "III. Tiến trình dạy học" một cách hợp lý.
    `;
  }

  // Reference file instruction
  let referenceInstruction = "";
  if (data.fileData) {
    referenceInstruction = `
    - QUAN TRỌNG: Tôi đã đính kèm một tệp tài liệu tham khảo (tên file: ${data.fileData.fileName}). 
    - Hãy phân tích nội dung hình ảnh/văn bản trong tệp này và sử dụng nó làm căn cứ CHÍNH để soạn các phần:
      + Kiến thức trong mục I.1.
      + Nội dung và Sản phẩm trong các Hoạt động ở mục III.
      + Nội dung trong phần "Giáo viên chốt".
    - Nếu tệp là một trang sách giáo khoa, hãy bám sát các đơn vị kiến thức và bài tập trong đó.
    `;
  }

  const userPromptText = `
Thông tin bài dạy:
- Môn học: ${data.subject}
- Tên bài học: ${data.lessonName}
- Lớp: ${data.grade}
- Thời lượng: ${data.duration}
- Bộ sách giáo khoa: ${data.textbook}
- Định hướng phương pháp: ${data.method}
- Đối tượng học sinh: ${data.students}
${digitalInstruction}
${referenceInstruction}

YÊU CẦU ĐẦU RA:
- Trả về kết quả dưới dạng **Mã HTML thuần** (HTML string).
- Bắt đầu bằng thẻ <div> và kết thúc bằng thẻ </div>.
- Sử dụng các thẻ <h3> cho các mục lớn (I, II, III, IV).
- Sử dụng thẻ <h4> cho tên các Hoạt động.
- Sử dụng <b> hoặc <strong> cho các tiêu đề con.
- Sử dụng <table> nếu có yêu cầu chia cột.
- QUAN TRỌNG: Tại mỗi hoạt động, PHẢI CÓ mục "Giáo viên chốt" ở cuối.
- Cuối cùng là mục "IV. PHỤ LỤC: CÔNG CỤ ĐÁNH GIÁ" với bảng RUBRIC.

${layoutInstruction}

Hãy soạn thảo chi tiết, văn phong chuẩn sư phạm Việt Nam.
`;

  try {
    const parts: any[] = [{ text: userPromptText }];
    
    if (data.fileData) {
      parts.push({
        inlineData: {
          data: data.fileData.data,
          mimeType: data.fileData.mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_PROMPT_TEMPLATE,
        temperature: 0.4,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ AI.");
    }
    
    let cleanText = text.replace(/```html/g, '').replace(/```/g, '').trim();
    return cleanText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Đã có lỗi xảy ra khi tạo giáo án.");
  }
};
