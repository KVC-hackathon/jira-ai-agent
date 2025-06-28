{
  "id": "conf-fnb-permission-001",
  "title": "Hệ thống Phân quyền Nhân viên F&B",
  "content": "Tài liệu mô tả chi tiết hệ thống phân quyền cho nhân viên nhà hàng trong KiotViet.\n\n**Các loại quyền chính:**\n- Quyền quản lý bàn: Xem, tạo, sửa, hủy order cho các bàn được phân công\n- Quyền quản lý khu vực: Chỉ thao tác với bàn trong khu vực (VIP, sân vườn, tầng 1, tầng 2)\n- Quyền tách/ghép đơn: Cho phép tách 1 đơn thành nhiều đơn hoặc ghép nhiều đơn\n- Quyền áp dụng khuyến mãi: Giới hạn mức giảm giá tối đa\n- Quyền xem báo cáo: Theo ca, theo ngày, theo khu vực\n\n**Cấu trúc phân quyền:**\n- **Nhân viên phục vụ**: Chỉ thao tác bàn được phân công\n- **Trưởng ca**: Quản lý toàn bộ ca làm việc\n- **Quản lý khu vực**: Quản lý 1 hoặc nhiều khu vực cụ thể\n- **Quản lý nhà hàng**: Toàn quyền trên hệ thống\n\n**Quy trình phân quyền:**\n1. Admin tạo nhóm quyền (role)\n2. Gán các permission cụ thể cho role\n3. Assign nhân viên vào role phù hợp\n4. Hệ thống kiểm tra quyền real-time khi thao tác\n\n**Audit & Logging:**\n- Log tất cả thao tác có quyền hạn\n- Theo dõi ai làm gì, khi nào, ở đâu\n- Báo cáo vi phạm quyền hạn\n- Backup log hàng ngày\n\n**Tích hợp:**\n- POS Android/iOS\n- Web dashboard\n- Kitchen Display System\n- Báo cáo doanh thu",
  "author": "Nguyễn Văn Đức - Trưởng phòng Sản phẩm",
  "created_at": "2023-09-05T09:15:00Z",
  "type": "confluence",
  "url": "https://kiotviet.com/confluence/fnb-permission-001"
}