# Hướng dẫn cập nhật ảnh website

## Code chuyển ảnh gốc thành WebP nằm ở đâu?

File chính là [`scripts/prepare-refinement-images.mjs`](../scripts/prepare-refinement-images.mjs). Script chạy bằng Node.js và dùng thư viện **Sharp** đã có trong `devDependencies` của dự án.

Luồng xử lý:

```text
.docs/_local/                         Ảnh gốc, chỉ trên máy của bạn
       ↓ đọc đường dẫn trong sources
scripts/prepare-refinement-images.mjs
       ├─→ public/images/*.webp       Ảnh đã tối ưu, được commit/deploy
       └─→ src/data/images.ts         Đường dẫn, chiều rộng, chiều cao
                  ↓ được import bởi data/component
             Giao diện website
```

Trong script:

- `root` là thư mục gốc chứa ảnh nguồn: `.docs/_local/`.
- `sources` ánh xạ **tên ảnh dùng trên website → đường dẫn ảnh nguồn**.
- `output` là `public/images/`.
- `sharp(...).rotate()` điều chỉnh hướng theo thông tin EXIF.
- `resize({ width, withoutEnlargement: true })` giới hạn chiều rộng tối đa 400px cho logo, 1400px cho ảnh khác, giữ tỷ lệ và không phóng lớn ảnh nguồn.
- `.webp({ quality: 88 })` mã hóa ảnh thành WebP. Script không áp dụng grayscale, desaturation hay thay đổi màu chủ ý; đây là nén ảnh, không phải lưu nguyên từng pixel của ảnh nguồn. Nền trong suốt được giữ.
- Tên bắt đầu bằng `portrait-` có thêm bản rộng 640px dành cho màn hình nhỏ.
- Kích thước output thực tế được ghi vào `src/data/images.ts`.

Ví dụ mapping logo Unilever:

```js
'unilever-logo': 'Supporting Photos/3. Experience/2. Unilever.png',
```

Từ đó script tạo `public/images/unilever-logo.webp` và record `images['unilever-logo']`. `src/data/experience.ts` dùng record này để hiển thị logo.

## Thay ảnh nhưng giữ nguyên tên file nguồn

1. Thay file gốc tương ứng trong `.docs/_local/` bằng ảnh mới, giữ nguyên đường dẫn và tên file.
2. Mở terminal tại root repository và chạy:

```powershell
npm.cmd run images:prepare
npm.cmd run build
```

Lệnh `images:prepare` là tên ngắn của `node scripts/prepare-refinement-images.mjs`. Nếu máy chưa cài dependency, chạy `npm.cmd ci` trước. Script xử lý **toàn bộ** danh sách `sources`, nên cần có đầy đủ các ảnh nguồn được liệt kê, kể cả khi bạn chỉ muốn đổi một ảnh.

3. Mở dev/preview để kiểm tra tỷ lệ, vị trí và màu sắc. Ảnh mới khác bố cục có thể cần chỉnh `object-fit`, `object-position` hoặc kích thước khung trong `src/styles/Portfolio.module.css`.
4. Commit các WebP thay đổi trong `public/images/` và `src/data/images.ts` nếu kích thước thay đổi. Khi push lên `main`, workflow hiện tại build và deploy. Chạy script trên máy **không tự cập nhật website đang online**.

`.docs/_local/` bị ignore và không được gửi lên GitHub. Hãy giữ bản sao lưu ảnh nguồn; clone repository chỉ lấy được các WebP đã commit, không lấy lại được ảnh gốc từ thư mục này.

## Thay tên file hoặc thêm một ảnh mới

- Nếu đổi tên/đường dẫn ảnh nguồn: sửa giá trị tương ứng trong `sources`, giữ nguyên key nếu vẫn thay cùng vị trí. Sau đó chạy lại lệnh trên.
- Nếu thêm vị trí ảnh mới: thêm một key mô tả rõ vào `sources`, chạy script rồi dùng `images['key-moi']` trong data/component thích hợp. Thêm mapping không tự tạo vị trí hiển thị trên trang.
- Không sửa thủ công `src/data/images.ts` để đổi nguồn ảnh: đây là file **được sinh tự động**, lần chạy script tiếp theo sẽ ghi đè.
- Nếu đổi/xóa key, cập nhật tất cả nơi sử dụng key đó. Script không tự xóa WebP cũ trong `public/images/`.
- Hero có `srcSet` riêng trong `src/sections/Hero.tsx`; nếu thay ảnh hero bằng nguồn khác kích thước, kiểm tra khai báo responsive image. Các component `Portrait` khác dùng kích thước từ manifest.

## Những ảnh đang dùng ở Journey và Education

Đường dẫn nguồn trong bảng tương đối với `.docs/_local/`.

| Vị trí | Key trong `images.ts` | Nguồn trong `sources` |
| --- | --- | --- |
| Journey / Business | `journey-ftu` | `Supporting Photos/1. My Journey/1. FTU.jpg` |
| Journey / Analytics & BI | `journey-shopee-unilever` | `Supporting Photos/1. My Journey/2. Shopee x Unilever.png` |
| Journey / AI; Exploring | `stirling-campus` | `Supporting Photos/1. My Journey/3. Stirling.png` |
| Education / UK; About collage | `stirling-architecture` | `Supporting Photos/4. Education/1. UK.jpg` |
| Education / Vietnam | `education-vietnam` | `Supporting Photos/4. Education/2. VN.jpg` |
| Recognition | `education-sage-recognition` | `Supporting Photos/4. Education/3. ASEAN UK SAGE WIS.png` |
| Experience / Unilever | `unilever-logo` | `Supporting Photos/3. Experience/2. Unilever.png` |

Một key có thể được dùng ở nhiều nơi. Đổi `stirling-campus` sẽ đổi cả Journey và Exploring; đổi `stirling-architecture` sẽ đổi cả Education và About. Nếu muốn thay riêng một vị trí, tạo key mới rồi cập nhật đúng data/component của vị trí đó. Journey dùng `src/data/career.ts`; Education dùng `src/data/education.ts`.

## Phạm vi của script và ảnh project cũ

**Không phải mọi ảnh trong `public/images/` đều do script hiện tại tạo.** `sources` là danh sách chính xác mà `images:prepare` quản lý: portrait, supporting images, logo và bốn screenshot Think With AI. Các preview report cũ như `oee-report-*.webp`, `supplier-report-*.webp`, `fitness-tracker.webp`, `mrp.webp` và social preview được chuẩn bị ở các bước trước, không tự được cập nhật bởi lệnh này.

`scripts/inspect-project-pdfs.py` đọc PDF trong `.docs/_local/3. UI Projects/`, tạo ảnh PNG từng trang và text trong `.qa/`. Nó **không tự chuyển các trang PDF thành WebP công khai**. Muốn cập nhật gallery report, cần render PDF, chuyển PNG được chọn sang WebP bằng Sharp vào `public/images/`, rồi kiểm tra đường dẫn/caption trong `src/data/project-previews.ts`. Giữ nguyên tỷ lệ và không dùng ảnh của project khác.

`scripts/prepare-assets.mjs` là script đời đầu, còn đường dẫn nguồn cũ và dependency vào project bên cạnh. Không dùng script này thay cho `images:prepare` với thư mục nguồn hiện tại. Build bình thường chỉ dùng asset đã commit và không cần ảnh nguồn, Sharp conversion hay Python PDF tooling chạy lại.
