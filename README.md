# I Ching Oracle PWA - Weekend MVP

Offline-first mobile PWA inspired by the bright visual language of the reference site.

## MVP included
- Question entry
- Virtual three-coin casting
- Six throws, bottom line to top line
- Traditional 6/7/8/9 line values
- Changing lines in red
- Primary and relating hexagram calculation
- 64 hexagram names and Unicode symbols
- Real-coin entry mode
- Local reading history
- Service worker/offline cache
- Installable PWA manifest

## Run locally
A service worker generally requires localhost or HTTPS. From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` on a computer. For phone testing on the same Wi-Fi, use the computer's LAN IP, though service-worker installation may require HTTPS depending on browser/security context.

## Next build steps
1. Verify every hexagram mapping against a trusted canonical table.
2. Replace Unicode hexagram symbols with custom SVG line graphics for consistent Android rendering.
3. Add coin-face artwork and throw animation.
4. Add a dedicated reading screen with traditional text that we have rights to use.
5. Add optional OpenAI/Grok interpretation layer.
6. Add export/import and optional cloud sync.
7. Package for Android / Play Store after PWA is stable.
