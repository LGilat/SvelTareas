<script>
    
    export let tarea;
    let editmode=false;
    export let handleTransaction;
    // export let handleKeypressEnter;
    export let categorias;
    export let prioridades;
    // export let handleKeyPress;
    export let handleDeleteTransaction
    export let recargarDatosIndexedDB;

    

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

<main>
    <div class="card-tarea">
        {#if editmode}
        <input
            type="text"
            name="title"
            id="title"
            bind:value={tarea.titulo}
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
            on:click={toggleEditMode}
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
        />
        <label for="prioridad">Prioridad</label>
        <select
            name="prioridad"
            id="prioridad"
            bind:value={tarea.prioridad}
            on:change={() => handleTransaction(tarea)}
        >
            {#each prioridades as prioridad}
            <option value={prioridad}>{prioridad}</option>
            {/each}
        </select>
        </div>
        <div class="button-action">
        <button
            class="button-remove"
            on:click={() => {
            handleDeleteTransaction(tarea, recargarDatosIndexedDB);
            }}
            type="button">Eliminar</button
        >
        <button
            class="button-update"
            on:click={() => handleTransaction(tarea)}
            type="button">Actualizar</button
        >
        </div>
    </div>
</main>

<style>

.card-tarea {
    border: 2px solid burlywood;
    border-radius: 25px;
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

