<script>
  // @ts-nocheck
  import { Router, Link, Route} from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import Taskend from "./routes/taskend/Taskend.svelte";
  import Contact from "./components/Contact.svelte";
  import Home from "./components/Home.svelte";
  import Footer from "./components/Footer.svelte";
  import About from "./components/About.svelte";
  import PolicyPrivacy from "./components/PolicyPrivacy.svelte";
  
  export let url='';
</script>



<Router {url}>
  <!-- Muestra el Navbar -->
  <Navbar />

  <!-- Contenido de la página -->
  <main>
    <!-- Define las rutas utilizando el componente Route -->
    <Route path='/taskend' component={Taskend} />
    <Route path='/contact' component={Contact} />
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/policy" component={PolicyPrivacy} />
  </main>

    <Footer />

</Router>