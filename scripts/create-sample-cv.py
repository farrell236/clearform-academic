"""Regenerate the fictional demo CV. Requires reportlab; no personal assets."""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


def main():
    target = Path(__file__).resolve().parents[1] / "public/files/sample-cv.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    page = canvas.Canvas(str(target), pagesize=A4, invariant=1)
    page.setTitle("Fictional Sample CV - Alex Example")
    page.setAuthor("Clearform template")
    page.setSubject("Entirely fictional sample content. Replace before use.")
    width, height = A4
    left, right = 54, width - 54
    text = colors.HexColor("#202428")
    secondary = colors.HexColor("#59636e")
    accent = colors.HexColor("#245d73")
    body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10.5,
                          leading=15, textColor=text)

    page.setFillColor(accent)
    page.setFont("Helvetica-Bold", 9)
    page.drawString(left, height - 55, "FICTIONAL SAMPLE CV - NOT A REAL PERSON OR CREDENTIAL")
    page.setFillColor(text)
    page.setFont("Helvetica-Bold", 27)
    page.drawString(left, height - 102, "Alex Example")
    page.setFillColor(secondary)
    page.setFont("Helvetica", 11)
    page.drawString(left, height - 127, "Computational science and machine learning")
    page.drawString(left, height - 147, "alex@example.org | https://example.org")
    page.setStrokeColor(colors.HexColor("#dde2e7"))
    page.line(left, height - 167, right, height - 167)
    y = height - 194

    def section(title, paragraphs):
        nonlocal y
        page.setFillColor(accent)
        page.setFont("Helvetica-Bold", 12)
        page.drawString(left, y, title)
        y -= 24
        for content in paragraphs:
            paragraph = Paragraph(content, body)
            _, paragraph_height = paragraph.wrap(right - left, height)
            paragraph.drawOn(page, left, y - paragraph_height + 10)
            y -= paragraph_height + 15
        y -= 8

    section("Research interests", [
        "Structured learning, synthetic data and multimodal systems. "
        "This paragraph demonstrates a short research summary, not actual experience."
    ])
    section("Sample appointments", [
        "<b>Research Fellow, Example University</b> | 2024-present<br/>"
        "Fictional appointment included only to demonstrate CV formatting."
    ])
    section("Sample education", [
        "<b>PhD in Computational Science, Example University</b> | 2020-2024<br/>"
        "Fictional qualification and institution; not a real academic record."
    ])
    section("Sample publications", [
        "Alex Example and Taylor Sample (2025). Structure-Aware Representations "
        "for Scientific Learning. Example Research Proceedings. Fictional citation.",
        "Alex Example and Jordan Placeholder (2024). Controllable Synthetic Images "
        "for Research Datasets. Journal of Example Methods. Fictional citation."
    ])
    section("Sample teaching", [
        "Introduction to Scientific Computing; Research Methods. "
        "Fictional courses and activities for the template demo."
    ])
    if y < 80:
        raise ValueError("Sample CV content exceeds the one-page layout")
    page.setFillColor(secondary)
    page.setFont("Helvetica", 9)
    page.drawString(left, 47, "Replace all sample details before using this as your own CV.")
    page.drawRightString(right, 47, "1 / 1")
    page.save()
    print("Generated one-page fictional sample CV.")


if __name__ == "__main__":
    main()
