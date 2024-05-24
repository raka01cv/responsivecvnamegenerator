// Define nameArray globally
let nameArray = [];

const imageContainer = document.getElementById('imageContainer');

function generateImages() {
    imageContainer.innerHTML = ''; // Clear previous images
    const nameInput = document.getElementById('nameInput').value;
    nameArray = nameInput.split('');
    nameArray.forEach((input) => {
        const letter = input.toUpperCase();
        if (letter) {
            const imageUrl = `images/${letter}.png`; // Assuming images are named with uppercase letters
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imageContainer.appendChild(imgElement);
        }
    });
}

function captureScreenshot() {
    const container = document.getElementById('imageContainer');

    html2canvas(container).then(canvas => {
        const imageUrl = canvas.toDataURL();

        if (imageUrl) {
            // Construct filename based on input values
            let filename = 'CellaVision_';
            nameArray.forEach(input => {
                filename += input.toUpperCase();
            });
            filename += '.png';

            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = filename;

            // Trigger download
            link.click();
        } else {
            console.error('Image URL is empty.');
        }
    }).catch(error => {
        console.error('An error occurred while capturing the screenshot:', error);
    });
}
