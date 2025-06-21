### confluence
Mocking Confluence data

### feature-request
Mocking feature request tickets

### normal-tickets
Mocking normal tickets that can be linked to Confluence pages

### Prompt
```
Tôi nhận được feature request sau:

{
    "title": "Thêm badge vào icon giỏ hàng",
    "description": Thêm badge vào icon giỏ hàng, badge update realtime",
    "created_at": "2023-10-10T14:00:00Z",
    "author": "Linh Vu"
  }
  

1. Tìm các Confluence liên quan, tóm tắt Confluence liên quan. Đưa vào related_confluence
2. Tìm các Ticket liên quan, tóm tắt ticket liên quan. Đưa vào related_tickets
3. Tìm ra hướng đi cho feature request, viết hướng đi của feature request vào feature_request_description.
4. Tạo các Subtask cho feature request, viết vào feature_request_subtask

Tất cả trả về theo định dạng json, sample:

{
  "feature_request_description": "Feature request description",
  "feature_request_subtask": [
    {
      "title": "Feature request substask 1 title",
      "description": "Feature request subtask 1 description"
    }
  ],
  "related_confluence": [
    {
      "id": "KR2-1234",
      "title": "Confluence title",
      "summary": "Confluence summary",
      "url": "https://sample.com"
    }
  ],
  "related_tickets": [
    {
      "id": "KR2-1234",
      "title": "Ticket title",
      "summary": "Ticket summary",
      "url": "https://sample.com"
    }
  ]
}

Tôi nhận được feature request sau:

{
    "title": "Thêm badge vào icon giỏ hàng",
    "description": Thêm badge vào icon giỏ hàng, badge update realtime",
    "created_at": "2023-10-10T14:00:00Z",
    "author": "Linh Vu"
  }
  

1. Tìm các Confluence liên quan, tóm tắt Confluence liên quan. Đưa vào related_confluence
2. Tìm các Ticket liên quan, tóm tắt ticket liên quan. Đưa vào related_tickets
3. Tìm ra hướng đi cho feature request, viết hướng đi của feature request vào feature_request_description.
4. Tạo các Subtask cho feature request, viết vào feature_request_subtask

Tất cả trả về theo định dạng json, sample:

{
  "feature_request_description": "Feature request description",
  "feature_request_subtask": [
    {
      "title": "Feature request substask 1 title",
      "description": "Feature request subtask 1 description"
    }
  ],
  "related_confluence": [
    {
      "id": "KR2-1234",
      "title": "Confluence title",
      "summary": "Confluence summary",
      "url": "https://sample.com"
    }
  ],
  "related_tickets": [
    {
      "id": "KR2-1234",
      "title": "Ticket title",
      "summary": "Ticket summary",
      "url": "https://sample.com"
    }
  ]
}

CHỈ ĐƯỢC PHÉP TRẢ LỜI BẰNG JSON. Không được giải thích hay thêm bất kỳ văn bản nào khác.
```