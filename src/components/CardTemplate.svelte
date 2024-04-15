<script>
    import { createEventDispatcher } from 'svelte';
    import 'animate.css';

    export let tarea;
    let editmode=false;
    export let handleTransaction;
    // export let handleKeypressEnter;
    export let categorias;
    export let prioridades;
    // export let handleKeyPress;
    export let handleDeleteTransaction
    export let recargarDatosIndexedDB;
    
    const dispatch = createEventDispatcher();

    function handleShowModal(){
      dispatch('show-modal');
    }  

    function  toggleEditMode(e){
        editmode = !editmode;
    }

    function handleKeyPress(event) {
      toggleEditMode(event);
    }
  
    function handleKeypressEnter(e, tarea) {
      if (e.key === "Enter") {
        handleTransaction(tarea);
        toggleEditMode(e);
      }
    }
  
    
    
</script>

<main class="animate__animated animate__flipInX">
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card-tarea" role='button' on:click={handleShowModal}>
        {#if editmode}
        <!-- svelte-ignore a11y-autofocus -->
        <input
            type="text"
            name="title"
            id="title"
            bind:value={tarea.titulo}
            autofocus
            on:focusout={() => {
            handleTransaction(tarea);
            toggleEditMode();
            }}
            on:keypress={(e) => handleKeypressEnter(e, tarea)}
        />
        {:else}
        <div
            class="title"
            role="textbox"
            on:keypress={handleKeyPress}
            tabindex="0"
            on:click|stopPropagation={toggleEditMode}
        >
            {tarea.titulo}
        </div>
        {/if}
        <p>Categoria: {tarea.categoria}</p>
        <select
            name="categoria"
            id="categoria"
            class="p-1 m-2 rounded text-gray-900 
                   border border-gray-300"
            bind:value={tarea.categoria}
            on:change={() => handleTransaction(tarea)}
            on:click|stopPropagation
        >
        {#each categorias as categoria}
            <option value={categoria}>{categoria}</option>
        {/each}
        </select>
        <br />
        <br />
        <div class="option-checkbox">
        <label for="terminada">Completada</label>
        <input
            type="checkbox"
            name="terminada"
            id="terminada"
            bind:checked={tarea.terminada}
            on:change={() => handleTransaction(tarea)}
            on:click|stopPropagation
        />
        <label for="prioridad">Prioridad</label>
        <select
            name="prioridad"
            id="prioridad"
            bind:value={tarea.prioridad}
            on:change={() => handleTransaction(tarea)}
            on:click|stopPropagation
        >
            {#each prioridades as prioridad}
            <option value={prioridad}>{prioridad}</option>
            {/each}
        </select>
        </div>
        <div class="button-action">
        <button
            class="button-remove"
            on:click|stopPropagation={() => {
            handleDeleteTransaction(tarea, recargarDatosIndexedDB);
            }}
            type="button">Eliminar</button
        >
        <button
            class="button-update"
            on:click|stopPropagation={() => handleTransaction(tarea)}
            type="button">Actualizar</button
        >
        </div>
    </div>
</main>

<style>

.card-tarea {
    background-color: whitesmoke;
    border: 5px solid rgb(27, 49, 63);
    border-radius: 25px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
    margin-bottom: 3rem;
    padding: 1rem;
  }

  .option-checkbox {
    margin-bottom: 1rem;
  }

  .title {
    font-size: large;
    font-weight: 600;
    color: black;
  }

  .button-action {
    margin-bottom: 1rem;
    text-align: right;
  }

  .button-remove {
    background-color: darkred;
    color: whitesmoke;
  }

  .button-update {
    background-color: darkblue;
    color: azure;
    margin-right: 1rem;
  }

</style>