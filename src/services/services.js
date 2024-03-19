// @ts-nocheck
import { prioridades } from "./prioridades";
import { categorias } from "./categorias";
import Swal from "sweetalert2";

let db = null;
let openRequest = indexedDB.open("TareasDB", 1);

openRequest.onupgradeneeded = function (event) {
  let db = event.target.result;
  if (!db.objectStoreNames.contains("tareas")) {
    let StoreObjTareas = db.createObjectStore("tareas", {
      keyPath: "idtareas",
      autoIncrement: true,
    });
    StoreObjTareas.createIndex("titulo", "titulo", { unique: false });
    StoreObjTareas.createIndex("categoria", "categoria", { unique: false });
  }
};

openRequest.onerror = function () {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
  db = openRequest.result;
  db.onversionchange = function () {
    db.close();
    alert(
      "la base de datos está desactualizada, por favor recargue la página. Muchas gracias"
    );
  };
};

export function getAllTareas() {
  return tareas;
}

/**
 * @param {string} elemento
 * @param {string | any[]} array
 */
export function existeEnArray(elemento, array) {
  return !!(array.includes(elemento));
}

export function handleTransaction(tarea) {
  updateTransaction(db, "tareas", "readwrite", tarea);
}

export function handleDeleteTransaction(tarea, callback) {
  Swal.fire({
    title: "Estás seguro?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Sí, bórralo",
  }).then((result) => {
    if (result.isConfirmed) {
      removeTransaction(db, "tareas", "readwrite", tarea);
      callback();
    }
  });
}

export function createTransaction(db, objstore, mode, tarea, callback) {
  let transaction = db.transaction([objstore], mode);
  let store = transaction.objectStore(objstore);

  if (mode === "readwrite") {
    let request = store.add(tarea);

    request.onsuccess = function (event) {
      accionCompletada("Tarea creada correctamente");
      callback();
    };

    request.onerror = function (event) {
      console.error("Error al guardar los datos en la base de datos");
    };
  }
}

function accionCompletada(texto) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: texto,
    showConfirmButton: false,
    timer: 1500,
  });
}

function removeTransaction(db, objstore, mode, tarea) {
  let transaction = db.transaction([objstore], mode);
  let store = transaction.objectStore(objstore);
  let request = store.delete(tarea.idtareas);

  request.onsuccess = function (event) {
    accionCompletada("Tarea borrada con éxito");
  };

  request.onerror = function (event) {
    console.error("Error: ", event.error);
  };
}

export function updateTransaction(db, objstore, mode, tarea) {
  let transaction = db.transaction([objstore], mode);
  let store = transaction.objectStore(objstore);

  if (mode === "readwrite") {
    let getRequest = store.get(tarea.idtareas);
    getRequest.onsuccess = function (event) {
      let tareaEncontrada = event.target.result;
      if (tareaEncontrada) {
        tareaEncontrada.titulo = tarea.titulo;
        tareaEncontrada.terminada = tarea.terminada;
        tareaEncontrada.categoria = tarea.categoria;
        tareaEncontrada.prioridad = tarea.prioridad;

        let updateRequest = store.put(tareaEncontrada);
        updateRequest.onsuccess = function () {
          accionCompletada("Tarea modificada con éxito");
        };
        updateRequest.onerror = function (event) {
          console.error("error al actualizar la tarea ", event.target.error);
        };
      }
    };
  }
}

export function agregarTarea(e, recargarTareas) {
  e.preventDefault();

  const target_prioridad = e.target.prioridad.value;
  const target_categoria = e.target.categoria.value;
  const titulo = e.target.titulo.value;
  const prioridad = existeEnArray(target_prioridad, prioridades)
    ? target_prioridad
    : "muy baja";
  const categoria = existeEnArray(target_categoria, categorias)
    ? target_categoria
    : "Otros";

  const tarea = {
    titulo: titulo,
    terminada: false,
    datecreada: new Date().toLocaleString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    datefinalizada: "",
    categoria: categoria,
    prioridad: prioridad,
  };
  createTransaction(db, "tareas", "readwrite", tarea, recargarTareas);
}
