<script>
// @ts-nocheck
import {onMount} from 'svelte';
import CardTarea from "../../components/CardTemplate.svelte";
import {categorias} from '../../services/categorias'
import {prioridades} from '../../services/prioridades'
import {handleTransaction, handleDeleteTransaction} from "../../services/services";

let tareas=[];

function recargarDatosIndexedDB() {
    let openRequest = indexedDB.open("TareasDB", 1);
    openRequest.onsuccess = function (e) {
    let db = openRequest.result;
    db.onversionchange = function () {
        db.close();
        alert(
        "la base de datos está desactualizada, por favor recargue la página. Muchas gracias"
        );
    };

    const transaction = db.transaction(["tareas"], "readonly");
    const store = transaction.objectStore("tareas");
    const request = store.getAll();

    transaction.oncomplete = (e) => {
        tareas = request.result;
    };

    transaction.onabort = (e) => {
        console.log("Error al realizar la consulta: ", e);
    };
    };
    openRequest.onerror = function () {
    console.error("Error", openRequest.error);
    };
}

onMount( () =>{
        recargarDatosIndexedDB();
})
    
</script>



<!-- Taskend.svelte -->
<h1> Aquí podemos mostrar las tareas finalizadas </h1>


<div class="container">

{#each tareas as tarea (tarea.idtareas)}
    {#if tarea.terminada}
        <CardTarea 
            tarea={tarea}
            handleTransaction={handleTransaction}
            
            categorias = {categorias}
            prioridades = {prioridades}
           
            handleDeleteTransaction = {handleDeleteTransaction}
            recargarDatosIndexedDB = {recargarDatosIndexedDB}
        />
    {/if}
{/each}


</div>

<style>
    
</style>
