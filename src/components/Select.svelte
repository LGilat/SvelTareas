<script>
    export let labelfor;
    export let titulo;
    export let name;
    export let id;
    export let elementos;
</script>

<label for="{labelfor}">{titulo}</label>
<select  name="{name}" id="{id}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {#each elementos as elemento}
        <option value={elemento}> {elemento}</option>
     {/each}
</select>



<style>

</style>