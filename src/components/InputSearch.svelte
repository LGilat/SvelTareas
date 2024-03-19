<script>
    export let name;
    export let id;
    export let placeholder='Texto';
    export let handleKeypressEnterSearchInput;
    export let searchItemTask='';
    export let handleclearSearchItemTask;
</script>

<input 
        type="text"
        name= {name} 
        class="mt-2 flex h-10 w-2/4 items-center justify-center 
               rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
        id= {id}
        placeholder= {placeholder}
        on:keypress={handleKeypressEnterSearchInput} 
        value={searchItemTask}
        on:blur ={handleclearSearchItemTask}
        
      />