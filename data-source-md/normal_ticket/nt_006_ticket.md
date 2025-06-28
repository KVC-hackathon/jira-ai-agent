{
  "id": "nt-multi-payment-calculation-001",
  "title": "Tính toán sai khi thanh toán kết hợp nhiều phương thức",
  "description": "Khi khách thanh toán bằng 3 phương thức: tiền mặt + thẻ + voucher, hệ thống thỉnh thoảng tính sai số tiền còn lại. Ví dụ: Bill 500k, khách trả 200k tiền mặt + 150k thẻ + voucher 100k = 450k, nhưng hệ thống vẫn báo thiếu 100k. Phải cancel và tính lại từ đầu, gây delay trong thanh toán.",
  "status": "open",
  "created_at": "2023-12-18T13:25:00Z",
  "author": "Võ Thị Thanh Loan",
  "documentation_related": ["conf-multi-payment-001"],
  "type": "ticket",
  "url": "https://kiotviet.com/ticket/multi-payment-calculation-001",
  "module": "Thanh toán",
  "priority": "cao",
  "merchant_name": "Trung tâm thương mại Landmark 81",
  "package_type": "enterprise"
}
