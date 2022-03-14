const alertError = document.getElementById("alert");
const containerAlertError = document.getElementById("alert-error");
const monedaFrom = document.getElementById("moneda-from");
const monedaTo = document.getElementById("moneda-to");
const cash = document.getElementById("cash");
const fragment = document.createDocumentFragment();

const numero = document.getElementById('cash');

function validacion(valor){
  if(valor.value < 1){
    valor.value = 1;
  }
}
cash.addEventListener("keypress", function () {
  if (isNaN(cash.value)) {
    containerAlertError.setAttribute("style", "display:block");
    alertError.innerHTML = "Por favor ingrese un valor correcto";
  } else {
    containerAlertError.setAttribute("style", "display:none");
  }
});
let monedaOrigen = "0";
let monedaDestino = "0";
let moneda = [
  "Elige tu Moneda",
  "Dolar",
  "Peso Mexicano",
  "Peso Colombiano",
  "Euro",
  "Libra Esterlina"
];
let frag;
moneda.forEach(function (item, index) {
  const opt = document.createElement("option");
  opt.value = index;
  opt.text = item;
  fragment.appendChild(opt);
  frag = fragment.cloneNode(true);
});
monedaFrom.appendChild(fragment);
monedaTo.appendChild(frag);
function selectedFrom() {
  monedaOrigen = monedaFrom.value;
  containerAlertError.setAttribute("style", "display:none");
}
function selectedTo() {
  monedaDestino = monedaTo.value;
  containerAlertError.setAttribute("style", "display:none");
}
function calcularCambio(cash, origen, destino) {
  let data = {
    cash,
    origen: moneda[origen],
    destino: moneda[destino],
    tasaCambio: 0,
    result: 0
  };
  switch (origen) {
    case "1":
      if (destino === "2") {
        // Evalua el cambio de Dolar a Peso Mexicano
        data.tasaCambio = 20.95;
      } else if (destino === "3") {
        // Evalua el cambio de Dolar a Peso Colombiano
        data.tasaCambio = 3830.01;
      } else if (destino === "4") {
        // Evalua el cambio de Dolar a Euro
        data.tasaCambio = 0.91;
      } else if (destino === "5") {
        data.tasaCambio = 0.76;
      }
      break;
    case "2": {
      if (destino === "1") {
        data.tasaCambio = 0.048;
      } else if (destino === "3") {
        data.tasaCambio = 180.43;
      } else if (destino === "4") {
        data.tasaCambio = 0.044;
      } else if (destino === "5") {
        data.tasaCambio = 0.036;
      }
      break;
    }
    case "3": {
      if (destino === "1") {
        data.tasaCambio = 0.00027;
      } else if (destino === "2") {
        data.tasaCambio = 0.0055;
      } else if (destino === "4") {
        data.tasaCambio = 0.00024;
      } else if (destino === "5") {
        data.tasaCambio = 0.0002;
      }
      break;
    }
    case "4": {
      if (destino === "1") {
        data.tasaCambio = 1.09;
      } else if (destino === "2") {
        data.tasaCambio = 22.88;
      } else if (destino === "3") {
        data.tasaCambio = 4129.49;
      } else if (destino === "5") {
        data.tasaCambio = 0.83;
      }
      break;
    }
    case "5": {
      if (destino === "1") {
        data.tasaCambio = 1.32;
      } else if (destino === "2") {
        data.tasaCambio = 27.69;
      } else if (destino === "3") {
        data.tasaCambio = 4996.33;
      } else if (destino === "4") {
        data.tasaCambio = 1.21;
      }
      break;
    }
    default:
      break;
  }
  data.result = data.cash * data.tasaCambio;
  return data;
}
function convertirDivisa() {
  if (monedaOrigen === monedaDestino) {
    containerAlertError.setAttribute("style", "display:block");
    alertError.innerHTML = "Las monedas no pueden ser iguales";
  } else if (monedaOrigen === "0" || monedaDestino === "0") {
    containerAlertError.setAttribute("style", "display:block");
    alertError.innerHTML = "Asegurese de seleccionar las monedas";
  } else {
    const data = calcularCambio(
      Number(cash.value),
      monedaOrigen,
      monedaDestino
    );
    const money = document.getElementById("money");
    const moneyOrigen = document.getElementById("moneda-origen");
    const moneyDestino = document.getElementById("moneda-destino");
    const tasaCambio = document.getElementById("tasa-cambio");
    const conversion = document.getElementById("conversion");
    let resultFormat = "";
    if (data.destino === "Dolar") {
      resultFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(data.result);
    } else if (data.destino === "Euro") {
      resultFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR"
      }).format(data.result);
    } else if (data.destino === "Libra Esterlina") {
      resultFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP"
      }).format(data.result);
    } else if (data.destino === "Peso Colombiano") {
      resultFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "COP"
      }).format(data.result);
    } else {
      resultFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MXN"
      }).format(data.result);
    }
    money.innerHTML = `Dinero: ${data.cash}`;
    moneyOrigen.innerHTML = `Moneda de origen: ${data.origen}`;
    moneyDestino.innerHTML = `Moneda de destino: ${data.destino}`;
    tasaCambio.innerHTML = `Tasa de cambio aplicada: ${data.tasaCambio}`;
    conversion.innerHTML = `Conversion: ${resultFormat}`;
  }
}