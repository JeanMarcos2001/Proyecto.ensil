# Reglas del Proyecto Ensil

## ❌ MODIFICACIONES PROHIBIDAS: Alturas de Cards con Estilos Mixtos

**Nunca** usar una combinación de `inline style`, `min-h`, `h-[px]` individuales por tarjeta para controlar la altura de las cards principales de una sección tipo grid. Este enfoque produce alturas inconsistentes e incontrolables entre las columnas:

```jsx
// ❌ MAL — Estilos mezclados, alturas distintas por card
<div className="grid items-start">
  <div style={{ height: '340px' }}>   {/* video */}
  <div style={{ minHeight: '560px' }}> {/* form */}
```

**Siempre** colocar la altura única en el contenedor del grid y dejar que las columnas la hereden mediante `items-stretch` + `h-full`:

```jsx
// ✅ BIEN — Un solo height en el grid, ambas cards equiparadas
<div className="grid lg:grid-cols-[...] lg:grid-rows-1 items-stretch lg:h-[Xpx]">
  <div className="h-full flex flex-col gap-4">   {/* columna izquierda: title shrink-0 + video flex-1 */}
  <div className="h-full flex flex-col">          {/* columna derecha: form card */}
```

> **IMPORTANTE**: `h-[Xpx]` en el grid solo fija el alto del *contenedor*, no de sus filas.
> Sin `lg:grid-rows-1`, la fila usa `auto` (alto del contenido más alto) y las cards quedan desiguales.
> Siempre usar `lg:grid-rows-1` junto con `lg:h-[Xpx]` en el contenedor grid para que `items-stretch` funcione correctamente.

### Regla de distribución interna de la columna izquierda
- **Title Card**: `shrink-0` → toma su altura natural de contenido.
- **Video Card**: `flex-1` → ocupa el espacio restante sin cortar nada.
- **No usar** `flex-1` y `h-[px]` fijo al mismo tiempo en la misma tarjeta.

### Regla al reducir o aumentar alturas de sección
- Solo modificar el valor `lg:h-[Xpx]` del **contenedor grid principal**.
- No tocar las clases de altura de los hijos (`h-full`, `flex-1`, `shrink-0`).
- El contenido del formulario (columna derecha) siempre debe tener `overflow-y-auto` en su contenedor interior para que haga scroll en lugar de cortar el contenido.
