# Palabrando — tres direcciones nuevas

> **Estado:** exploración de referencia; no se seleccionó una dirección completa. La estructura de cuaderno de Patio sirve como base provisional para la primera pantalla. Sus colores quedaron superados por las cuatro familias acordadas en [PALETAS.md](./PALETAS.md); no recuperar los verdes, azules u otros tonos descartados de estas propuestas.

Segunda exploración a partir del feedback textual del usuario: **«Sinceramente no me gusta ninguno. Estas me parecieron poco orgánicas ni pleasant a la vista»**.

[Comparativa interactiva](./direcciones.html) · [Propuestas anteriores conservadas](./archive/antes-feedback/direcciones.html).

Las propuestas anteriores no estaban versionadas: `design/` era un directorio sin seguimiento. Se han conservado copias completas de ambos artefactos en `design/archive/antes-feedback/`. Esta revisión sustituye los documentos activos; no modifica la aplicación.

## Qué cambia

Las tres opciones anteriores compartían pantallas pequeñas, marcos rígidos, títulos contenidos y una composición casi idéntica. Esta ronda cambia **la relación entre cuaderno, superficie de trabajo y carta**, además del color. Orgánico significa aquí proporciones suaves, ritmo menos mecánico y materiales sugeridos con pocos gestos. No significa llenar la interfaz de hojas, textura o ilustraciones.

Se mantiene la coordinación que pidió el usuario: **la captura es claramente un cuaderno y la vista de cartas muestra cartas verticales con la información completa de cada palabra**. Término, idioma, uso/matiz, ejemplo, etiquetas morfológicas y autor viven juntos en el frente. El reverso es una cubierta visual, no un lugar que obligue a girar la carta para leer información necesaria. La consigna del reto queda fuera de la carta.

## Base compartida y tareas

- **Persona:** lector que captura en segundos y escritor que vuelve después con calma.
- **Objetos:** apunte de palabra, carta, propuesta de IA y reto. “Taxonomía”, “pieza de colección” y lenguaje de infraestructura no aparecen como vocabulario de producto.
- **Entrada:** cuaderno abierto con campo de palabra preparado. Solo se pide palabra o expresión; el idioma viene preseleccionado y se cambia junto al campo. No se pide contexto.
- **Primer gesto:** escribir y guardar. El texto se conserva si falla y el idioma se mantiene al continuar capturando.
- **Bandeja:** por completar y listas; cada pendiente dice qué le falta. Completitud derivada de campos, nunca un estado manual.
- **IA:** “Completar con IA” abre propuestas editables. Uso, ejemplo y etiquetas se aceptan por separado. La pantalla de revisión no sobrescribe campos sin aprobación.
- **Reto:** el idioma visible precede a la consulta de cartas. Conserva la última elección y solo consulta cartas listas en ese idioma.
- **Vacío:** identifica idioma, número de pendientes y dos salidas: completarlas o elegir otro idioma. No cambia de baraja silenciosamente.
- **Escritura externa:** consigna provisional para una palabra; incorporado, pendiente y descartado son resultados del reto. No hay editor de manuscritos.

La comparación usa las mismas seis escenas móviles y una adaptación de escritorio por ruta. Las vistas principales se muestran a un ancho de referencia de 390 px; en pantallas menores se reducen sin hacer scroll horizontal. El HTML tiene CSS y JavaScript autónomos, sin librerías ni servicios de fuentes externos.

## 01 · Patio

**Personalidad:** un lugar tranquilo para las palabras que se quedan. Luminoso, acogedor y adulto. La sensación orgánica viene del arco, los cantos suaves y el aire entre grupos.

### Paleta con función

| Color | Función |
| --- | --- |
| `#EDF0E7` piedra verdosa | Mesa y fondo; separa la herramienta del blanco frío. |
| `#FFFEF8` hoja clara | Página del cuaderno y frente de la carta. |
| `#28392E` tinta | Lectura, títulos y términos. |
| `#3E6248` verde profundo | Guardar, aceptar, foco de acción y confirmación con texto. |
| `#DCE5CE` hoja suave | Cubierta, etiquetas y planos secundarios. |
| `#E7DFF1` lavanda tenue | Acento de marca o reverso; nunca texto de bajo contraste. |

**Tipografía:** Georgia en palabras y títulos; Trebuchet MS en lectura y controles. En implementación se puede buscar una serif de curvas suaves y una sans humanista equivalente, tras decidir ruta y revisar licencia. Término 38 px, títulos 29–30 px, contenido 14–16 px, metadatos 11–12 px. Lettering limitado a la marca y al título breve del cuaderno; controles siempre rectos y legibles.

### Objetos y escenas

1. **Captura:** cubierta verde pálido asoma por el lomo de una página clara. Una línea de costura y “Mi cuaderno · pág. 08” hacen reconocible el objeto. “Lo que encontré” introduce un único renglón de escritura; idioma junto al campo y guardar inmediatamente debajo. Sin formulario de ficha.
2. **Bandeja:** lista de lectura continua, separaciones abiertas y agrupación por hoy/ayer. La palabra se lee antes de idioma y campos faltantes; no números de inventario ni marcos por fila.
3. **Revisión IA:** término y español fijan contexto; tres bloques apilados contienen propuesta, editar y aceptar. Cada aceptación confirma únicamente su campo. Una frase indica cuántos faltan.
4. **Idioma de reto:** opciones grandes con selección explícita y cantidad de listas. Español con 8 listas; inglés con 0 listas y 2 pendientes. Ver cartas y sacar una al azar son gestos separados.
5. **Carta sacada:** una ventana alta con arco superior. Idioma, término grande, uso, ejemplo, etiquetas y autor, en ese orden. Ningún texto sigue la curva del marco. La consigna vive debajo; luego “La incorporé”, “Para después” y “Descartar reto”.
6. **Vacío:** silueta de carta ligera, explicación directa y acción para las dos pendientes en inglés. La imagen no ocupa el espacio de la siguiente acción.

**Frente y reverso:** el frente concentra toda la información; el reverso repite arco y una semilla mínima. Iconos de trazo redondo y 20 px con etiquetas. Dados como visión futura: piezas de arcilla clara con símbolos de trazo, sin animación ni reglas en este POC.

**Móvil:** cuaderno y carta entre 300 y 390 px, márgenes internos de 22–26 px, botones de al menos 44 px. La captura sigue accesible con teclado; en implementación debe usar `100dvh` y evitar que la navegación tape el botón. El ejemplo puede crecer; la carta tiene altura mínima, nunca altura fija ni recorte del texto.

**Escritorio:** rail discreto, bandeja a la izquierda y carta vertical centrada en una mesa amplia. El cuaderno conserva 390 px. Los espacios laterales sirven para navegar y revisar, no para ensanchar los párrafos.

**Movimiento:** guardar recoge la línea 6 px hacia el lomo en 180 ms; sacar revela la carta 10 px desde abajo en 240 ms. Una confirmación textual acompaña el cambio. Sin giro necesario para leer ni respiración continua. Con movimiento reducido, actualización inmediata.

**Riesgo:** demasiado aire podría esconder palabras bajo el pliegue. Limitar la cabecera y ofrecer una lista compacta en la bandeja; mantener generosa la lectura de la carta.

## 02 · Marea

**Personalidad:** guardar al vuelo, volver sin prisa. Ligera, actual y amable. Usa formas flexibles y una organización práctica de bolsillo, con mayor énfasis en la rapidez que Patio.

### Paleta con función

| Color | Función |
| --- | --- |
| `#E4EDF0` azul niebla | Fondo de la mesa. |
| `#FBFDFD` blanco suave | Página y cartas. |
| `#243E51` azul tinta | Lectura y términos. |
| `#315F7A` azul profundo | Acciones, selección y confirmaciones. |
| `#CEE3EC` azul claro | Cubierta y agrupación de objetos. |
| `#E8E5D9` arena gris | Acentos de lectura, con texto oscuro. |

**Tipografía:** Trebuchet MS en títulos y términos; system-ui en controles y contenido; Georgia cursiva solo en el ejemplo. Término 36 px, títulos 29–31 px, cuerpo 14–16 px. La sans abierta hace que esta ruta se sienta más contemporánea. Sin lettering manuscrito; la marca redonda y estrecha aporta voz.

### Objetos y escenas

1. **Captura:** cuaderno de bolsillo con cubierta azul, lomo ancho y página blanca de esquinas flexibles. “Cuaderno de bolsillo” identifica su función. “Una palabra que llegó” precede al renglón; la acción queda cerca del pulgar en la parte inferior. El azul se usa en la cubierta, no como tinta clara de lectura.
2. **Bandeja:** cada apunte tiene un pequeño volumen blanco separado, con una esquina amplia y un canto azul. Las piezas se leen de arriba abajo; no carrusel horizontal ni tarjetas en abanico para elegir.
3. **Revisión IA:** tres volúmenes independientes siguen el ritmo de la bandeja. Editar y aceptar son acciones vecinas al contenido; las aceptadas cambian suavemente de superficie y añaden un tick.
4. **Idioma de reto:** selección previa con cantidades. La selección tiene contorno y radio, además de color. Al elegir inglés, la acción cambia a pendientes y desaparece el sorteo, porque no hay cartas listas.
5. **Carta sacada:** carta vertical con una esquina superior amplia y un canto azul; término alineado a la izquierda en sans grande. El ejemplo serif aporta una pausa cálida. Los seis campos comparten el frente y la consigna vive fuera.
6. **Vacío:** una carta por llenar sugiere continuidad. “No hay cartas listas en inglés. Hay 2 apuntes por completar”. La navegación permite volver o cambiar idioma.

**Frente y reverso:** frente blanco; reverso con líneas curvas de contorno en dos tonos planos, como un cauce. Estas líneas se limitan a la cubierta posterior. Iconos curvos, pocos y con texto. Dados futuros: guijarros suavemente cuadrados con símbolos simples; sin gesto de sacudir ni reglas nuevas.

**Móvil:** navegación en cápsula al pie, estable y separada de la acción principal. El teclado debe poder cubrirla durante captura; guardar queda junto al campo o encima del teclado en implementación. Cuerpo legible, sin scroll anidado dentro de la carta.

**Escritorio:** cuaderno en panel de ancho limitado; lista a la izquierda y carta con consigna a la derecha. La cápsula de navegación se transforma en rail. La información no se reparte en columnas internas de la carta.

**Movimiento:** confirmación local en 160 ms; carta sube 12 px en 220 ms. Barra inferior inmóvil; sin oleaje, parallax ni fondos en movimiento. Reverso opcional; frente legible desde el primer gesto. Movimiento reducido elimina desplazamientos.

**Riesgo:** formas muy redondas pueden recordar una app infantil. Mantener el azul sobrio, evitar caritas, burbujas decorativas y tipografía excesivamente redondeada.

## 03 · Pétalo

**Personalidad:** pequeños hallazgos, una voz propia. Más personal y expresiva, con el tacto visual de hojas elegidas y pestañas de color. El gesto orgánico es el pliegue y la asimetría del soporte; los textos conservan un eje firme.

### Paleta con función

| Color | Función |
| --- | --- |
| `#F4E8E7` rosa apagado | Fondo general, suave y cálido. |
| `#FFFAF4` hoja crema | Página y frente de carta. |
| `#563242` ciruela tinta | Lectura, término y títulos. |
| `#82455E` ciruela | Acción principal y aceptación. |
| `#F0D9D6` rosa arcilla | Hojas y divisiones secundarias. |
| `#E5E7CF` salvia clara | Pestañas, canto y agrupación; no confirma estados por sí sola. |

**Tipografía:** Palatino para término, título y ejemplo; system-ui para controles y explicaciones. La palabra usa cursiva de 42 px; lectura 14–16 px, metadatos 11–12 px. Lettering restringido a marca y títulos breves del cuaderno. La definición y las acciones no adoptan cursiva expresiva.

### Objetos y escenas

1. **Captura:** cuaderno con cubierta ciruela y dos hojas que asoman, lomo claro y una esquina doblada. “Me lo guardo” introduce el renglón. La palabra mantiene mucho espacio alrededor; la pestaña de idioma está junto al apunte y guardar lleva la forma de una etiqueta recortada.
2. **Bandeja:** cada apunte parece una hoja apartada con una estrecha pestaña lateral. Los tonos agrupan, no codifican idioma ni completitud. Una misma alineación permite escanear términos, idioma y campo faltante.
3. **Revisión IA:** cada campo ocupa una hoja con un solo pliegue. La revisión conserva término e idioma visibles. Las propuestas son editables y requieren aceptación individual; el cambio de superficie se acompaña de “Aceptado”.
4. **Idioma de reto:** opciones de gran superficie; contorno, radio y texto expresan la elección. El tono personal no reemplaza los nombres claros “Español” e “Inglés”.
5. **Carta sacada:** carta vertical crema, esquina doblada y franja salvia lateral. Término cursivo grande, uso en sans, ejemplo en serif, dos etiquetas y autor al pie. Consigna y resolución del reto fuera de la carta.
6. **Vacío:** una hoja en espera con canto salvia. Explica pendientes concretas y ofrece completarlas. No hay flores tristes, felicitaciones artificiales ni metáforas que oculten el motivo del vacío.

**Frente y reverso:** frente completo; reverso ciruela con una silueta de pétalo en una esquina. El pliegue aparece una vez por objeto. Iconos finos de extremos suaves. Dados futuros: piezas de madera pintada con contorno suave y símbolos de trazo, sin coleccionismo ni puntos.

**Móvil:** todo el texto comparte un eje de lectura aunque los soportes sean asimétricos. Máximo dos hojas desplazadas y siempre fuera del área táctil. El término largo puede partir línea; no se hace pequeño para caber. La carta crece con su contenido.

**Escritorio:** cuaderno abierto a la izquierda y carta enfocada a la derecha; navegación en rail. Color y pliegues se concentran en los objetos, no en paneles que compitan por atención.

**Movimiento:** el canto avanza 4 px y vuelve al guardar, 180 ms; la pestaña de campo cambia de color y tick al aceptar, 140 ms. La carta se revela sin rotar. Movimiento reducido mantiene solo confirmación textual.

**Riesgo:** acumular recortes produciría un collage decorativo. Limitar a una esquina expresiva y un canto por objeto; mantener las definiciones y ejemplos sobre superficies lisas.

## Reglas de interacción y recuperación

- **Guardar:** no vaciar el campo hasta confirmar persistencia. Error: “No se pudo guardar. Tu palabra sigue aquí” y “Reintentar”. Volver a enfocar solo tras una captura iniciada por el usuario; el prototipo no abre el teclado por su cuenta.
- **IA en curso:** “Preparando propuestas…” y posibilidad de volver. Error: “No pudimos preparar esta carta. Puedes reintentar o completarla tú”; preservar datos existentes.
- **Ambigüedad:** si hay varios sentidos, mostrar opciones con uso y ejemplo, antes de aceptar. Nunca inferir la preferencia silenciosamente.
- **Aceptación:** campo editable hasta aceptar. Una marca y texto indican aceptación; el color nunca es el único estado. Permitir editar de nuevo en la carta final.
- **Idioma:** interfaz, idiomas de escritura, idioma de carta e idioma del reto permanecen separados. El selector del reto persiste; el prototipo solo simula el cambio dentro de la sesión visual.
- **Baraja:** mostrar idioma y cantidad antes del sorteo; frente completo al sacar. El reverso ayuda a reconocer la baraja, pero no es una pantalla de lectura intermedia obligatoria.
- **Reto:** incorporado, pendiente y descartado quedan fuera de la carta. Descartar un reto no borra la palabra.
- **Accesibilidad:** contraste de lectura a revisar al fijar tokens; objetivo WCAG AA, foco visible, botones de 44 px o más en aplicación, controles con etiquetas, estado vivo discreto y reducción de movimiento. Los metadatos pequeños de las miniaturas de escritorio pertenecen a la comparativa, no son tamaños para la aplicación.

## Recomendación, sin cerrar elección

Recomiendo **Patio** como primera candidata. El cuaderno se reconoce con lomo, renglón y página; el arco distingue la carta sin recargarla. La calma depende de proporciones y espacio, así que sigue funcionando sin texturas, ilustraciones ni animación. Su mayor riesgo —exceso de aire— tiene una solución local en la bandeja.

**Marea** es la candidata para una herramienta más ligera y cotidiana: ofrece el mejor gesto de captura al pie y una bandeja fácil de recorrer. **Pétalo** concentra la identidad más personal; elegirla tiene sentido si se desea una aplicación con mayor presencia del objeto y la escritura.

Al elegir una ruta, no mezclaría sus tres metáforas de forma. Tomaría únicamente principios compartidos: claridad de la carta, acciones próximas al contenido y ritmo de captura breve. La elección visual queda pendiente de revisión del usuario.

## Alcance y revisión manual

Esta entrega es una exploración de diseño; no persiste datos, no consulta IA y no cambia la aplicación. Las interacciones locales ilustran guardar, editar/aceptar campo, elegir idioma y resolver un reto. Las animaciones del documento son especificaciones para implementación; el HTML usa solo una entrada discreta al cambiar de ruta y transiciones de estado.

No se instalaron dependencias ni se ejecutaron tests automáticos. Revisión de contenido realizada: las tres rutas incluyen las mismas seis escenas y la carta contiene los seis campos. La revisión visual en navegador queda pendiente: el entorno no permitió enlazar un servidor HTTP local y el navegador rechazó URLs `file://`. No se presenta esa revisión como realizada.
