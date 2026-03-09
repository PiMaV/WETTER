"""Embed WETTER_Framework_1024.png as base64 into wetter_concept_clickable.svg for GitHub."""
import base64
from pathlib import Path

ASSETS = Path(__file__).resolve().parent
PNG = ASSETS / "WETTER_Framework_1024.png"
SVG_IN = ASSETS / "wetter_image_clickable.svg"
SVG_OUT = ASSETS / "wetter_image_clickable.svg"

png_bytes = PNG.read_bytes()
b64 = base64.b64encode(png_bytes).decode("ascii")
data_uri = f"data:image/png;base64,{b64}"

svg = SVG_IN.read_text(encoding="utf-8")
# Replace external href with data URI
old = 'href="WETTER_Framework_1024.png"'
if old not in svg:
    raise SystemExit("SVG no longer has expected image href")
svg = svg.replace(old, f'href="{data_uri}"')
SVG_OUT.write_text(svg, encoding="utf-8")
print("OK: SVG written with embedded PNG")
