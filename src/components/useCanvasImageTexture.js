// useCanvasImageTexture.js
import { useState, useEffect } from 'react'
import * as THREE from 'three'

export function useCanvasImageTexture(src, size = 512) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    if (!src) return
    console.log('[useCanvasImageTexture] loading image:', src)
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src

    img.onload = () => {
      console.log('[useCanvasImageTexture] image.onload fired:', img.width, img.height)

      // 1) Setup our square canvas
      const canvas = document.createElement('canvas')
      canvas.width  = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      // DEBUG: append the canvas so you see it in the top‑left corner
      canvas.style.position = 'fixed'
      canvas.style.top      = '0'
      canvas.style.left     = '0'
      canvas.style.border   = '2px solid red'
      document.body.appendChild(canvas)
      // remove after 5s
      setTimeout(() => document.body.removeChild(canvas), 5000)

      // 2) Fill white
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, size, size)

      // 3) Compute fit dims
      const iw = img.width, ih = img.height
      const aspect = iw / ih
      let dw, dh
      if (aspect > 1) {
        dw = size
        dh = size / aspect
      } else {
        dh = size
        dw = size * aspect
      }
      const dx = (size - dw) / 2
      const dy = (size - dh) / 2

      console.log('[useCanvasImageTexture] drawImage dst:', { dx, dy, dw, dh })
      ctx.drawImage(img, dx, dy, dw, dh)

      // 4) Create Three.js texture
      const tex = new THREE.CanvasTexture(canvas)
      tex.minFilter       = THREE.LinearFilter
      tex.magFilter       = THREE.LinearFilter
      tex.generateMipmaps = false
      tex.needsUpdate     = true

      console.log('[useCanvasImageTexture] created texture', tex)
      setTexture(tex)
    }

    img.onerror = (e) => {
      console.error('[useCanvasImageTexture] image.onerror', e)
    }
  }, [src, size])

  return texture
}
