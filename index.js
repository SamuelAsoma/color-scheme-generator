document.addEventListener('DOMContentLoaded', function () {
  const colorContainer = document.querySelector('.color-container');
  const getSchemeBtn = document.getElementById('get-scheme-btn');

  // Add default colors when the page loads
  addDefaultColors();

  // Event listener for fetching color scheme
  getSchemeBtn.addEventListener('click', async function () {
      const selectedScheme = getSelectedScheme();
      await fetchAndDisplayColorScheme(selectedScheme);
  });

  // Function to add default colors to the color container
  function addDefaultColors() {
      const defaultColors = ['#FF5733', '#33FF57', '#3366FF', '#FFFF33', '#FF33FF'];
      defaultColors.forEach((color) => addColor(color));
  }

  // Function to fetch color scheme and display colors
  async function fetchAndDisplayColorScheme(mode) {
      const colors = await fetchColorScheme(mode);
      displayColorScheme(colors);
  }

  // Function to fetch color scheme from the API
  async function fetchColorScheme(mode) {
      const count = 5;
      const response = await fetch(`https://www.thecolorapi.com/scheme?hex=0047AB&mode=${mode}&count=${count}&format=json`);
      if (!response.ok) {
          throw new Error('Failed to fetch color scheme');
      }
      const data = await response.json();
      return data.colors;
  }

  // Function to display colors in the color container
  function displayColorScheme(colors) {
      colorContainer.innerHTML = '';
      colors.forEach((color) => addColor(color.hex.value));
  }

  // Function to add a single color to the color container
  function addColor(color) {
      const colorWrapper = document.createElement('div');
      colorWrapper.classList.add('color-wrapper');

      const colorDiv = document.createElement('div');
      colorDiv.classList.add('color');
      colorDiv.style.backgroundColor = color;

      const colorName = document.createElement('div');
      colorName.classList.add('color-name');
      colorName.textContent = color;

      colorDiv.addEventListener('click', function () {
          copyToClipboard(color);
      });

      colorWrapper.appendChild(colorDiv);
      colorWrapper.appendChild(colorName);
      colorContainer.appendChild(colorWrapper);
  }

  // Function to get the selected color scheme from the dropdown
  function getSelectedScheme() {
      const schemeDropdown = document.getElementById('scheme-dropdown');
      return schemeDropdown.value;
  }

  // Function to copy color value to clipboard
  function copyToClipboard(value) {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Color copied to clipboard: ' + value);
  }
});
