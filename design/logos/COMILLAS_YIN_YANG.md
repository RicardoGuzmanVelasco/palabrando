# Palabrando · dos comillas en equilibrio

Dirección de logo aprobada: las dos comillas en una composición de yin-yang abierto, con versiones en las cuatro paletas. La comparación está en [comillas-yin-yang.html](./comillas-yin-yang.html). La propuesta anterior de Hebra se conserva en [hebra-comillas.html](./hebra-comillas.html).

La separación elegida es **02 · Equilibradas**. El SVG final está en [logo-comillas.svg](./logo-comillas.svg).

## Intención

Partir únicamente de las dos formas originales de «Comillas» en [sol-61.html](./sol-61.html). Se mantiene el volteo de arriba abajo de la comilla de cierre alrededor de `y=55.5`, con `translate(0 111) scale(1 -1)`.

Ambas piezas giran −30° alrededor de sus propios centros. Se acercan y se ajusta su altura para que se rodeen. El conjunto gira después 45° alrededor de `(50, 50)`, orientando las cabezas y las colas en un movimiento circular. Las rutas originales no cambian.

## Composición comparada

Los tres ajustes comparten orientación y escala. La distancia horizontal entre sus centros antes del giro del conjunto pasa de 40.5 unidades a 24, 26 o 28. El centro de apertura se sitúa en `y=55` y el de cierre en `y=45`.

| Ajuste | Centro de apertura | Centro de cierre | Lectura |
| --- | --- | --- | --- |
| Cercanas | `(38, 55)` | `(62, 45)` | El hueco más estrecho, sin contacto. |
| **Equilibradas · elegida** | `(37, 55)` | `(63, 45)` | Un poco más de aire dentro de la misma composición. |
| Con aire | `(36, 55)` | `(64, 45)` | La separación más amplia de estos tres ajustes compactos. |

## Color de dos tonos

La propuesta original asignaba un tono diferente a cada comilla. Se conserva esa relación de color, pero se usan las cuatro familias aprobadas porque los verdes de aquel estudio fueron descartados:

| Familia | Comilla 1 | Comilla 2 | Papel | Tinta |
| --- | --- | --- | --- | --- |
| Terracota + arcilla | `#B56750` | `#D49B86` | `#FBF0E9` | `#51372F` |
| Ocre + papel miel | `#9C6D20` | `#D4AA5F` | `#FFF3D6` | `#4E3B25` |
| Agua + papel claro | `#27879D` | `#82C7D5` | `#EEF9FB` | `#28434B` |
| Ciruela + malva | `#75435F` | `#C8A6BD` | `#F8F0F5` | `#482A3D` |

Cada uno de los cuatro elementos asociados a las cuatro paletas llevará el mismo logo con los dos tonos de su familia. La geometría será común: el color acompaña al elemento. La vista compacta usa una sola tinta para conservar la forma al reducirla.

El archivo `logo-comillas.svg` recibe los colores mediante dos propiedades CSS: `--logo-left` y `--logo-right`. Su valor predeterminado es gris carbón (`#343434`) y gris medio (`#777777`). Para incrustarlo como SVG en el HTML, se pueden fijar en el elemento raíz; en el archivo independiente se pueden cambiar los dos valores de `style`. Si se carga mediante `<img>`, se muestran los valores guardados dentro del SVG.

## Revisión

La galería ofrece comparación grande, tres huecos y muestras compactas en una tinta; permite cambiar entre las cuatro familias. Se conserva la propuesta anterior de Hebra. No se instalaron dependencias ni se ejecutaron tests automáticos. Se renderizaron las geometrías SVG para comprobar la separación y el encaje visual. La comparación queda guardada en [comillas-yin-yang-preview.png](./comillas-yin-yang-preview.png). No se comprobó la interacción de la página en navegador.
