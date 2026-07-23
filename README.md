# Franja

Metabuscador de vuelo, tren y bus. Un archivo HTML, JS vanilla, sin build.
El diferenciador: una preferencia horaria previa a la búsqueda que **ordena** por cercanía
a la hora deseada en vez de recortar resultados, con franjas duras de salida y llegada.

## Estado

- **Modo mock por defecto**: la app es 100% funcional sin ninguna clave ni conexión.
- **Modo live (solo vuelos)**: precios reales de la caché de Aviasales vía Travelpayouts.
  Requiere el proxy de `worker.js` (Cloudflare Workers). CORS y el token no dejan otra opción.
- **Tren y bus**: simulados. No hay API self-service; el acceso pasa por acuerdo comercial.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera |
| `manifest.webmanifest` | PWA: nombre, iconos, `display: standalone` |
| `sw.js` | Service worker. Cachea la app, nunca los precios |
| `icons/` | 192, 512, maskable y 1024 (fuente para PWABuilder) |
| `.well-known/assetlinks.json` | Plantilla para el APK. **Va en la raíz del dominio, no aquí** |
| `worker.js` | Proxy del modo live |

## Configuración

Todo en `CONFIG`, al principio del `<script>`:
`MODE` ('mock' | 'live'), `PROXY_URL`, `ACCESS_BUFFER_MINUTES`, `CO2_FACTORS`, `BEST`.
