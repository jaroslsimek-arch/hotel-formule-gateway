/**
 * Hotel Formule — Marta AI widget loader.
 *
 * Embed on any website with a single tag:
 *   <script src="https://YOUR-DOMAIN/widget.js" async></script>
 *
 * It injects a full-viewport, transparent iframe that renders the existing
 * Marta widget (launcher + assistant card + chat modal + Typebot). The iframe
 * stays full-viewport so the widget's responsive layout, animations and
 * full-screen modal resolve against the real device viewport — exactly like a
 * native page. To keep the rest of the host page clickable, the iframe is
 * clipped (via clip-path) to just the widget's on-screen box; the embedded
 * page reports that box and asks for a full-viewport clip while the chat modal
 * is open.
 */
(function () {
  "use strict"

  if (window.__hotelFormuleWidgetLoaded) return
  window.__hotelFormuleWidgetLoaded = true

  // --- Resolve the origin from this script's own URL. ----------------------
  var current =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script")
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf("widget.js") !== -1) return scripts[i]
      }
      return null
    })()

  var origin
  try {
    origin = new URL(current.src).origin
  } catch (e) {
    origin = window.location.origin
  }

  var EMBED_URL = origin + "/embed"
  // A sensible bottom-right corner shown until the embed reports its real box.
  var DEFAULT_CLIP = "inset(calc(100% - 150px) 0px 0px calc(100% - 360px))"

  // --- Build the iframe. ---------------------------------------------------
  var iframe = document.createElement("iframe")
  iframe.title = "Marta — AI asistentka Hotelu Formule"
  iframe.setAttribute("allow", "clipboard-write; microphone; camera")
  iframe.src = EMBED_URL

  var s = iframe.style
  s.position = "fixed"
  s.top = "0"
  s.left = "0"
  s.width = "100%"
  s.height = "100%"
  s.border = "0"
  s.margin = "0"
  s.padding = "0"
  s.background = "transparent"
  s.colorScheme = "normal"
  s.zIndex = "2147483000"
  s.pointerEvents = "auto"
  s.clipPath = DEFAULT_CLIP
  s.webkitClipPath = DEFAULT_CLIP

  function setClip(value) {
    iframe.style.clipPath = value
    iframe.style.webkitClipPath = value
  }

  function mount() {
    if (!document.body) {
      window.requestAnimationFrame(mount)
      return
    }
    document.body.appendChild(iframe)
  }
  mount()

  // --- React to messages from the embedded page. ---------------------------
  window.addEventListener("message", function (event) {
    if (event.origin !== origin) return
    if (iframe.contentWindow && event.source !== iframe.contentWindow) return
    var data = event.data
    if (!data || data.source !== "haw-embed") return

    if (data.type === "fullscreen") {
      // Remove the clip so the full-screen modal + backdrop cover the page.
      setClip(data.on ? "none" : DEFAULT_CLIP)
    } else if (data.type === "clip" && typeof data.inset === "string") {
      setClip("inset(" + data.inset + ")")
    }
  })
})()
