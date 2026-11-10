#!/usr/bin/env python3
"""Schrijf de rekenkern uit index.html naar argenta-engine.js (bruikbaar in de browser en in Node).

Gebruik:
    python3 tools/export_engine.py

index.html blijft de enige bron: de rekenkern staat daar tussen /*ENGINE_START*/ en /*ENGINE_END*/.
Draai dit script na elke wijziging van tarieven, normen of rekenregels.
"""
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "index.html").read_text(encoding="utf-8")
m = re.search(r"/\*ENGINE_START\*/\n(.*?)/\*ENGINE_END\*/", src, flags=re.S)
assert m, "ENGINE-markers niet gevonden in index.html"
kern = m.group(1)
assert "document." not in kern and "window." not in kern and "$(" not in kern, "de rekenkern mag geen schermcode bevatten"
out = ("/* Gegenereerd uit index.html door tools/export_engine.py - niet handmatig wijzigen. */\n"
       + kern
       + "\nif (typeof module !== 'undefined' && module.exports) module.exports = ArgentaEngine;\n"
       + "if (typeof globalThis !== 'undefined') globalThis.ArgentaEngine = ArgentaEngine;\n")
(root / "argenta-engine.js").write_text(out, encoding="utf-8")
print(f"argenta-engine.js geschreven ({len(out) // 1024} kB)")
