# Read this before modifying the codebase

## Architecture and mental model

This is a static, public portfolio. Data files describe the person and work; section components compose the editorial narrative; shared components own real reuse. Vite compiles the browser app. `scripts/prerender.mjs` renders the same React tree to HTML for every published route, then the browser hydrates it. There is no backend, authentication, analytics collection, global store, or persistent visitor data.

The homepage sequence is invariant: **Hero → Marquee → About → Career → Statistics → Capabilities → Exploring → Portfolio → Experience → Education → Growth → Contact → Footer**. This implements **A → B → D → C → E**.

## Current folder tree

Sơ đồ này bao gồm cả mã nguồn được Git theo dõi và thư mục chỉ tồn tại trên máy làm việc. Các thư mục sinh tự động có thể chưa xuất hiện khi vừa clone repository. Danh sách file minh họa vai trò; không liệt kê từng ảnh hay từng dependency.

```text
.git/                         (local Git metadata; do not edit manually)
.github/
  workflows/deploy.yml
.docs/
  adr/
  codebase-guide.md  design-system.md  motion-system.md
  content-model.md   deployment.md     clean-coding-rules.md
  validation.md     image-maintenance.md
  2026-09-11-portfolio-refinements.md
  _local/                     (ignored; user-provided original sources)
    1. UI Generation/
    2. Portrait/
    2. Portrait - Remove BG/
    3. UI Projects/
    Supporting Photos/
    UX Generation/
.qa/                          (ignored; local quality-assurance workspace)
  python/                     (PDF inspection dependencies)
  font-tools/                 (font inspection dependencies)
  desktop-full.png  tablet-full.png  mobile-full.png
  *-gallery.png  crop-*.jpg    (visual review outputs)
  oee-manufacturing-*.png     (rendered PDF pages; other projects too)
  *.txt                       (extracted report text)
  verify-live.mjs             (local live-site verification helper)
  *.py                        (one-off editing/inspection helpers)
assets/                       (tracked legacy site assets)
  css/  js/  sass/  webfonts/
images/                       (tracked legacy site photos)
dist/                         (ignored; generated deployment output)
  assets/  images/  fonts/  projects/
  index.html  404.html  sitemap.xml  robots.txt  .nojekyll
node_modules/                 (ignored; installed npm dependencies)
public/
  images/  fonts/  favicon.svg  robots.txt  .nojekyll
  projects/evidence/          (published original project PDFs)
scripts/
  prerender.mjs  prepare-assets.mjs  download-fonts.mjs
  prepare-refinement-images.mjs  inspect-project-pdfs.py  github-pages.mjs
src/
  App.tsx  main.tsx
  components/
    Navigation.tsx  Footer.tsx  SocialLinks.tsx  SectionLabel.tsx
    Accordion.tsx  Portrait.tsx  ProjectCard.tsx  ProjectPreview.tsx
    DestinationLink.tsx  ProjectGallery.tsx
  data/
    profile.ts  links.ts  career.ts  stats.ts  capabilities.ts
    exploration.ts  projects.ts  experience.ts  education.ts  growth.ts
    images.ts  project-previews.ts
  hooks/useEditorialMotion.ts
  pages/CaseStudy.tsx  NotFound.tsx
  sections/
    Hero.tsx  Marquee.tsx  About.tsx  Capabilities.tsx  Exploring.tsx
    Portfolio.tsx  Experience.tsx  Education.tsx  Growth.tsx  Contact.tsx
  styles/tokens.css  global.css  Portfolio.module.css
tests/
  portfolio.spec.ts  refinements.spec.ts
test-results/                 (ignored; Playwright results/failure traces)
playwright-report/            (ignored; optional HTML report, if generated)
.gitignore  README.md
index.html  package.json  package-lock.json  tsconfig.json
vite.config.ts  playwright.config.ts
```

## Thư mục nào dùng để làm gì?

| Thư mục | Vai trò | Git / deployment |
| --- | --- | --- |
| `.git/` | Lịch sử commit, branch và cấu hình repository trên máy. Không sửa hoặc xóa thủ công khi muốn giữ lịch sử làm việc. | Git tự quản lý; không nằm trong website |
| `.github/workflows/` | Quy trình GitHub Actions: cài dependency, build và đưa `dist/` lên GitHub Pages. | Commit; không phải nội dung website |
| `.docs/` | Hướng dẫn codebase, thiết kế, nội dung, kiểm thử, triển khai và nhật ký thay đổi. | Commit, trừ `_local/`; không deploy |
| `.docs/adr/` | Architecture Decision Records: lý do chọn CSS Modules, GSAP và cách tạo route. | Commit; không deploy |
| `.docs/_local/` | Prompt, UI tham khảo, ảnh gốc, logo và tài liệu dự án do người dùng cung cấp. Đây là nguồn để chuẩn bị asset, không phải cache. | Bị `.gitignore` loại trừ; không deploy; nên giữ bản sao lưu |
| `.qa/` | Không gian kiểm tra chất lượng cục bộ: ảnh chụp giao diện, PDF render, dữ liệu trích xuất, công cụ và script tạm. Xem phần riêng bên dưới. | Bị ignore; không deploy |
| `assets/`, `images/` ở root | CSS/JS/Sass/font và ảnh của website cũ được giữ lại. React hiện tại không dùng hai thư mục này. | Vẫn được commit; không được pipeline hiện tại đưa vào `dist/` |
| `src/` | Mã React/TypeScript, dữ liệu nội dung, styles và logic giao diện đang chạy. | Commit; được biên dịch vào website |
| `src/components/` | Thành phần dùng lại: navigation, accordion, portrait, gallery, link. | Commit; được biên dịch |
| `src/sections/` | Các phần của trang chủ như About, Portfolio, Experience. | Commit; được biên dịch |
| `src/pages/` | Trang chi tiết dự án và trang 404. | Commit; được biên dịch và pre-render |
| `src/data/` | Nội dung, thông tin nghề nghiệp, dự án và ánh xạ ảnh. | Commit; phần được dùng sẽ nằm trong website |
| `src/hooks/` | Logic hiệu ứng và vòng đời animation dùng bởi giao diện. | Commit; được biên dịch |
| `src/styles/` | Design tokens, CSS toàn cục và bố cục responsive. | Commit; được biên dịch |
| `public/` | File tĩnh công khai. Vite sao chép nội dung thư mục này vào `dist/`. Không đặt file riêng tư ở đây. | Commit; deploy |
| `public/images/` | Ảnh, logo và preview đã tối ưu để website sử dụng. URL `/images/...` trỏ đến đây khi phát triển, không phải `images/` cũ ở root. | Commit; deploy |
| `public/fonts/` | Font tự host và giấy phép OFL. | Commit; deploy |
| `public/projects/evidence/` | PDF dự án mà khách truy cập có thể mở từ portfolio. | Commit; deploy |
| `scripts/` | Công cụ build, chuẩn bị ảnh/font, đọc PDF và quản lý triển khai. Không phải tất cả script đều chạy khi build. | Commit; không deploy bản script |
| `tests/` | Mã kiểm thử Playwright: giao diện, accessibility, route, gallery và tương tác. | Commit; không deploy |
| `test-results/` | Kết quả chạy Playwright, thông tin lỗi và trace được giữ khi test thất bại. | Bị ignore; không deploy |
| `playwright-report/` | Báo cáo HTML nếu chạy Playwright với HTML reporter. Cấu hình hiện tại không bật reporter này mặc định. | Bị ignore; có thể không tồn tại; không deploy |
| `node_modules/` | Dependency cài từ `package-lock.json` bằng `npm ci`. | Bị ignore; không deploy nguyên thư mục; phần thư viện được import có thể được bundle |
| `dist/` | Kết quả cuối cùng của `npm run build`: HTML đã pre-render, JS/CSS, ảnh, font, sitemap và PDF. Không chỉnh sửa trực tiếp. | Bị ignore; đây là thư mục GitHub Pages thực sự nhận |

## `.qa/` — Quality Assurance workspace

**QA = Quality Assurance, tức kiểm tra chất lượng.** Trong repository này, `.qa/` là thư mục làm việc cục bộ đã được dùng khi xây dựng và kiểm tra portfolio. Nó không phải mã ứng dụng và không phải một thư mục chuẩn bắt buộc của React hay Vite. Một số file do test sinh ra, một số được tạo thủ công trong phiên làm việc.

| Nội dung hiện có | Dùng để làm gì? | Được tạo hoặc sử dụng bởi |
| --- | --- | --- |
| `desktop-full.png`, `tablet-full.png`, `mobile-full.png` | Chụp toàn trang ở ba kích thước để kiểm tra bố cục. | `tests/portfolio.spec.ts` |
| `desktop-gallery.png`, `tablet-gallery.png`, `mobile-gallery.png` | Kiểm tra bố cục preview dự án trên từng kích thước. | `tests/refinements.spec.ts` |
| `crop-*.jpg`, `check-*.jpg`, `*-review.jpg`, các ảnh `hero`, `new`, `final` | Ảnh cắt, thu nhỏ hoặc ảnh từ những vòng kiểm tra trước để xem typography, portrait, logo và collage. Có thể không phản ánh phiên bản mới nhất. | Các lệnh kiểm tra ảnh trong quá trình làm việc; không phải tất cả đều được test tự tạo lại |
| `oee-manufacturing-*.png`, `supplier-quality-*.png`, các ảnh report khác | Render từng trang PDF gốc để đọc và chọn preview. Các file website chính thức là bản WebP trong `public/images/`. | `scripts/inspect-project-pdfs.py` |
| `oee-manufacturing.txt`, `fitness-tracker.txt`, các file `.txt` khác | Text trích từ PDF để kiểm tra nội dung và tránh viết sai thông tin dự án. | `scripts/inspect-project-pdfs.py` |
| `python/` | Bản cài cục bộ của PyMuPDF, pypdf và dependency phục vụ đọc/render PDF. Script đọc PDF thêm thư mục này vào Python import path. | Cài bằng pip khi cần kiểm tra PDF; không do `npm ci` cài |
| `font-tools/` | FontTools/Brotli đã dùng để kiểm tra trục `wght` và `opsz` của font Bodoni. | Công cụ kiểm tra font cục bộ; không thuộc runtime |
| `verify-live.mjs` | Kiểm tra trang đã deploy: HTTP status, nội dung mới, gallery, asset và trang 404. Đây là helper cục bộ, không nằm trong lệnh `npm test` hoặc workflow deploy. | Chạy thủ công bằng Node khi cần |
| `apply-refinements.py`, `add-galleries.py`, `fix-type.py`, `update-docs.py` | Script sửa file một lần trong đợt refinement trước. Không phải bước build và không được thiết kế để chạy lại trên mọi phiên bản. | Phiên chỉnh sửa cũ; không chạy lại như lệnh bảo trì định kỳ |

**Có thể xóa `.qa/` không?** Có thể dọn ảnh và kết quả kiểm tra cũ sau khi đã xem xong; website và `npm run build` không phụ thuộc vào chúng. Tuy nhiên, không phải mọi thứ trong `.qa/` đều tự tái tạo: xóa toàn bộ sẽ mất helper chưa commit, bằng chứng kiểm thử cũ và các bản cài Python. Hãy giữ hoặc sao lưu phần còn cần trước khi dọn. Không cần xóa thư mục này để deploy.

Sau khi dọn, các test chụp ảnh sẽ tạo lại ảnh của lần chạy mới khi được chạy cùng dev/preview server. Muốn chạy lại `scripts/inspect-project-pdfs.py`, cần có thư mục `.qa/`, PDF gốc trong `.docs/_local/3. UI Projects/` và dependency Python phù hợp. Ví dụ thiết lập từ PowerShell tại root repository:

```powershell
New-Item -ItemType Directory -Path .qa -Force
python -m pip install --target .qa/python pymupdf pypdf
python scripts/inspect-project-pdfs.py
```

File trong `.qa/` có thể chứa nội dung trích từ tài liệu gốc, nên không chuyển toàn bộ sang `public/` chỉ để chia sẻ kết quả kiểm thử. Helper nào trở thành quy trình sử dụng thường xuyên nên được kiểm tra, chuyển vào `scripts/` hoặc `tests/`, rồi commit và cập nhật guide.

## File cấu hình và các bước tạo output

| File / script | Trách nhiệm |
| --- | --- |
| `README.md` | Điểm bắt đầu: cài đặt và chạy dự án. |
| `.gitignore` | Xác định thư mục/file không commit, gồm `.qa/`, `_local/`, dependency và output. Ignore không có nghĩa là file có thể xóa tùy ý. |
| `package.json`, `package-lock.json` | Lệnh npm và dependency được khóa phiên bản. |
| `index.html` | Template HTML, metadata mặc định và điểm vào ứng dụng. |
| `tsconfig.json` | Quy tắc kiểm tra TypeScript. |
| `vite.config.ts` | Cấu hình React/Vite và base URL `/`. |
| `playwright.config.ts` | Kích thước desktop/tablet/mobile, browser, địa chỉ server test và lưu trace khi lỗi. |
| `scripts/prerender.mjs` | Tạo HTML cho homepage, case studies, 404 và sitemap sau khi Vite build. |
| `scripts/prepare-refinement-images.mjs` | Chuẩn bị ảnh mới từ nguồn cục bộ, ghi WebP vào `public/images/` và ánh xạ vào `src/data/images.ts`. |
| `scripts/prepare-assets.mjs` | Script chuẩn bị asset đời đầu. Vẫn tham chiếu đường dẫn cũ `Portrait/`, `UI Projects/` và project Think With AI bên cạnh; không chạy nguyên trạng với cấu trúc nguồn đã đổi tên. |
| `scripts/download-fonts.mjs` | Tải font và giấy phép khi chủ động cập nhật asset; không chạy trong build thường. |
| `scripts/inspect-project-pdfs.py` | Đọc PDF gốc, ghi text và ảnh render vào `.qa/`; không tự xuất gallery WebP vào `public/`. |
| `scripts/github-pages.mjs` | Xem trạng thái, cấu hình hoặc kích hoạt workflow GitHub Pages bằng credential Git hiện có; không phải script chạy trên trình duyệt. |

Luồng xuất bản: `src/` + `index.html` + `public/` → Vite build → `scripts/prerender.mjs` → `dist/` → GitHub Pages. `.qa/`, `.docs/_local/` và `test-results/` không nằm trong luồng này.

## Important responsibilities

`App.tsx` selects the homepage, a known project, or the 404 page. It is the sole owner of page sequence. `main.tsx` hydrates static HTML, falling back to client rendering in development. `Navigation` owns mobile disclosure, active-section observation, and the thin progress line. `Accordion` owns one open row, ARIA relationships, and inert closed panels. `ProjectPreview` downloads video only after the visitor requests it. `Portrait` renders one of three distinct transparent, original-color portraits and optional architecture. Hero owns the fourth portrait. `DestinationLink` opens external URLs, mailto links and source documents in separate tabs while preserving internal navigation. `ProjectGallery` renders project-specific evidence from `project-previews.ts`. New image dimensions are centralized in `images.ts`. `Footer` closes the identity loop.

`About` composes the career progression and supported statistics. `Capabilities` and `Experience` adapt data to the shared accordion. `Exploring` owns the selected conceptual direction. Other sections compose data without hidden application logic.

## Data and content flow

`src/data/* → sections/pages → shared components → semantic HTML`. Data never imports a presentation component. UI state stays local. No factual content is fetched at runtime. Content updates must retain provenance and must not promote reference-image placeholders into claims.

## Styling

`tokens.css` owns recurring colors, typography, spacing, borders, motion durations, and layers. `global.css` owns self-hosted font declarations, reset, focus, selection and reduced-motion defaults. `Portfolio.module.css` owns all compositions and its single responsive area at 1050px and 700px. It deliberately contains the related editorial layouts in one file so breakpoints are not scattered.

## Animation

`useEditorialMotion` dynamically imports GSAP/ScrollTrigger, reads CSS durations, and scopes all animation to the root. `gsap.matchMedia` and context cleanup revert owned effects. CSS handles the marquee, accordion height/opacity, hover and focus. All content remains available if animation fails or reduced motion is enabled. See `motion-system.md` for exact behavior.

## Routing

Real static directories: `/`, `/projects/think-with-ai/`, `/projects/mrp/`, `/projects/oee-manufacturing/`, `/projects/fitness-health/`, plus generated `/404.html`. Project links perform ordinary document navigation. No history router or hash-routing dependency is needed. Section anchors remain shareable. Adding a project with `caseStudy` automatically includes it in the build and sitemap. Project SEO is generated from that same record.

## Invariants

- Keep strict TypeScript and never introduce `any` to silence a type error.
- Preserve the A → B → D → C → E order.
- One source for each factual record and recurring visual token.
- Unknown employment dates/titles and unverified impact are omitted.
- Photographs and project evidence must come from real supplied sources.
- No API keys or private source documents in the published bundle.
- Interactions must work with keyboard, touch and reduced motion.
- Run an appropriate build and interaction check after structural changes.

## Known limitations and open decisions

Exact employment dates are not available; all role titles and priority were confirmed by the user on 2026-09-11. Several workplace projects only have an overview. The portrait composition uses supplied photographs, whose clothing, pose and background differ from the generated design concept. Capabilities, Experience and Growth now use supplied editorial images. Journey and Education now use the supplied school, workplace and recognition images; their source mappings are documented in image-maintenance.md. The original private source folder is not needed for a normal build. Safari compatibility is addressed with semantic HTML, progressive animation, and standard CSS; only actual executed browser tests should be reported as tested.

## Quick lookup

| I want to change… | Edit… |
| --- | --- |
| Brand red, fonts, spacing, durations | `src/styles/tokens.css` |
| Font files | `public/fonts/` and `src/styles/global.css` |
| Hero content | `src/data/profile.ts` |
| Hero composition / crop | `src/sections/Hero.tsx`, hero rules in `Portfolio.module.css` |
| Add or update a project / case study | `src/data/projects.ts` |
| Update a capability | `src/data/capabilities.ts` |
| Update experience | `src/data/experience.ts` |
| Education or scholarship | `src/data/education.ts` |
| Social URL / contact | `src/data/links.ts`, `src/data/profile.ts` |
| Global motion timing | `tokens.css` |
| Section choreography | `src/hooks/useEditorialMotion.ts` |
| Page sequence / route selection | `src/App.tsx` |
| Metadata / static routes | `index.html`, `scripts/prerender.mjs` |
| Publishing / rollback | `.github/workflows/deploy.yml`, `.docs/deployment.md` |
| Hiểu hoặc dọn file kiểm tra trong `.qa/` | Phần “`.qa/` — Quality Assurance workspace” ở trên |
| Đổi ảnh / thêm preview dự án | `public/images/`, `src/data/images.ts`, `src/data/project-previews.ts` |
| Thay ảnh gốc và tạo lại WebP | [Hướng dẫn cập nhật ảnh](image-maintenance.md); `npm.cmd run images:prepare` |
| Xem test lỗi / ảnh kiểm tra | `test-results/` cho lỗi và trace; `.qa/` cho screenshot |

Update this guide whenever architecture or an important responsibility changes. Khi thêm thư mục phục vụ dự án — kể cả thư mục bị Git ignore — hãy ghi rõ mục đích, ai tạo/sử dụng, có commit/deploy không và cách dọn/tái tạo nếu phù hợp. Không cần liệt kê từng dependency hoặc từng ảnh kiểm tra sinh tự động.

New supporting assets: run `npm.cmd run images:prepare` with the local source folder available. The command runs `scripts/prepare-refinement-images.mjs`. Normal builds use committed optimized images and do not depend on local source files. See [image-maintenance.md](image-maintenance.md) for source-to-output mappings, replacement instructions and the script's limits.
