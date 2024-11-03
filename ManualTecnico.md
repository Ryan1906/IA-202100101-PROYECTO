# Manual Técnico
## 1. Objetivo del Proyecto
Crear un sitio web interactivo utilizando HTML y JavaScript para practicar los conceptos de Machine Learning. Este sitio permitirá a los usuarios cargar archivos CSV, seleccionar modelos de Machine Learning y ajustar parámetros para entrenamiento y predicción usando la biblioteca tytus.js. El sitio se publicará en GitHub Pages para su ejecución en línea.

## 2. Requerimientos
Lenguajes y tecnologías: JavaScript, HTML, CSS (opcional para estilizar).
Bibliotecas: Uso obligatorio de tytus.js para los modelos de Machine Learning y visualización, junto con cualquier biblioteca JavaScript pura (sin frameworks ni entornos).
Ambiente: Código en un repositorio público de GitHub, con despliegue en GitHub Pages.
## 3. Estructura del Proyecto
index.html: Contiene la estructura del sitio web.
styles.css: Opcional, para estilizar la página y proporcionar una interfaz amigable y minimalista.
script.js: Controla la lógica del sitio, incluyendo la carga de archivos, selección de algoritmos, parametrización, entrenamiento, predicción y visualización de resultados.
tytus.js: Biblioteca principal para la instancia y uso de modelos de Machine Learning, almacenada en una carpeta lib/ o enlazada directamente desde el repositorio de tytus.js.
## 4. Componentes del Sitio
Selector de archivos CSV: Permite a los usuarios cargar datasets. El archivo se procesa para extraer columnas y filas, identificando variables.

Selector de modelos de Machine Learning: Dropdown que muestra modelos disponibles en tytus.js como regresión, clasificación, clustering, etc. Este menú interactúa con la biblioteca para instanciar el modelo seleccionado.

### Parámetros configurables:

Porcentaje de Train/Test: Slider o input para ajustar el porcentaje de datos de entrenamiento y prueba.
Objetivo de Entrenamiento: Checkbox o radio buttons para elegir entre predicción, clasificación, tendencia, etc.
Parámetros específicos: Ajustes adicionales específicos del modelo (ej. número de clases para clasificación).
Entrada de rango (predicción): Input para definir el rango de valores en el eje X si el modelo permite predicción.
Variable de salida y entrada (supervisado): Permite al usuario seleccionar la variable de salida y variables de entrada desde el dataset cargado.
Botones de Acción:

Entrenar: Inicia el proceso de entrenamiento con los parámetros seleccionados.
Predecir: Realiza predicciones basadas en el modelo entrenado.
Mostrar Gráficas: Genera una visualización de los resultados, utilizando gráficos adecuados para el tipo de modelo (ej. regresión o clasificación).
## 5. Implementación de Funcionalidades
Carga de Datos:
Usar el FileReader API de JavaScript para procesar el archivo CSV y extraer los datos para entrenamiento.
Instanciación de Modelos:
Llamadas a tytus.js para cargar y ejecutar modelos de Machine Learning. 

Ejemplo:
javascript
Copiar código
const modelo = new Tytus.Modelo('nombreModelo');
modelo.train(data, options);
Entrenamiento y Predicción:
Lógica para enviar los datos a los métodos de entrenamiento y predicción.
Configuración de los porcentajes de train/test.
Manejo de errores o advertencias para configuraciones incorrectas.
Visualización de Resultados:
Uso de gráficos básicos con canvas o librerías JavaScript puras como Chart.js para visualización.
La visualización variará según el tipo de modelo, mostrando por ejemplo, gráficos de dispersión para regresión o gráficos de barras para clasificación.
## 6. Consideraciones Adicionales
Validaciones:
Validar el archivo cargado (asegurar que es un CSV).
Verificar que los parámetros requeridos para cada modelo estén completos antes de iniciar el entrenamiento.
Compatibilidad y rendimiento:
Optimizar el uso de la biblioteca tytus.js para mejorar el rendimiento.
Garantizar que el sitio funcione correctamente en diferentes navegadores modernos.
Estilo y UX:
Opcional: Añadir estilos en styles.css para una interfaz minimalista y moderna.
## 7. Despliegue en GitHub Pages
Asegurarse de que el repositorio sea público.
Publicar el sitio en GitHub Pages:
En Settings del repositorio, activar GitHub Pages y seleccionar la rama adecuada (generalmente main o docs).
Verificar el enlace de GitHub Pages para asegurarse de que el sitio esté funcionando y accesible.
## 8. Pruebas y Validación
Realizar pruebas de carga de diferentes archivos CSV y configuración de varios modelos.
Validar el funcionamiento de cada parámetro configurable.
Probar que cada botón de acción realice la operación esperada y muestre los resultados correctos.
