from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from pypdf import PdfReader


@dataclass(frozen=True)
class SourcePdf:
    slug: str
    path: Path


def extract_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    parts: list[str] = []

    for i, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as exc:  # noqa: BLE001
            text = f"[EXTRACTION_ERROR page={i}: {exc}]\n"
        parts.append(f"\n\n--- PAGE {i} ---\n\n{text.strip()}\n")

    return "\n".join(parts).strip() + "\n"


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    company_data_root = repo_root / "SETLY company core data" / "Setly formation data"
    out_dir = repo_root / "content" / "company-data-extracted"
    out_dir.mkdir(parents=True, exist_ok=True)

    sources = [
        SourcePdf("one-page-overview", company_data_root / "Setly_One_Page_Overview.pdf"),
        SourcePdf("business-plan-2025", company_data_root / "SETLY_Business_Plan_2025.pdf"),
        SourcePdf("pitch-deck", company_data_root / "Setly_Pitch_Deck.pdf"),
        SourcePdf("brand-story", company_data_root / "Setly_Brand_Story_Kiran_Revally.pdf"),
        SourcePdf("brand-blueprint", company_data_root / "SETLY_Brand_Blueprint.pdf"),
        SourcePdf("manifesto", company_data_root / "SETLY_Manifesto_Vision2025.pdf"),
        SourcePdf("vision-2025-2030", company_data_root / "SETLY_Vision_2025_2030.pdf"),
    ]

    missing = [s.path for s in sources if not s.path.exists()]
    if missing:
        raise SystemExit(f"Missing PDFs: {missing}")

    for src in sources:
        text = extract_pdf_text(src.path)
        (out_dir / f"{src.slug}.txt").write_text(text, encoding="utf-8")

    print(f"Extracted {len(sources)} PDFs to: {out_dir}")


if __name__ == "__main__":
    main()
