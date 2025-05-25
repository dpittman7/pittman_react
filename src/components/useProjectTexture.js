// useProjectTexture.js
import { useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import html2canvas from 'html2canvas'
import * as THREE from 'three'
import Project from './Project'

export function useProjectTexture(project, size = 512) {
  const canvasRef = useRef(document.createElement('canvas'))
  const texture = useMemo(() => {
    console.log('[DEBUG] 🖌️ Creating new CanvasTexture for', project.title)
    const tex = new THREE.CanvasTexture(canvasRef.current)
    tex.minFilter     = THREE.LinearFilter
    tex.magFilter     = THREE.LinearFilter
    tex.generateMipmaps = false
    return tex
  }, [project.title])

  useEffect(() => {
    console.log('[DEBUG] 🔄 useEffect for project:', project.title)
    const canvas = canvasRef.current
    canvas.width  = size
    canvas.height = size

    // mount offscreen container—*but* slap it at top:10px so we can see it
    const offscreen = document.createElement('div')
    offscreen.style.position = 'fixed'
    offscreen.style.top      = '10px'
    offscreen.style.left     = '10px'
    offscreen.style.width    = `${size}px`
    offscreen.style.height   = `${size}px`
    offscreen.style.border   = '2px dashed red'
    offscreen.style.background = '#eee'
    document.body.append(offscreen)

    const root = createRoot(offscreen)
    console.log('[DEBUG] 📦 Rendering <Project> into offscreen container')
    root.render(
      <div style={{ width: size, height: size, background: '#fff' }}>
        <Project project={project} />
      </div>
    )

    // log the raw HTML and img count
    console.log('[DEBUG] offscreen.innerHTML:', offscreen.innerHTML)
    const imgs = Array.from(offscreen.getElementsByTagName('img'))
    console.log(`[DEBUG] ${imgs.length} <img> tags found in offscreen`)

    // wait for images or timeout
    const waits = imgs.map(img =>
      img.complete
        ? Promise.resolve()
        : new Promise(res => {
            console.log('[DEBUG] waiting for img to load:', img.src)
            img.onload  = () => { console.log('[DEBUG] img loaded:', img.src); res() }
            img.onerror = () => { console.warn('[DEBUG] img failed:', img.src); res() }
          })
    )
    const waitAll = Promise.all(waits)
    const waitTimeout = new Promise(res => setTimeout(res, 1000))
    Promise.race([ waitAll, waitTimeout ]).then(() => {
      console.log('[DEBUG] ⏱️ Images promise settled, now calling html2canvas')
      return html2canvas(offscreen, {
        canvas,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
      })
    })
    .then(() => {
      console.log('[DEBUG] ✅ html2canvas succeeded')
      // show the snapshot canvas
      canvas.style.position = 'fixed'
      canvas.style.top      = '10px'
      canvas.style.left     = '530px'
      canvas.style.border   = '2px solid blue'
      document.body.append(canvas)
      console.log('[DEBUG] Canvas Data URL snippet:', canvas.toDataURL().slice(0,200))
      texture.needsUpdate = true
    })
    .catch(err => console.error('[DEBUG] html2canvas ERROR:', err))
    .finally(() => {
      console.log('[DEBUG] 🔥 cleanup offscreen & root')
      root.unmount()
      // leave the snap canvas in place for 3s so you can inspect it
      setTimeout(() => {
        offscreen.remove()
        canvas.remove()
      }, 3000)
    })

    return () => {
      console.log('[DEBUG] cleanup on unmount for project:', project.title)
      root.unmount()
      offscreen.remove()
      // don't remove canvas here, allow THREE to consume it
    }
  }, [project.title, size, texture])

  return texture
}
