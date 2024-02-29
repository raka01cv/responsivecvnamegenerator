const imageContainer = document.getElementById('imageContainer');
const inputLetters = document.querySelectorAll('.letter');

// Add event listeners to input fields for input movement
inputLetters.forEach((input, index) => {
    input.addEventListener('input', function() {
        // Automatically move to the next input field
        if (this.value.length === 1 && index < inputLetters.length - 1) {
            inputLetters[index + 1].focus();
        }
    });

    // Add event listener for arrow keys
    input.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' && index < inputLetters.length - 1) {
            inputLetters[index + 1].focus();
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputLetters[index - 1].focus();
        }
    });
});

function generateImages() {
    imageContainer.innerHTML = ''; // Clear previous images

    inputLetters.forEach(async (input) => {
        const letter = input.value.toLowerCase();
        if (letter) {
            const imageUrl = `images/${letter.toUpperCase()}.png`; // Assuming images are named with uppercase letters
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

            // Trigger download
            link.click();
        } else {
            console.error('Image URL is empty.');
        }
    }).catch(error => {
        console.error('An error occurred while capturing the screenshot:', error);
    });
}




