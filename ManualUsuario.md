# Manual de Usuario

Este sitio te permite cargar archivos CSV, seleccionar modelos de Machine Learning, ajustar parámetros y realizar predicciones. Sigue los pasos a continuación para utilizar las herramientas de Machine Learning que ofrece esta aplicación.

## 1. Interfaz Principal
Al abrir la aplicación, verás una interfaz minimalista que consta de varias secciones:
Cargar Dataset (Archivo CSV)
Selección de Modelo
Parámetros del Modelo
Botones de Acción
Visualización de Gráficos
## 2. Carga de Archivo CSV
Selecciona un archivo: Haz clic en el botón de selección de archivos y carga un archivo en formato CSV. Este archivo debe contener los datos que deseas analizar.
Verifica el archivo: Asegúrate de que el archivo está en el formato correcto y contiene datos estructurados.
## 3. Selección de Modelo de Machine Learning
En el menú desplegable, selecciona el modelo de Machine Learning que deseas aplicar a tu dataset. Los modelos disponibles pueden incluir opciones como:
Regresión: Para encontrar relaciones entre variables.
Clasificación: Para clasificar datos en distintas categorías.
Clustering: Para agrupar datos con características similares.
## 4. Configuración de Parámetros del Modelo
Una vez seleccionado el modelo, configura los parámetros específicos:

### Porcentaje de Train/Test:

Usa el slider o el campo para ajustar el porcentaje de datos destinados a entrenamiento y prueba.
Ejemplo: 70% para entrenamiento y 30% para prueba.
Objetivo del Entrenamiento:

Selecciona el propósito del análisis, como predicción, clasificación, búsqueda de patrones o tendencias.
Configuración de Parámetros Específicos:

Dependiendo del modelo, deberás ingresar parámetros adicionales:
Predicción: Introduce el rango en el eje X para el cual deseas realizar predicciones.
Clasificación: Especifica el número de clases.
Aprendizaje Supervisado: Selecciona las columnas de entrada y salida para el modelo.

## 5. Botones de Acción

### Entrenamiento:

Haz clic en el botón "Entrenar" para entrenar el modelo con los datos y parámetros seleccionados.
La aplicación procesará el entrenamiento y mostrará un mensaje de éxito o error si hay problemas.
Predicción:

Después de entrenar el modelo, puedes hacer clic en "Predecir" para generar predicciones.
Si estás utilizando un modelo de predicción, el sistema solicitará el rango de valores en el eje X.
Mostrar Gráficas:

Haz clic en "Mostrar Gráficas" para ver visualizaciones de los resultados.
Dependiendo del modelo, la visualización puede incluir gráficos de dispersión, barras o líneas.

## 6. Visualización de Resultados
Gráficos:

Las gráficas se mostrarán en la sección de visualización. Estas te permiten analizar visualmente los resultados del modelo entrenado.
Ejemplo: En una regresión, podrás ver cómo los puntos se ajustan a una línea de tendencia.
Interpretación:

Los gráficos te ayudarán a entender patrones, clasificaciones o predicciones generadas por el modelo.
## 7. Consejos y Recomendaciones
Archivos CSV: Asegúrate de que el archivo cargado esté bien estructurado y que cada columna tenga un encabezado claro.
Parámetros Correctos: Revisa que los parámetros que introduces estén acordes al modelo seleccionado.
Prueba con Diferentes Modelos: Experimenta con distintos modelos y parámetros para obtener el mejor análisis posible.
## 8. Solución de Problemas
Error en la Carga del Archivo:
Si el archivo no se carga correctamente, verifica su formato y estructura. Solo se permiten archivos CSV.
Error en Entrenamiento o Predicción:
Asegúrate de haber seleccionado todas las configuraciones requeridas y de que los datos del archivo CSV sean compatibles con el modelo seleccionado.
Problemas de Visualización:
Si las gráficas no aparecen, intenta recargar la página y volver a cargar el archivo y el modelo.