# Palabrando · Hebra entre Comillas

Revisión del 18 de octubre de 2026. Galería: [hebra-comillas.html](hebra-comillas.html). Fuente de las geometrías: [sol-61.html](sol-61.html), símbolos `hebra` y `comillas`.

## Corrección recibida

El usuario precisó que quería **la P del logo Hebra entre las dos formas del logo Comillas**: «'p' pero usando ambos logos». La interpretación tipográfica anterior no correspondía a esa petición. Se retiraron los glifos de fuente del símbolo y se recuperaron las dos formas originales.

La galería muestra ahora una sola combinación de esos dos logos. Mantiene el wordmark Palabrando y la comparación de las cuatro paletas aprobadas. El símbolo se presenta plano, sin elementos añadidos ni efectos nuevos. El archivo de origen y la aplicación permanecen sin cambios.

## Geometrías recuperadas íntegramente

En los `defs` del nuevo HTML se copiaron **literalmente los bloques completos** `<symbol id="hebra">` y `<symbol id="comillas">` de `sol-61.html`, incluidos todos sus atributos de ruta.

- **Hebra:** se conserva su ruta principal, su grosor original de 14 unidades, sus extremos redondos, sus puntos de control y su caja de 100 × 100 unidades. El símbolo compuesto utiliza esa definición mediante `<use href="#hebra">`.
- **Comillas:** se conservan sus dos rutas cerradas completas, sin modificar ningún punto. En el símbolo compuesto se copia cada una dentro de un grupo independiente para poder separarlas y colocar la P entre ambas.
- **Acabados del original:** los dos trazados de sombra/luz que ya existían en Hebra siguen presentes dentro de su copia literal. La regla `.shade { display:none }` los mantiene ocultos en todas las vistas. No se crean sombras o luces nuevas.
- El símbolo no usa caracteres de fuente, no redibuja la P y no deforma los originales. Los únicos cambios de colocación son traslaciones de grupo; no hay rotaciones ni escalas distintas entre ejes.

La tipografía Georgia se utiliza únicamente para el nombre **Palabrando**, separado del símbolo vectorial.

## Composición: la P entre las comillas

El símbolo combinado `quoted-p` tiene `viewBox="0 0 170 100"`.

| Pieza | Geometría | Transformación del grupo |
|---|---|---|
| Comilla izquierda | Primera ruta de `comillas`, íntegra | `translate(4 0)` |
| P central | Símbolo `hebra`, íntegro | `translate(32.697 0)` |
| Comilla derecha | Segunda ruta de `comillas`, íntegra | `translate(64 0)` |

No se cambia la altura relativa ni la asimetría original de las comillas. Se abre entre ellas el espacio necesario para alojar la P.

### Confirmación estática de posición

Se calcularon los extremos horizontales de las curvas Bézier originales. Para la P se incluyó el radio de 7 unidades de su trazo de 14 unidades. Los valores siguientes están redondeados a tres decimales:

| Pieza colocada | Extremo izquierdo | Extremo derecho |
|---|---:|---:|
| Comilla izquierda | 16,509 | 50,147 |
| P / Hebra | 54,697 | 113,325 |
| Comilla derecha | 117,875 | 151,000 |

Por tanto, las piezas se ordenan **comilla — P — comilla**, con aproximadamente **4,550 unidades de separación a cada lado de la P**. La P está centrada horizontalmente en el espacio interior entre los dos signos. Este cálculo confirma la composición en SVG sin modificar sus rutas.

## Paletas conservadas y funciones

Cada familia aplica tinta principal a la P y un mismo acento a ambas comillas. El selector cambia la vista principal; las cuatro muestras inferiores mantienen las cuatro familias visibles simultáneamente.

| Función | Terracota + arcilla | Ocre + papel miel | Agua + papel claro | Ciruela + malva |
|---|---|---|---|---|
| P / Hebra · tinta principal | Terracota `#B56750` | Ocre `#9C6D20` | Agua `#27879D` | Ciruela `#75435F` |
| Ambas comillas · acento | Arcilla `#D49B86` | Miel `#D4AA5F` | Agua clara `#82C7D5` | Malva `#C8A6BD` |
| Fondo · papel | `#FBF0E9` | `#FFF3D6` | `#EEF9FB` | `#F8F0F5` |
| Nombre · tinta de lectura | `#51372F` | `#4E3B25` | `#28434B` | `#482A3D` |

**Arcilla opcional:** asignar a las comillas la misma tinta principal `#B56750` para una versión únicamente terracota. Las muestras pequeñas usan esta regla de una sola tinta en todas las familias.

La familia agua conserva el aqua de componente azul/cian y un papel casi blanco, como interpretación luminosa de la preferencia «agua o niebla».

**Exclusiones conservadas:** bosque, salvia, cualquier verde, azul pizarra, bruma, oliva, avena verde, sepia albaricoque y tinta pino. Estos nombres se registran para conservar la preferencia y no se proponen como paletas.

Los neutros auxiliares de la galería son: fondo `#F7F6F2`, texto `#332E2A`, texto secundario `#706760` y líneas `#DDD8D2`.

## Wordmark y escala

- **Nombre:** Georgia normal, con separación entre letras de `-0.06em`, escrito «Palabrando». El símbolo vectorial es independiente de esta fuente.
- **Vista principal:** SVG de 170 × 100 px, con nombre de 58 px y separación de 19 px.
- **Muestras de color:** SVG de 102 × 60 px, nombre de 38 px y separación de 12 px, con ajustes de tamaño para pantallas estrechas.
- **Compacta:** soporte de prueba de 48 × 48 px y SVG de 44 × 25,88 px; el soporte no forma parte de la marca.
- **Reducción:** muestra monocroma en una **caja CSS de 24 × 24 px**. El SVG conserva su relación 1,7:1 y se ajusta dentro de esa caja, sin deformarse; la silueta ocupa todo el ancho y unos 14,12 px de alto antes del margen interior del dibujo. La P y ambas comillas usan `#332E2A`.
- **Monocromo:** todos los trazados visibles en `#332E2A`, sin acabados, con una muestra de 64,6 × 38 px.
- **Área de respeto provisional:** 10 unidades alrededor del límite visible del conjunto.

El formato más ancho es consecuencia de colocar los dos signos originales a los lados de Hebra. La muestra de 24 × 24 px permite examinar esa reducción; queda pendiente revisarla ópticamente en navegador, y no se altera la forma para simular esa aprobación.

## Contraste

Ratios sRGB calculados previamente para los mismos hex, sobre el fondo de cada familia:

| Familia | Nombre / fondo | P / fondo | Comillas con acento / fondo |
|---|---:|---:|---:|
| Terracota + arcilla | 9,67:1 | 3,73:1 | 2,12:1 |
| Ocre + papel miel | 9,64:1 | 4,12:1 | 1,96:1 |
| Agua + papel claro | 9,82:1 | 3,89:1 | 1,77:1 |
| Ciruela + malva | 11,21:1 | 6,89:1 | 1,95:1 |

Los acentos claros se reservan para el logo, sin proponerlos para texto o controles. En las muestras pequeñas, las comillas usan la tinta de la P para mantener su presencia. El nombre mantiene un contraste superior a 7:1 en las cuatro familias.

## Revisión realizada

Se revisó estáticamente la recuperación literal de ambos símbolos, la presencia de las dos rutas originales de Comillas en el compuesto, la referencia del compuesto a Hebra, sus transformaciones y sus extremos horizontales. Se confirmaron las geometrías completas y la P entre las comillas.

No se añadieron dependencias ni tests. Se respeta el bloqueo anterior del navegador para `file://`; no se intentaron vías alternativas. La revisión visual en navegador sigue pendiente y no se presenta como realizada.
