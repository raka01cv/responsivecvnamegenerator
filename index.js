const imageContainer = document.getElementById('imageContainer');
const inputLetters = document.querySelectorAll('.letter');

function generateImages() {
    imageContainer.innerHTML = ''; // Clear previous images

    inputLetters.forEach(input => {
        const letter = input.value.toLowerCase();
        if (letter) {
            const imageUrl = `images/${letter.toUpperCase()}.png`; // Assuming images are named with uppercase letters
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.onerror = () => {
                console.error(`Image for letter ${letter} not found.`);
            };
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

            // Trigger download
            link.click();
        } else {
            console.error('Image URL is empty.');
        }
    }).catch(error => {
        console.error('An error occurred while capturing the screenshot:', error);
    });
}
