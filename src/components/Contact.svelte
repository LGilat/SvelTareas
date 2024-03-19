<!-- contact-us.svelte -->
<script>
     // @ts-nocheck
    // Puedes importar cualquier lógica necesaria para manejar el envío del formulario
    function handleSubmit(e){
        console.log(e);
    }
</script>
  
  <main class="container mx-auto px-4 py-8  flex-col bg-slate-50">
    <section class="text-center">
      <h1 class="text-4xl font-bold mb-4">Contáctanos</h1>
      <p class="text-lg mb-6">¡Estamos aquí para ayudarte! Por favor, completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.</p>
    </section>
  
    <section class="items-center justify-center p-4">
      <form class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8" on:submit|preventDefault="{handleSubmit}">
        <div class="mb-4">
          <label for="name" class="block text-lg font-semibold mb-1">Nombre</label>
          <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-lg font-semibold mb-1">Correo Electrónico</label>
          <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-lg font-semibold mb-1">Mensaje</label>
          <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700">Enviar</button>
        </div>
      </form>
    </section>
  </main>
  
<style>
/* Estilos CSS personalizados */
</style>
