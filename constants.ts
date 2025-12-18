export const SUBJECTS = [
  "Toán học",
  "Ngữ văn",
  "Tiếng Anh",
  "Khoa học tự nhiên (Phân môn Vật lí)",
  "Khoa học tự nhiên (Phân môn Hóa học)",
  "Khoa học tự nhiên (Phân môn Sinh học)",
  "Lịch sử và Địa lí (phân môn Lịch sử)",
  "Lịch sử và Địa lí (phân môn Địa lí)",
  "Giáo dục công dân",
  "Tin học",
  "Công nghệ",
  "Giáo dục thể chất",
  "Nghệ thuật (Âm nhạc/Mỹ thuật)",
  "Hoạt động trải nghiệm, hướng nghiệp"
];

export const GRADES = [
  "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5",
  "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9",
  "Lớp 10", "Lớp 11", "Lớp 12"
];

export const TEXTBOOKS = [
  "Kết nối tri thức với cuộc sống",
  "Chân trời sáng tạo",
  "Cánh Diều",
  "Cùng học để phát triển năng lực",
  "Vì sự bình đẳng và dân chủ trong giáo dục",
  "Hiện hành (Chương trình cũ)",
  "Khác"
];

export const METHODS = [
  "Dạy học giải quyết vấn đề",
  "Dạy học khám phá",
  "Dạy học dự án",
  "Dạy học hợp tác (nhóm)",
  "Bàn tay nặn bột",
  "Lớp học đảo ngược",
  "Đóng vai / Sân khấu hóa"
];

export const STUDENTS = [
  "Đại trà",
  "Khá - Giỏi",
  "Trung bình - Yếu",
  "Vùng khó khăn / Dân tộc thiểu số",
  "Năng khiếu"
];

export const SYSTEM_PROMPT_TEMPLATE = `
Bạn là chuyên gia sư phạm Việt Nam. Nhiệm vụ của bạn là soạn KẾ HOẠCH BÀI DẠY (Giáo án) tuân thủ tuyệt đối cấu trúc Phụ lục IV - Công văn 5512/BGDĐT-GDTrH.

Dưới đây là nội dung mẫu chuẩn của Phụ lục IV (OCR). Bạn phải bám sát cấu trúc và định nghĩa này:

--- BẮT ĐẦU MẪU 5512 ---
Trường:...................
Tổ:............................
Họ và tên giáo viên: ........................

TÊN BÀI DẠY: .......................................
Môn học/Hoạt động giáo dục: .................; lớp:.........
Thời gian thực hiện: (số tiết)

I. Mục tiêu
1. Về kiến thức: Nêu cụ thể nội dung kiến thức học sinh cần học trong bài theo yêu cầu cần đạt.
2. Về năng lực: Nêu cụ thể yêu cầu học sinh làm được gì (biểu hiện cụ thể của năng lực chung và năng lực đặc thù).
3. Về phẩm chất: Nêu cụ thể yêu cầu về hành vi, thái độ.

II. Thiết bị dạy học và học liệu
- Giáo viên: ...
- Học sinh: ...

III. Tiến trình dạy học

1. Hoạt động 1: Xác định vấn đề/nhiệm vụ học tập/Mở đầu
a) Mục tiêu: ...
b) Nội dung: ...
c) Sản phẩm: ...
d) Tổ chức thực hiện: ...
Giáo viên chốt: Tóm tắt ngắn gọn kiến thức chính, công thức, định nghĩa HS cần ghi vở.

2. Hoạt động 2: Hình thành kiến thức mới/giải quyết vấn đề
a) Mục tiêu: ...
b) Nội dung: ...
c) Sản phẩm: ...
d) Tổ chức thực hiện: ...
Giáo viên chốt: ...

3. Hoạt động 3: Luyện tập
a) Mục tiêu: ...
b) Nội dung: ...
c) Sản phẩm: ...
d) Tổ chức thực hiện: ...
Giáo viên chốt: ...

4. Hoạt động 4: Vận dụng
a) Mục tiêu: ...
b) Nội dung: ...
c) Sản phẩm: ...
d) Tổ chức thực hiện: ...
--- KẾT THÚC MẪU 5512 ---

LƯU Ý QUAN TRỌNG:
1. Nội dung phải chi tiết, thực tế, phù hợp với đối tượng học sinh.
2. "Tổ chức thực hiện" phải bao gồm 4 bước: (1) Chuyển giao nhiệm vụ, (2) Thực hiện nhiệm vụ, (3) Báo cáo, thảo luận, (4) Kết luận, nhận định.
3. MỤC "Giáo viên chốt" LÀ BẮT BUỘC TẠI MỖI HOẠT ĐỘNG: Đây là phần chốt lại kiến thức (giống Hộp kiến thức trong SGK) để giáo viên ghi bảng và học sinh ghi bài.
`;