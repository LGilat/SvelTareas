<script>
    // @ts-nocheck
    
    import 'animate.css';
    import {
      handleTransaction,
      agregarTarea,
      handleDeleteTransaction,
    } from "../services/services";
  
    import {onMount} from 'svelte';
    import { afterUpdate } from 'svelte';

  

   
    import { categorias } from "../services/categorias";
    import { prioridades } from "../services/prioridades";
    import CardTarea from "./CardTemplate.svelte";
    import InputText from "./InputText.svelte";
    import Select from "./Select.svelte";
    import InputSearch from "./InputSearch.svelte";
    import Modal from "./Modals/Modal.svelte";
  

    let showTaskEnd = false;
    let showModal=false;
    let isVisible = true;

    let opcionSelected='';
    let estado = 'alta';
    let estado_categoria='tecnologia';
    let searchItemTask='';
    let selectedTarea;
    let textareaValue='';
    

    // Función reactiva para restablecer textareaValue cuando showModal cambie de true a false
    $: if (!showModal) {
      textareaValue = '';
    }

    function handleFocus(e,tareas){
      if(tareas.descripcion){
        textareaValue=tareas.descripcion;
      }
    }
   
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

  
    afterUpdate(() => {
        // Esta función se ejecuta después de cada actualización del componente
        // Verificar si el modal está visible y escuchar el evento transitionend si es así
        if (showModal) {
          const modalContent = document.querySelector('#textarea-modal');
         
            if (modalContent) {
                modalContent.focus();
            }
        }
    });




  
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
  

  
  <main class="">
    <!-- <button on:click={() => isVisible = !isVisible}>
      Toggle Visibility
    </button>
    {#if isVisible}
      <div transition:fade   style="display: {isVisible ? 'block' : 'none'}">
        Este div utiliza una transición fade.
      </div>
    {/if} -->
    <div class=" pepino min-h-[280px]">
      <h1 class="title-header">TASKS</h1>
      <h2 class="subtitle">Organiza tus tareas con eficiencia
        y haz más en menos tiempo</h2>

        <h3>
          Gestiona tus tareas con facilidad
          para un día más productivo
        </h3>
    </div>

    <form
      class="form-border animate__animated animate__backInRight"
      on:submit={(e) => {
        handleAgregarTarea(e, recargarDatosIndexedDB);
      }}
    >
      
       
        <input  type="text" 
                name="titulo" 
                id="titulo"
    
                required 
                placeholder="@Titulo de la tarea" 
                class="w-2/4 inline rounded-xl border border-collapse
                        p-2 ml-9"
        >     
      <div class="select-box">
          <select  name="categoria" id="categoria" class="select-box">
              {#each categorias  as categoria}
                  <option value={categoria}> {categoria}</option>
               {/each}
          </select>
      </div>
     
      <div class="select-box-alt">
          <select  name="prioridad" id="prioridad" class="">
              {#each prioridades  as prioridad}
                  <option value={prioridad}> {prioridad}</option>
               {/each}
          </select>
      </div>
  
      <div class="button-form">
        <button type="submit">Enviar</button>
      </div>
    </form>
  
    <br />
    <br />

    <!-- 
    <div class="input-searchtask flex items-center justify-center">
      
      <InputSearch 
          name="buscartarea" 
          id="buscartarea" 
          placeholder="Buscar tarea" 
          handleKeypressEnterSearchInput={handleKeypressEnterSearchInput}
          searchItemTask={searchItemTask}
          handleclearSearchItemTask={handleclearSearchItemTask}
      />
        
    </div> -->

   <!--  <div class="boxoptions">
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
  
    </div> -->
  
    <br />
    <br />
    <div  class="container">
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
            on:show-modal={ () => { (showModal = true); selectedTarea=tarea; } }
            
            categorias = {categorias}
            prioridades = {prioridades}
            
            handleDeleteTransaction = {handleDeleteTransaction}
            recargarDatosIndexedDB = {recargarDatosIndexedDB}
          /> 
        {/if}
      {/each}
    </div>

    <Modal   bind:showModal>
      <h2 slot="header">
        Modal
        <small><em>adjective</em> modal \ˈmō-dəl\</small>
      </h2>
      <h2 class="mt-2 font-normal">     
        {selectedTarea ? selectedTarea.titulo : "Sin título"}
        
      </h2> 
      
      <form  class="form-description" 
      
        on:submit|preventDefault={ ()=> { 
            selectedTarea.descripcion = textareaValue;  
            handleTransaction(selectedTarea); 
              // Espera 1 segundo (1000 milisegundos) antes de establecer showModal a false
            setTimeout(() => {
              (showModal = false);
            }, 400);
             }} >
       
        <!-- svelte-ignore a11y-autofocus -->
        <textarea  
             id="textarea-modal"
            class="block p-2.5 w-full 
                   text-sm text-gray-900 bg-gray-50
                   rounded-lg border border-gray-300
                   focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="5"
            autofocus
            placeholder={ "Ingrese una descripción detallada de la tarea..."}
            on:focus={(e) => { handleFocus(e,selectedTarea)}}
            bind:value={textareaValue} required></textarea>

        <div class="content-center">
          <button 
              class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
                     dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                      me-2 mb-2 mt-4 w-3/12" type="submit" >
              Guardar
          </button>
        </div>
      </form>
      <a href="https://www.merriam-webster.com/dictionary/modal" >merriam-webster.com</a>
    </Modal>


  </main>
   
  
  <style>

    .subtitle{
      font-size: small;
      margin-top: 1rem;
      padding-right: 10rem;
      font-weight: 800;
      text-align: center; /* Centrar texto horizontalmente */
    }

    h3 {
      font-size: x-small;
      padding-right: 12rem;
      font-weight: 600;
      text-align: center; /* Centrar texto horizontalmente */
    }
    
    main {
      margin-top: 0;
    }
    
    
    .title-header{
      font-weight: 900;
      width: 80%;
      font-size: 5rem;
      text-align: center; /* Centrar texto horizontalmente */
      padding-top: 7rem;
      padding-bottom: 0.2rem;
      padding-right: 10%;
      margin: auto; /* Centrar el elemento horizontalmente */
    }

    /* .pepino{
      background-image: url("/src/assets/cabecera_webtarea2.png");
      background-repeat: no-repeat;
      background-size: 100% 32%;
      
    } */

    .pepino{
        background-color: dodgerblue;
    }


    .form-border {
        
        border: 2px solid rgb(27, 49, 63);
        border-radius: 25px;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
        
        
        color: black;
        font-weight: bolder;
        margin: 0 auto;
        margin-top: 1rem;
        padding: 1rem;
        width: 75%;
        text-align: left;
    }


    .form-description {
      display: flex;
      flex-direction: column;
      gap: 2;
      padding: 1em;
      width: 32em;
    }
  
    
  
    .button-form {
        display: inline;
        margin-top: 1.2rem;
        text-align: center;
        padding: 10px 20px;
        background-color: rgb(100, 100, 100); /* Fondo del botón */
        border: none;
        border-radius: 5px;
        color: #fff; /* Color del texto */
        font-size: 16px;
        cursor: pointer;
        /* Agregando efecto de sombra al botón */
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

     /* Estilo del botón al pasar el cursor sobre él */
    .button-form:hover {
        background-color: rgb(80, 80, 80); /* Cambia el color al pasar el cursor */
    }

    /* Estilo del botón al hacer clic */
    .button-form:active {
        box-shadow: none; /* Elimina la sombra al hacer clic */
    }



    /* Estilos para el primer select */
    .select-box {
        position: relative;
        display: inline-block;
    }

    .select-box select {
        padding: 6px;
        width: 200px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5z" fill="gray"/></svg>');
        background-repeat: no-repeat;
        background-position: right 10px center;
    }

    /* Estilos para el segundo select */
    .select-box-alt {
        position: relative;
        display: inline-block;
    }

    .select-box-alt select {
        padding: 6px;
        width: 200px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: #f0f0f0;
    }

    .select-box-alt select:focus {
        outline: none;
        border-color: dodgerblue;
        box-shadow: 0 0 5px dodgerblue;
    }
    
/*     .pulsado {
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
    } */

   
  
  </style>
  

