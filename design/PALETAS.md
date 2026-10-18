# Palabrando · paletas acordadas

Estas cuatro familias cromáticas quedan guardadas como base de identidad. La aplicación puede usar varias a la vez; no se elegirá una única paleta global.

## Terracota + arcilla

| Token | Hex | Uso |
| --- | --- | --- |
| `terracotta` | `#B56750` | Tono principal, títulos o acciones de marca. |
| `clay` | `#D49B86` | Acento claro, segunda comilla o superficie secundaria. |
| `clayShade` | `#8C4939` | Sombra/canto manual en ilustración; no para sombras borrosas. |
| `warmPaper` | `#FBF0E9` | Papel de fondo. |
| `terracottaInk` | `#51372F` | Nombre y texto oscuro de esta familia. |

Arcilla puede omitirse: si se elimina, el tono principal ocupa también su papel decorativo y la marca queda a una tinta.

## Ocre + papel miel

| Token | Hex | Uso |
| --- | --- | --- |
| `ochre` | `#9C6D20` | Tono principal, títulos o acciones de marca. |
| `honey` | `#D4AA5F` | Acento claro o segunda comilla. |
| `ochreShade` | `#79501A` | Sombra/canto manual en ilustración. |
| `honeyPaper` | `#FFF3D6` | Papel miel de fondo. |
| `ochreInk` | `#4E3B25` | Nombre y texto oscuro de esta familia. |

## Agua + papel claro

| Token | Hex | Uso |
| --- | --- | --- |
| `water` | `#27879D` | Aqua principal, sin virar a verde ni a azul pizarra. |
| `waterLight` | `#82C7D5` | Agua clara, segunda comilla o acento decorativo. |
| `waterShade` | `#1F687B` | Sombra/canto manual en ilustración. |
| `clearPaper` | `#EEF9FB` | Papel casi blanco con un matiz de agua. |
| `waterInk` | `#28434B` | Nombre y texto oscuro de esta familia. |

La interpretación de “agua o niebla” es aqua claro y papel luminoso; no incluye bruma azul grisácea.

## Ciruela + malva

| Token | Hex | Uso |
| --- | --- | --- |
| `plum` | `#75435F` | Tono principal, títulos o acciones de marca. |
| `mauve` | `#C8A6BD` | Acento claro o segunda comilla. |
| `plumShade` | `#573145` | Sombra/canto manual en ilustración. |
| `mauvePaper` | `#F8F0F5` | Papel de fondo. |
| `plumInk` | `#482A3D` | Nombre y texto oscuro de esta familia. |

## Aplicación en el producto

- Las cartas tienen un tema cromático derivado de su **primera etiqueta morfológica asignada**. El orden de asignación se conserva; si se retira esa etiqueta, se toma la primera etiqueta restante. La paleta no se asigna al azar ni se guarda como un estado manual separado.
- La familia agua + papel claro se reserva para el cuaderno de captura. Las otras tres familias se repartirán entre las etiquetas morfológicas principales; queda pendiente concretar la tabla etiqueta → paleta al cerrar el catálogo.
- La portada/home y los elementos genéricos usarán estas cuatro familias de forma coherente, apoyadas por sus papeles claros y tintas oscuras. Ninguna combinación adicional verde, pizarra o sepia pasa a ser color de marca.
- Los acentos claros (`clay`, `honey`, `waterLight`, `mauve`) pueden decorar símbolos o superficies. No se usan solos para texto pequeño, controles ni estados que deban leerse con claridad; en esos casos se usa la tinta oscura correspondiente.
- El logo aprobado son las dos comillas en yin-yang abierto, separación `Equilibradas`, en `logos/logo-comillas.svg`. Su SVG se parametriza con `--logo-left` y `--logo-right`; de forma predeterminada usa gris carbón (`#343434`) y gris medio (`#777777`). La variante del cuaderno usa agua y agua clara en `logos/logo-comillas-agua.svg`. Las variantes de los otros elementos usarán el tono principal y el acento claro de cada familia. El sombreado, si aparece, se dibuja como un canto breve y sutil, no como un desenfoque.

## Colores descartados

No forman parte de la identidad: bosque, salvia, cualquier verde, azul pizarra, bruma azul/gris, oliva, avena verde, sepia albaricoque y tinta pino.
