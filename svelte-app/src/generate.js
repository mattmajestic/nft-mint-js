// generate.js

// Function to generate random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Function to create art and return the generated color
  export async function createArt() {
    const color = getRandomColor();
    return color;
  }
  