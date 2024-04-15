<script>
// @ts-nocheck
import {onMount} from 'svelte';
import CardTarea from "../../components/CardTemplate.svelte";
import {categorias} from '../../services/categorias'
import {prioridades} from '../../services/prioridades'
import {handleTransaction, handleDeleteTransaction} from "../../services/services";
    
import 'animate.css';

let tareas=[];
let vistatablas=false;

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

function handleEventChooseTable(e){
    vistatablas = e.target.checked;
    console.log("El checkbox ha cambiado:", e.target.checked);
}

onMount( () =>{
        recargarDatosIndexedDB();
})
    
</script>



<!-- Taskend.svelte -->
<h1> Aquí podemos mostrar las tareas finalizadas </h1>

<div class="text-right" >
    <input
    class="me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25
            before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full
            before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
            after:h-5 after:w-5 after:rounded-full after:border-none after:bg-slate-700 after:shadow-switch-2 
            after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary 
            checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] 
            checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary 
            checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] 
            checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 
            focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 
            focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] 
            focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']
             checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem]
              checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
               dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary"
    type="checkbox"
    role="switch"
    on:change={handleEventChooseTable}
    id="flexSwitchCheckDefault" />
  <label
    class="inline-block ps-[0.15rem] hover:cursor-pointer"
    for="flexSwitchCheckDefault"
    >Vista Tabla</label
  >

</div>

<div class="container">

{#if vistatablas }
    <table class="animate__animated animate__backInUp table-fixed w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10 mb-10">
        <thead class="text-xs text-gray-700 uppercase bg-cyan-400 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" class="px-6 py-3">Titulo</th>
                <th scope="col" class="px-6 py-3">Categoria</th>
                <th scope="col" class="px-6 py-3">Completada</th>
                <th scope="col" class="px-6 py-3">Prioridad</th>
                <th scope="col" class="px-6 py-3">Fecha</th>
                <th scope="col" class="px-6 py-3">Descripcion</th>
            </tr>
        </thead>
    <tbody>
        {#each tareas as tarea (tarea.idtareas)}
            {#if tarea.terminada}  
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>{tarea.titulo} </td>
                    <td>{tarea.categoria} </td>
                    <td><input type="checkbox"  checked= {(tarea.terminada) ? 'true' : 'false' } /> </td>
                    <td>{tarea.prioridad}</td>
                    <td>{tarea.datecreada}</td>
                    <td>{tarea.descripcion}</td>
                </tr>
            {/if}
        {/each}
    </tbody>

    </table>
        
{:else }
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
{/if}




</div>

<style>
    
</style>
