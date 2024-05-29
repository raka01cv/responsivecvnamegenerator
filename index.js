const imageContainer = document.getElementById('imageContainer');
const inputLetters = document.querySelectorAll('.letter');

function generateImages() {
    imageContainer.innerHTML = ''; // Clear previous images
    const nameInput = document.getElementById('nameInput').value;
    const nameArray = nameInput.split('');
    nameArray.forEach(async (input) => {
        let imageUrl;
        if (input === ' ') {
            imageUrl = 'images/space.png'; // Adjust according to the actual filename
        } else if (input === '.') {
            imageUrl = 'images/period.png'; // Adjust according to the actual filename
        } else {
            const letter = input.toUpperCase();
            imageUrl = `images/${letter}.png`; // Assuming images are named with uppercase letters
        }
        if (imageUrl) {
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
            inputLetters.forEach(input => {
                filename += input.value.toLowerCase();
            });
            filename += '.png';

            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = filename;

            // Trigger downloaded
            link.click();
        } else {
            console.error('Image URL is empty.');
        }
    }).catch(error => {
        console.error('An error occurred while capturing the screenshot:', error);
    });
}