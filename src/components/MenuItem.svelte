<script>
    // @ts-nocheck
    export let active;
</script>


<div  class:active={active}>
    <!-- Ranura predeterminada para el contenido del elemento del menú -->
    <slot></slot>
</div>
  
  <style>
    .active {
      /* Estilos específicos cuando el elemento está activo */
      font-weight: bold;
      color: red; /* o cualquier otro color deseado */
    }
  </style>
  

  