import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_text(path):
    WORD_NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    PARA = WORD_NAMESPACE + 'p'
    TEXT = WORD_NAMESPACE + 't'

    if not os.path.exists(path):
        return f"File not found: {path}"

    try:
        with zipfile.ZipFile(path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            paragraphs = []
            for paragraph in root.iter(PARA):
                texts = [node.text for node in paragraph.iter(TEXT) if node.text]
                # Keep empty paragraph separators
                paragraphs.append("".join(texts))
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading {path}: {str(e)}"

# Extract guidelines
guidelines_text = get_docx_text("Assignment_2b_guideline presentation and demo technical AI solution S1, 2026 (1).docx")
with open("guidelines.txt", "w", encoding="utf-8") as f:
    f.write(guidelines_text)

# Extract rubric
rubric_text = get_docx_text("Assignment_2b_Marking_Rubric_S1, 2026.docx")
with open("rubric.txt", "w", encoding="utf-8") as f:
    f.write(rubric_text)

print("Extraction completed successfully!")
