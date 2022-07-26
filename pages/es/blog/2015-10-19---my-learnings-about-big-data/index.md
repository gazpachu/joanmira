---
title: Mis aprendizajes sobre el Big Data
description: Compartiendo algunas cosas interesantes que he aprendido recientemente
cover: images/bid-data-cloud.jpg
template: post
category: education
---

¡Hola amigos! Ayer me apunté a un [curso en Coursera sobre Big Data](https://www.coursera.org/specializations/big-data). Lo imparte la Universidad de San Diego en California. He pensado que sería una buena idea escribir una entrada en el blog sobre mis aprendizajes, para que os hagáis una idea del tipo de cosas que aprenderéis si decidís inscribiros también.

Seguiré publicando notas aquí mientras hago el curso, así que no esperes un artículo muy organizado hasta el final.

### Semana 1: Bienvenido a Big Data

- Hay una gran necesidad de científicos de datos
- ¡El 90% de los datos del mundo se han creado en los últimos dos años!
- En 2009 teníamos 0,8 ZB de datos y en 2020 tendremos 20 ZB
- Está creciendo muy rápidamente
- La mayoría de los Big Data que existen no están estructurados
- Se genera desde cualquier lugar que nos rodea (móviles, GPS, etc)
- Las empresas necesitan capturar información sobre sus productos, servicios, clientes, precios, segmentación, redes sociales, etc, para obtener información de los datos
- Recoger, almacenar y manipular grandes cantidades de datos a la velocidad y en el momento adecuados
- Hay mucho valor sin explotar en el Big Data
- Análisis predictivo y profundo
- Dar respuestas y mejorar el ROI o tratar de entender a nuestros clientes y aprender sus hábitos y predecir sus comportamientos futuros
- Requisitos funcionales: recopilación, integración, organización, análisis (estadístico, de resumen, predictivo,..), gestión, toma de medidas, decisiones
- Pila de Big Data: analizar y luego ofrecer algunos servicios centrados en la parte superior de esos análisis
- Herramientas que proporcionan un acceso rápido y escalable a los datos y luego los empujan a la pila de análisis
- Muchas áreas diferentes de nuevas tecnologías en auge. Espacio abarrotado y diverso
- Las empresas de marketing están a la vanguardia
- Necesidades: análisis en tiempo real, escalables y de alto rendimiento en grandes conjuntos de datos
- Reunir la capacidad de almacenamiento y la capacidad de cálculo: Hadoop
- Apache Hadoop: código abierto, bajo coste, fiable, escalable, computación distribuida. Desde un único servidor hasta miles de máquinas
- Entorno flexible y tolerante a fallos (datos estructurados o no estructurados)
- Capa inferior: Sistema de archivos distribuidos Hadoop (HDFS)
- Capa intermedia: Hadoop MapReduce, un modelo de procesamiento de datos a gran escala
- Capa superior: podemos disponer de software como Pig, Hive, Mahout, etc para manipular los datos a través de los procesos MapReduce
- Minimizar el movimiento de datos
- Así es como funciona MapReduce
![](/content/images/2015/10/mapreduce.png)
- Aprenderemos a enviar trabajos de MapReduce
- En Hadoop 2.0 tenemos YARN, que nos permite hacer cosas más complejas

### Semana 2: ¿Por qué Big Data?

- Los ordenadores ya no son máquinas deterministas. No están disponibles físicamente
- Unir tecnologías para encontrar significado en datos grandes, rápidos e inciertos
- Antes: bases de datos relacionales. Ahora: clickstream
- Los datos de las máquinas son muy rápidos
- Flujo de datos. IoT. Muy rápido también
- Antes: conjuntos de datos estructurados. Ahora: crudos, complejos, no estructurados
- Ir más allá del almacén de datos. ¿SQL? HBase, Hive,...
- Ampliación de las "vistas" de los datos. Comportamiento, desafío de los medios sociales: integración
- Encontrar el sentido en el caos: integración, transformación, carga
- Analítica: simple, avanzada, estadística
- Cuadros de mando predictivos
- Paralelizados, distribuidos, optimizados
- Antes: muestrear, hacer machine learning, construir modelos predictivos, puntuar el conjunto de datos más grande. Ahora: sólo analizar todos los datos y ejecutar los modelos... Explosión del tamaño de la muestra
- Correlación frente a causalidad. No lo explica necesariamente
- Nuevos métodos de la comunidad investigadora: aprendizaje profundo, pasar de los archivos planos a datos más complejos
- Pasado y presente. Antes: herramientas caras de doctorado de bata blanca. Ahora: herramientas de código abierto para científicos de datos
- ¿Quiénes son los científicos de datos? Necesidad de entender la estadística, el aprendizaje automático, las bases de datos, la minería de datos, cómo consultar, ordenar, visualizar,...
- Habilidades de comunicación. Entender el dominio.
- Hacer las preguntas correctas que aporten valor al negocio
- Curiosidad intelectual, intuición, comunicación y compromiso, habilidades de presentación, creatividad y conocimiento del negocio. Interactuar con los analistas de negocio.
- Preparación, comprensión y modelización de datos
- Necesidad de codificar, crear ecuaciones
- La mayoría de los científicos de datos de éxito tienen una experiencia sustancial y profunda en al menos un aspecto de la ciencia de datos: estadística, aprendizaje automático, Big data, comunicación empresarial
- La ciencia de los datos es inherentemente colaborativa y creativa
- Temas del plan de estudios: Manipulación de datos a escala, Analítica, Comunicación de resultados