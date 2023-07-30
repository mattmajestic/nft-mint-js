<!-- App.svelte -->
<script>
  import { createArt } from './generate';
  import { writable } from 'svelte/store';

  // State variables
  let colors = [];
  const theme = writable('light');
  const isConnectedToMetamask = writable(false);

  // Function to generate a color box
  function generateColor() {
    const color = createArt();
    colors = [...colors, color];
  }

  // Function to toggle between light and dark themes
  function toggleTheme() {
    theme.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  // Function to convert color to base64 image
  function generateColorImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  }

  // Function to connect to Metamask
  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        // Request Metamask to connect
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        isConnectedToMetamask.set(true);
      } catch (error) {
        console.error('Failed to connect to Metamask:', error);
      }
    } else {
      console.error('Metamask not detected. Please install Metamask extension.');
    }
  }
</script>

<main class:dark={$theme === 'dark'}>
  <h1>Art Generator</h1>
  <button on:click={generateColor}>Generate</button>
  <button on:click={toggleTheme}>Toggle Theme</button>

  {#if !$isConnectedToMetamask}
    <button on:click={connectToMetamask}>Connect to Metamask</button>
  {:else}
    <!-- Add the "Mint NFT" button here when connected to Metamask -->
    <button>Mint NFT</button>
  {/if}

  <div class="grid">
    {#each colors as color, i}
      <img src={`data:image/png;base64,${generateColorImage(color)}`} alt={`Color ${i}`} />
    {/each}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 100px);
    gap: 10px;
    margin-top: 20px;
  }

  img {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    object-fit: cover;
  }

  .dark img {
    border: 1px solid #fff;
  }

  button {
    margin: 10px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
