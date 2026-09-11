import sys
from pathlib import Path
sys.path.insert(0, str(Path('.qa/python').resolve()))
import pymupdf as fitz
from pypdf import PdfReader

root = Path('.docs/_local/UI Projects')
for path in root.rglob('*.pdf'):
    slug = path.parent.name.lower().replace('analysis - ', '').replace(' - runner-up', '').replace(' ', '-')
    reader = PdfReader(path)
    print(f'\n{path.parent.name}: {len(reader.pages)} pages')
    text = '\n'.join(page.extract_text() or '' for page in reader.pages)
    print(text[:6500].encode('ascii', 'replace').decode('ascii'))
    Path(f'.qa/{slug}.txt').write_text(text, encoding='utf-8')
    document = fitz.open(path)
    for index in range(min(3, len(document))):
        page = document[index]
        page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(f'.qa/{slug}-{index}.png')
