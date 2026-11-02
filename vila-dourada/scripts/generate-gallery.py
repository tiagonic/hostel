
#!/usr/bin/env python3

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
GALLERY_DIR = PROJECT_ROOT / "img" / "galeria"

SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
}

def generate_gallery():

    if not GALLERY_DIR.exists():
        raise FileNotFoundError(GALLERY_DIR)

    images = sorted(
        [
            file.name
            for file in GALLERY_DIR.iterdir()
            if file.is_file()
            and file.suffix.lower() in SUPPORTED_EXTENSIONS
        ],
        key=str.casefold,
    )

    # Manifesto JSON
    (GALLERY_DIR / "images.json").write_text(
        json.dumps(images, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # Manifesto JavaScript
    javascript = (
        "window.GALLERY_IMAGES = "
        + json.dumps(images, ensure_ascii=False, indent=2)
        + ";\n"
    )

    (GALLERY_DIR / "images.js").write_text(
        javascript,
        encoding="utf-8",
    )

    print(f"Galeria atualizada: {len(images)} imagens")

if __name__ == "__main__":
    generate_gallery()
