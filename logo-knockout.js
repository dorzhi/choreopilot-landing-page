// logo-knockout.js — load the white-bg ChoreoPilot logo, crop the dancer emblem,
// knock out the white to transparent, and expose it as the CSS var --logo-img.
// Runs without React; sets the var on :root so .logo-mark picks it up whenever it renders.
(function () {
  var KEY = "cp_logo_emblem_v3";
  var SRC = "assets/choreopilot-logo-v2-raw.png";
  var CROP = { x: 150, y: 78, w: 725, h: 552 }; // emblem region in the 1024x1024 source
  var OUTW = 320;

  function apply(url) {
    document.documentElement.style.setProperty("--logo-img", "url(" + url + ")");
  }

  // 1) instant paint from cache (no flash on repeat loads)
  try {
    var cached = localStorage.getItem(KEY);
    if (cached) apply(cached);
  } catch (e) {}

  // 2) (re)generate from source
  function build() {
    var img = new Image();
    img.onload = function () {
      try {
        var buf = document.createElement("canvas");
        buf.width = 1024; buf.height = 1024;
        var bx = buf.getContext("2d");
        bx.drawImage(img, 0, 0, 1024, 1024);
        var id = bx.getImageData(0, 0, 1024, 1024);
        var p = id.data;
        for (var i = 0; i < p.length; i += 4) {
          var m = Math.min(p[i], p[i + 1], p[i + 2]); // high only for white/near-white
          if (m >= 249) p[i + 3] = 0;
          else if (m >= 228) p[i + 3] = Math.round(p[i + 3] * (1 - (m - 228) / 21));
        }
        bx.putImageData(id, 0, 0);

        var outH = Math.round(OUTW * CROP.h / CROP.w);
        var out = document.createElement("canvas");
        out.width = OUTW; out.height = outH;
        var ox = out.getContext("2d");
        ox.imageSmoothingQuality = "high";
        ox.drawImage(buf, CROP.x, CROP.y, CROP.w, CROP.h, 0, 0, OUTW, outH);

        var url = out.toDataURL("image/png");
        apply(url);
        try { localStorage.setItem(KEY, url); } catch (e) {}
      } catch (e) { /* keep cache / fallback */ }
    };
    img.src = SRC;
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
