<script>
    import 'animate.css';

    export let name;
    export let id;
    export let placeholder='Texto';
    export let handleKeypressEnterSearchInput;
    export let searchItemTask='';
    export let handleclearSearchItemTask;

    let isMouseOver=false;

    function handleIsMouseOver(e){
      isMouseOver=true;
    }

    function handleMouseLeave() {
        isMouseOver = false;
    }
    </script>

<input 
        type="text"
        name= {name} 
        class={isMouseOver? "animate__animated animate__pulse mt-2 flex h-10 w-2/4 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" 
              : "mt-2 flex h-10 w-2/4 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"  }
        id= {id}
        placeholder= {placeholder}
        on:keypress={handleKeypressEnterSearchInput} 
        value={searchItemTask}
        on:blur ={handleclearSearchItemTask}
        on:mouseenter={handleIsMouseOver}
        on:mouseleave={handleMouseLeave}
       
        
      />