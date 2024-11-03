const datasetInput = document.getElementById("datasetInput");
const datasetInput2 = document.getElementById("datasetInput2"); 
const datasetInput3 = document.getElementById("datasetInput3"); 
const algorithmSelect = document.getElementById("algorithmSelect");
const trainPercentageInput = document.getElementById("trainPercentage");
const polynomialDegreeInput = document.getElementById("polynomialDegree"); // grado
const trainButton = document.getElementById("trainButton");
const xAxisColumnSelect = document.getElementById("xAxisColumn");
const yAxisColumnSelect = document.getElementById("yAxisColumn");
const ctx = document.getElementById("myChart").getContext("2d");

let linearModel; 
let polynomialModel; 
let decisionTreeModel; 
let csvData1 = []; // 
let csvData2 = []; // 
let csvData3 = []; //
let csvData4 = []; // 
let predictions = []; // Predicciones
let myChart; // Variable para almacenar el gráfico
let headers = []; // Encabezados del CSV
let attributes;
let classes;

// Inicializar eventos
function init() {
    datasetInput.addEventListener("change", Input1);
    datasetInput2.addEventListener("change", Input2);
    datasetInput3.addEventListener("change", Input3);
    trainButton.addEventListener("click", handleTrain);
}

// Manejar la selección de archivos
function Input1(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            processCSV(text, 1);
        };
        reader.readAsText(file);
    }
}

// Manejar la selección del segundo archivo CSV
function Input2(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            processCSV(text, 2);
        };
        reader.readAsText(file);
    }
}
function Input3(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            processCSV(text, 3);
        };
        reader.readAsText(file);
    }
}


function processCSV(csv, csvNumber) {
    const rows = csv.split("\n").map(row => row.split(",").map(cell => cell.trim()));
    const selectedAlgorithm = algorithmSelect.value;

    if (rows.length > 0) {
        if (csvNumber === 1) {
            headers = rows[0]; 
            csvData1 = rows.slice(1);
            csvData3 = rows.slice(0)
            if (selectedAlgorithm === "naive_bayes") {
                // Generar formulario Naive Bayes
                generateNaiveBayesForm(headers);
                // Separar los atributos y la clase
                attributes = csvData1.map(row => row.slice(0, -1)); 
                classes = csvData1.map(row => row.slice(-1)[0])
            }
            console.log(csvData1)
            console.log(csvData3)
            updateColumnSelectors(headers);
        } else if (csvNumber === 2) {
            csvData2 = rows.slice(0); // Guardar los datos del segundo CSV con encabezados
            console.log(csvData2)
        } else if (csvNumber === 3) {
            csvData4 = rows.slice(0); // Guardar los datos del segundo CSV con encabezados
            console.log(csvData4)
        }
    }
}

// Actualizar los selectores de columnas
function updateColumnSelectors(headers) {
    xAxisColumnSelect.innerHTML = '';
    yAxisColumnSelect.innerHTML = '';

    headers.forEach((header, index) => {
        const option = document.createElement("option");
        option.value = index; // Usar el índice como valor
        option.textContent = header;
        xAxisColumnSelect.appendChild(option);

        const optionY = document.createElement("option");
        optionY.value = index; // Usar el índice como valor
        optionY.textContent = header;
        yAxisColumnSelect.appendChild(optionY);
    });
}

// Generar formulario basado en las columnas del CSV
function generateNaiveBayesForm(headers) {
    const formContainer = document.getElementById('naiveBayesFormContainer');
    formContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    // Crear una sección para los atributos
    const attributesLabel = document.createElement('label');
    attributesLabel.textContent = 'Introduce los valores para los atributos:';
    formContainer.appendChild(attributesLabel);
    formContainer.appendChild(document.createElement('br'));

    headers.slice(0, -1).forEach((header, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `attribute_${index}`;
        input.name = 'attributes';
        input.placeholder = `Valor para ${header}`;
        input.value = ''; // Campo vacío para ingresar datos

        const label = document.createElement('label');
        label.textContent = `${header}: `;
        label.htmlFor = `attribute_${index}`;

        formContainer.appendChild(label);
        formContainer.appendChild(input);
        formContainer.appendChild(document.createElement('br'));
    });
    formContainer.appendChild(document.createElement('br'));
}


// Manejar el entrenamiento y la predicción
function handleTrain() {
    const selectedAlgorithm = algorithmSelect.value;
    const xIndex = parseInt(xAxisColumnSelect.value);
    const yIndex = parseInt(yAxisColumnSelect.value);


    if ((csvData1.length > 0 || csvData3.length > 0) && xIndex != null && yIndex != null) {
        const xValues = csvData1.map(row => row[xIndex]);
        const yValues = csvData1.map(row => row[yIndex]);
        // console.log(selectedAlgorithm)

        if (selectedAlgorithm === "linear_regression") {
            // Regresión Lineal
            linearModel = new LinearRegression();
            linearModel.fit(xValues, yValues);
            predictions = linearModel.predict(xValues); // Realizar predicciones
            console.log("Predicciones Lineales:", predictions); // Verifica las predicciones
        
            showLinearGraph(xValues, yValues); // Mostrar gráfica de regresión lineal
        } else if (selectedAlgorithm === "polynomial_regression") {
            // Regresión Polinómica
            const degree = parseInt(polynomialDegreeInput.value);
            polynomialModel = new PolynomialRegression();
            polynomialModel.fit(xValues, yValues, degree);
            predictions = polynomialModel.predict(xValues); // Realizar predicciones
            console.log("Predicciones Polinómicas:", predictions); // Verifica las predicciones
            alert(`Modelo de regresión polinómica de grado ${degree} entrenado y predicciones realizadas.`);
            showPolynomialGraph(xValues, yValues); // Mostrar gráfica de regresión polinómica
        } else if (selectedAlgorithm === "decision_tree") {
            // Árbol de Decisión
            decisionTreeModel = new DecisionTreeID3(csvData3);
            const root = decisionTreeModel.train(decisionTreeModel.dataset);
            const predictionData = csvData2
            const predictNode = decisionTreeModel.predict(predictionData, root);
            console.log("Predicción:", predictNode);
            // Generar y visualizar el árbol
            const dotStr = decisionTreeModel.generateDotString(root);
            // console.log(dotStr)
            showDecisionTreeGraph(dotStr);
        } else if (selectedAlgorithm === "naive_bayes") {
            let model = new BayesMethod();

            // Añadir los atributos al modelo
            headers.slice(0, -1).forEach((header, index) => {
                let columnData = attributes.map(row => row[index]);
                model.addAttribute(columnData, header);
            });

            // Añadir la clase al modelo
            model.addClass(classes, headers[headers.length - 1]);

            // Entrenar el modelo
            model.train();
            console.log("Modelo entrenado exitosamente.");

            // Obtener los valores dinámicos ingresados por el usuario
            let inputValues = [];
            headers.slice(0, -1).forEach((header, index) => {
                let inputValue = document.getElementById(`attribute_${index}`).value;  // Obtener el valor de cada input
                inputValues.push(inputValue);  // Agregarlo al arreglo de valores para la predicción
            });

            // Realizar una predicción con los valores ingresados por el usuario
            const prediction = model.predict(inputValues);  // Usar los valores dinámicos en lugar de una matriz estática
            console.log(`La predicción es: ${prediction[0]} con una probabilidad de ${prediction[1]}`);
            showNaiveBayesPrediction(prediction);
        } else if (selectedAlgorithm === "neuronal_network") {
            const layers = csvData3[0].map(Number);

            // Definir las opciones para la red neuronal
            const options = {
                learning_rate: 5,
                activation: function (x) {
                    return 1 / (1 + Math.exp(-x)); // Función sigmoide
                },
                derivative: function (y) {
                    return y * (1 - y); // Derivada de la función sigmoide
                }
            };

            // Instanciar la red neuronal
            const nn = new NeuralNetwork(layers, options);

            // Preparar los datos de entrenamiento
            const trainingData = csvData2.map(data => ({
                input: data.slice(0, 2).map(Number), // Convertir a número
                target: data.slice(2).map(Number) // Convertir a número
            }));

            for (let i = 0; i < 1000; i++) { // Entrenar durante 1000 épocas
                for (let data of trainingData) {
                    nn.Entrenar(data.input, data.target);
                }
            }

            // Preparar los datos de predicción
            const predictData = csvData4.map(data => data.map(Number)); // Convertir a número

           
            showNeuralNetworkPredictions(predictData);
            showNeuralNetworkWeights(nn.layerLink[0].obtener_Weights().data);
            showNeuralNetworkBiases(nn.layerLink[0].obtener_Bias().data);
            // Llama a la función para dibujar la gráfica
            drawWeightsBiasesChart(nn.layerLink[0].obtener_Weights().data, nn.layerLink[0].obtener_Bias().data);
        } else if (selectedAlgorithm === "knn") {
            calculateDistances(csvData3,csvData2)
        }
    } else {
        alert("Cargue un archivo CSV válido primero.");
    }
}



function calculateDistances(csv3, point) {
    // Convierte el contenido de csv3 en un formato de individuos para KNN
    const individuals = csv3.map(row => {
      return [parseFloat(row[0]), parseFloat(row[1]), parseFloat(row[2]), row[3]]; // x2, y2, z, group
    });

    // Convierte el punto en un array de números
    const referencePoint = point[0].map(coord => parseFloat(coord));
    var knn = new KNearestNeighbor(individuals);
    
    // Calcula las distancias euclidiana y Manhattan
    var euc = knn.euclidean(referencePoint);
    var man = knn.manhattan(referencePoint);

    const chartElement = document.getElementById("tree");
    let resultHtml = "<h3>Distancias calculadas:</h3>";
    resultHtml += "<h4>Euclidean Distances:</h4><ul>";
    euc.forEach((distance, index) => {
      resultHtml += `<li>Punto ${index + 1}: ${distance}</li>`;
    });
    resultHtml += "</ul><h4>Manhattan Distances:</h4><ul>";
    man.forEach((distance, index) => {
      resultHtml += `<li>Punto ${index + 1}: ${distance}</li>`;
    });
    resultHtml += "</ul>";
    chartElement.innerHTML = resultHtml;
  }


// -----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------GRAFICAS-----------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------

// Función para calcular R^2
function calculateR2(predictions, actual) {
    const n = predictions.length;
    const meanActual = actual.reduce((acc, val) => acc + val, 0) / n;

    let ssTotal = 0;
    let ssRes = 0;

    for (let i = 0; i < n; i++) {
        ssTotal += Math.pow(actual[i] - meanActual, 2);
        ssRes += Math.pow(actual[i] - predictions[i], 2);
    }

    return 1 - (ssRes / ssTotal);
}

// Mostrar gráfica para regresión lineal
function showLinearGraph(xValues, yValues) {
    const ctx = document.getElementById("myChart").getContext("2d");

    // Si el gráfico ya existe, destrúyelo
    if (myChart) {
        myChart.destroy(); // Destruir el gráfico existente
    }

    // Calcular R^2
    const r2Value = calculateR2(predictions, yValues);

    // Crear gráfico de regresión lineal
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: "Predicciones Lineales",
                    data: predictions,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Valores Reales",
                    data: yValues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "X",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Y",
                    },
                },
            },
            plugins: {
                // Plugin para mostrar R^2 en la gráfica
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(`R^2: ${r2Value.toFixed(2)}`, 10, 30);
                    ctx.restore();
                },
            },
        },
    });
}

// Mostrar gráfica para regresión polinómica
function showPolynomialGraph(xValues, yValues) {
    const ctx = document.getElementById("myChart").getContext("2d");

    // Si el gráfico ya existe, destrúyelo
    if (myChart) {
        myChart.destroy(); // Destruir el gráfico existente
    }

    // Calcular R^2
    const r2Value = calculateR2(predictions, yValues);

    // Crear gráfico de regresión polinómica
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: "Predicciones Polinómicas",
                    data: predictions,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Valores Reales",
                    data: yValues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "X",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Y",
                    },
                },
            },
            plugins: {
                // Plugin para mostrar R^2 en la gráfica
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(`R^2: ${r2Value.toFixed(2)}`, 10, 30);
                    ctx.restore();
                },
            },
        },
    });
}

// Mostrar gráfica para arbol de desición
function showDecisionTreeGraph(dotStr) {
    var chart = document.getElementById("tree");

    // Convertir el DOT a un formato que pueda ser graficado
    var parsDot = vis.network.convertDot(dotStr);
    var data = {
        nodes: parsDot.nodes,
        edges: parsDot.edges
    };

    var options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD', // UD, DU, LR, RL
                sortMethod: 'directed',
            },
        },
    };

    // Crear la red de visualización
    var network = new vis.Network(chart, data, options);
}

// Mostrar resultado de la predicción Naive Bayes
function showNaiveBayesPrediction(prediction) {
    const predictionContainer = document.getElementById("naiveBayesPredictionContainer");
    const predictionText = document.getElementById("naiveBayesPredictionText");

    // Actualizar el texto con el resultado de la predicción
    predictionText.innerHTML = `Predicción: <strong>${prediction[0]}</strong> con una probabilidad de <strong>${(prediction[1] * 100).toFixed(2)}%</strong>`;

    // Hacer visible el contenedor
    predictionContainer.style.display = 'block';
}

function showNeuralNetworkPredictions(predictions) {
    const predictionText = predictions.map((pred, index) => `Predicción ${index + 1}: ${pred}`).join('<br/>');
    document.getElementById("neuralNetworkPredictionText").innerHTML = predictionText;
}

function showNeuralNetworkWeights(weights) {
    const weightsText = weights.map((weight, index) => `Peso ${index + 1}: ${weight}`).join('<br/>');
    document.getElementById("neuralNetworkWeightsText").innerHTML = weightsText;
}

function showNeuralNetworkBiases(biases) {
    const biasesText = biases.map((bias, index) => `Sesgo ${index + 1}: ${bias}`).join('<br/>');
    document.getElementById("neuralNetworkBiasesText").innerHTML = biasesText;
}


function drawWeightsBiasesChart(weights, biases) {
    // Preparar los datos para la gráfica
    const weightLabels = weights.map((_, index) => `Capa ${index + 1}`);
    const weightData = {
        labels: weightLabels,
        datasets: [
            {
                label: 'Pesos',
                data: weights.map(weightArray => weightArray.reduce((acc, val) => acc + val, 0) / weightArray.length), // Promedio de pesos por capa
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Sesgos',
                data: biases.map(biasArray => biasArray[0]), // Sesgos
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    // Configuración de la gráfica
    const config = {
        type: 'bar',
        data: weightData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Crear la gráfica
    new Chart(ctx, config);
}



// Inicializar
init();
