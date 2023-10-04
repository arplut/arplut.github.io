const gallery = document.querySelector('.gallery');

// Define the folder structure for the gallery
const folders = [
{ name: 'Row 1', path: 'photography/row1' },
{ name: 'Row 2', path: 'photography/row2' },
{ name: 'Row 3', path: 'photography/row3' },
{ name: 'Row 4', path: 'photography/row4' },
{ name: 'Row 5', path: 'photography/row5' },
];

// Define the number of images to show per row at different screen sizes
const imagesPerRow = {
mobile: 1,
tablet: 3,
desktop: 5,
};

// Define the current screen size
let screenSize = 'desktop';

// Add event listener to window to detect screen size changes
window.addEventListener('resize', () => {
if (window.innerWidth < 768) {
    screenSize = 'mobile';
} else if (window.innerWidth < 1024) {
    screenSize = 'tablet';
} else {
    screenSize = 'desktop';
}
renderGallery();
});

function renderGallery() {
    // Clear the existing gallery
    gallery.innerHTML = '';
  
    // Get the number of images to show per row for the current screen size
    const imagesToShow = imagesPerRow[screenSize];
  
    // Loop through each folder and add the images to the gallery
    folders.forEach(folder => {
      console.log(`Loading images from folder: ${folder.path}`);
  
      // Make a request to the server for the list of images in the folder
      fetch(folder.path)
        .then(response => response.text())
        .then(text => {
          console.log(`Loaded image list for folder: ${folder.path}`);
  
          // Parse the list of images from the response
          const imageUrls = text.split('\n');
  
          // Loop through the image URLs and add the images to the gallery
          for (let i = 0; i < imageUrls.length; i++) {
            // Create a new <img> element for the image
            const img = document.createElement('img');
            img.src = imageUrls[i];
            img.alt = '';
  
            // Add the <img> element to the gallery
            gallery.appendChild(img);
  
            // If we've reached the maximum number of images for this row, start a new row
            if ((i + 1) % imagesToShow === 0) {
              gallery.appendChild(document.createElement('br'));
            }
          }
  
          console.log(`Added ${imageUrls.length} images from folder: ${folder.path}`);
        });
    });
  }

// Get the images from a folder
function getImagesFromFolder(folderPath) {
const images = [];

// Get all the images in the folder
const imageFiles = require.context(`../${folderPath}`, true, /\.(jpg|jpeg|png|gif|bmp)$/i);

// Loop through each image and add it to the images array
imageFiles.keys().forEach((key) => {
    const src = imageFiles(key).default;
    const alt = key.split('/').pop().split('.')[0];
    images.push({ src, alt });
});

return images;
}

// Create a scroll bar for a row
function createScrollBar(row) {
// Create the scroll bar element
const scrollBar = document.createElement('div');
scrollBar.classList.add('scroll-bar');

// Create the left arrow button
const leftButton = document.createElement('button');
leftButton.innerHTML = '&lt;';
leftButton.disabled = true;

// Create the right arrow button
const rightButton = document.createElement('button');
rightButton.innerHTML = '&gt;';
rightButton.disabled = true;

// Add event listeners to the buttons to scroll the row
leftButton.addEventListener('click', () => {
    row.scrollBy({ left: -200, behavior: 'smooth' });
});

rightButton.addEventListener('click', () => {
    row.scrollBy({ left: 200, behavior: 'smooth' });
});

// Add event listener to the row to enable/disable the buttons
row.addEventListener('scroll', () => {
    if (row.scrollLeft === 0) {
    leftButton.disabled = true;
    } else {
    leftButton.disabled = false;
    }

    if (row.scrollLeft + row.clientWidth === row.scrollWidth) {
    rightButton.disabled = true;
    } else {
    rightButton.disabled = false;
    }
});

// Add the buttons to the scroll bar
scrollBar.appendChild(leftButton);
scrollBar.appendChild(rightButton);

return scrollBar;
}

// Open a modal to display an image
function openModal(src, alt) {
// Create the modal element
const modal = document.createElement('div');
modal.classList.add('modal');

// Create the modal content element
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

// Create the image element
const img = document.createElement('img');
img.src = src;
img.alt = alt;

// Add a click event listener to the image to close the modal
img.addEventListener('click', () => {
    closeModal(modal);
});

// Add the image to the modal content
modalContent.appendChild(img);

// Add the modal content to the modal
modal.appendChild(modalContent);

// Add the modal to the page
document.body.appendChild(modal);

// Disable scrolling on the page
document.body.style.overflow = 'hidden';
}

// Close the modal
function closeModal(modal) {
// Remove the modal from the page
document.body.removeChild(modal);

// Enable scrolling on the page
document.body.style.overflow = 'auto';
}

// Render the gallery on page load
renderGallery();
