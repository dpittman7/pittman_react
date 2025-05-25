// utils/htmlToSvgTexture.js
import * as THREE from 'three'

export function htmlToSvgTexture(htmlString, width = 512, height = 512) {
  // 1) Build the SVG string
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml"
             style="
               width:${width}px;
               height:${height}px;
               box-sizing:border-box;
               padding:8px;
               background:#fff;
               border:1px solid #ddd;
               font-family:sans-serif;
             ">
          ${htmlString}
        </div>
      </foreignObject>
    </svg>`

  // 2) Encode as a data URI
  const encoded = encodeURIComponent(svg)
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`

  console.log('[htmlToSvgTexture] Data-URI preview:', dataUrl.slice(0,200))

  // 3) Create an Image so you can both debug and feed Three.js
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = dataUrl

  // Debug: append it to the page so you can see it right away
  img.style.position = 'fixed'
  img.style.top      = '10px'
  img.style.left     = '10px'
  img.style.border   = '2px solid green'
  document.body.append(img)
  // remove after 5s
  setTimeout(() => document.body.removeChild(img), 5000)

  // 4) Build the Three.js texture
  const texture = new THREE.Texture(img)
  texture.minFilter     = THREE.LinearFilter
  texture.magFilter     = THREE.LinearFilter
  texture.generateMipmaps = false

  // 5) When the image loads, tell Three.js to update
  img.onload = () => {
    console.log('[htmlToSvgTexture] image loaded, updating texture')
    texture.needsUpdate = true
  }
  img.onerror = (e) => {
    console.error('[htmlToSvgTexture] image failed to load', e)
  }

  return texture
}
