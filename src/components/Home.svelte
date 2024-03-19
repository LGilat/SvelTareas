<script>
    // @ts-nocheck
    import {
      handleTransaction,
      agregarTarea,
      handleDeleteTransaction,
    } from "../services/services";
  
    import {onMount} from 'svelte';
    import { categorias } from "../services/categorias";
    import { prioridades } from "../services/prioridades";
    import CardTarea from "./CardTemplate.svelte";
    import InputText from "./InputText.svelte";
    import Select from "./Select.svelte";
    import InputSearch from "./InputSearch.svelte";
  
   
  

    let showTaskEnd = false;
    let opcionSelected='';
    let estado = 'alta';
    let estado_categoria='tecnologia';
    let searchItemTask='';
  
  
    function handleclearSearchItemTask(){
      searchItemTask='';
    }
  
    function handleOptionTaskSelected(option){
      opcionSelected = (option === opcionSelected) ? opcionSelected : option;
    }
    
    var tareas = [];
    
    function handleKeypressEnterSearchInput(e){
      if (e.key === 'Enter'){
        handleOptionTaskSelected('buscar');
        searchItemTask=e.target.value;
      }
    }
  
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
          console.log("Error al realizar la consulta: ", e.error);
        };
      };
      openRequest.onerror = function () {
        console.error("Error", openRequest.error);
      };
    }
  
    document.addEventListener("DOMContentLoaded", (e) => {
      recargarDatosIndexedDB();
    });
  
    function handleAgregarTarea(e, recargarTareas) {
      agregarTarea(e, recargarTareas);
    }

    onMount( () =>{
        recargarDatosIndexedDB();
    })
  </script>
  

  
  <main>
    <form
      class="form-border"
      on:submit={(e) => {
        handleAgregarTarea(e, recargarDatosIndexedDB);
      }}
    >
      
      <InputText mensaje='Titulo de la tarea' />
      <br />
  
      <Select 
        labelfor='categoria'
        titulo = 'Categorias'
        name='categoria'
        id='categoria'
        elementos = {categorias} />

      <br />

      <Select 
        labelfor='prioridad'
        titulo = 'Prioridades'
        name='prioridad'
        id='prioridad'
        elementos = {prioridades} />
  
      <div class="button-form">
        <button type="submit">Enviar</button>
      </div>
    </form>
  
    <br />
    <br />
    <div class="input-searchtask flex items-center justify-center">
      
      <InputSearch 
          name="buscartarea" 
          id="buscartarea" 
          placeholder="Buscar tarea" 
          handleKeypressEnterSearchInput={handleKeypressEnterSearchInput}
          searchItemTask={searchItemTask}
          handleclearSearchItemTask={handleclearSearchItemTask}
        />
        
    </div>
    <div class="boxoptions">
      <button type="button" class={ ( opcionSelected === 'categoria' ) ? 'pulsado' : '' } on:click={ (e) => handleOptionTaskSelected('categoria')}> Task category</button>
      <button type="button" class={ ( opcionSelected === 'completed' ) ? 'pulsado' : '' } on:click={ (e) => handleOptionTaskSelected('completed')}> Task end</button>
      <button type="button" class={ ( opcionSelected === 'prioridad' ) ? 'pulsado' : '' } on:click={ (e) => handleOptionTaskSelected('prioridad')}> Task highpriority</button>
      <button type="button" class={ ( opcionSelected === 'todos' ) ? 'pulsado' : '' }     on:click={ (e) => handleOptionTaskSelected('todos')}> Mostrar tareas</button>
      <div class={(opcionSelected === 'prioridad') ? 'show margin-top-prioridad' : 'hiden'}>
        <select name="prioridad" id="prioridad" bind:value={estado}>
          {#each prioridades as prioridad}
            <option value={prioridad}>{prioridad}</option>
          {/each}
        </select>
      </div>
  
      <div class={(opcionSelected === 'categoria') ? 'show' : 'hiden'}>
        <select name="categoria" id="categoria" bind:value={estado_categoria}>
          {#each categorias as categoria}
            <option value={categoria}>{categoria}</option>
          {/each}
        </select>
      </div>
  
    </div>
  
    <br />
    <br />
    <div class="container">
      {#each tareas as tarea (tarea.idtareas)}
        {#if opcionSelected === 'completed'}
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
        {:else if opcionSelected === 'buscar'}
          
              {#if tarea.titulo.toLowerCase().includes(searchItemTask.toLocaleLowerCase())}
                  
                  <CardTarea 
                    tarea={tarea}
                    handleTransaction={handleTransaction}
                    
                    categorias = {categorias}
                    prioridades = {prioridades}
                    
                    handleDeleteTransaction = {handleDeleteTransaction}
                    recargarDatosIndexedDB = {recargarDatosIndexedDB}
                  /> 
              {/if}
  
        {:else if opcionSelected === 'categoria'}
            {#if tarea.categoria.toLowerCase() === estado_categoria.toLowerCase()}
              <CardTarea 
                tarea={tarea}
                handleTransaction={handleTransaction}
               
                categorias = {categorias}
                prioridades = {prioridades}
               
                handleDeleteTransaction = {handleDeleteTransaction}
                recargarDatosIndexedDB = {recargarDatosIndexedDB}
              /> 
            {/if}
          
  
        {:else if opcionSelected === 'prioridad'}
          {#if tarea.prioridad === estado}
            <CardTarea 
              tarea={tarea}
              handleTransaction={handleTransaction}
             
              categorias = {categorias}
              prioridades = {prioridades}
              
              handleDeleteTransaction = {handleDeleteTransaction}
              recargarDatosIndexedDB = {recargarDatosIndexedDB}
            /> 
          
          {/if}
  
        {:else }
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
  </main>
  
  <style>
    .form-border {
      background-color: rgba(228, 228, 228, 0.123);
      border: 1px solid black;
      border-radius: 10px;
      box-shadow: 1px 1px lightblue;
      padding: 1.2rem;
      color: black;
      font-weight: bolder;
      max-width: 55vh;
      margin: 0 auto;
    }
  
    
  
    .button-form {
      margin-top: 1.2rem;
      text-align: right;
    }
  
    .pulsado {
      background-color: darkgrey;
      border: 1px dashed black;
    }
  
    .hiden{
      visibility:hidden;
    }
  
    .show{
      visibility: visible;
    }
  
    .margin-top-prioridad{
      margin: 2rem;
    }
  
    .input-searchtask{
      margin-bottom: 1.2rem;
    }
  
  </style>
  