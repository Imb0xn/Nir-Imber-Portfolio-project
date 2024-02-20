// Tracks the number of dynamically created elements
let elementCount = 0;

// Adds an event listener to the 'Create Element' button
document.getElementById('createElementButton').addEventListener('click', function () {
    elementCount++;
    let uniqueId = "element-" + elementCount;
    let creationDate = new Date().toLocaleString();

    // Retrieve values from input fields
    let elementType = document.getElementById('elementTypeInput').value;
    let content = document.getElementById('contentInput').value;
    let backgroundColor = document.getElementById('backgroundColorInput').value;
    let width = document.getElementById('widthInput').value;
    let height = document.getElementById('heightInput').value;
    let fontColor = document.getElementById('fontColorInput').value;
    let fontSize = document.getElementById('fontSizeInput').value;
    let frameThickness = document.getElementById('frameThicknessInput').value;
    let frameStyle = document.getElementById('borderStyleInput').value;
    let frameColor = document.getElementById('borderColorInput').value;
    let innerSpacing = document.getElementById('innerSpacingInput').value;
    let outerSpacing = document.getElementById('outerSpacingInput').value;
    let roundedCorners = document.getElementById('roundedCornersInput').value;

    let newElement = document.createElement(elementType);

    // Style the new element based on input values
    newElement.style.width = width + 'px';
    newElement.style.height = height + 'px';
    newElement.style.backgroundColor = backgroundColor;
    newElement.style.color = fontColor;
    newElement.style.fontSize = fontSize + 'px';
    newElement.style.border = `${frameThickness}px ${frameStyle} ${frameColor}`;
    newElement.style.padding = innerSpacing + 'px';
    newElement.style.margin = outerSpacing + 'px';
    newElement.style.borderRadius = roundedCorners + 'px';

    // Set the inner content and add a title attribute indicating the creation date
    newElement.innerHTML = content;
    newElement.title = "Created on: " + creationDate;
    newElement.id = uniqueId;

    // Append the new element to the 'dynamicElements' container
    document.getElementById('dynamicElements').appendChild(newElement);
});

// Adds an event listener to the 'Clear Board' button
document.getElementById('clearBoardButton').addEventListener('click', clearBoard);

function clearBoard() {
    document.getElementById('dynamicElements').innerHTML = '';
    localStorage.removeItem('savedBoard');
}

// Saves the current state of dynamically created elements to local storage
function saveToLocalStorage() {
    const content = document.getElementById('dynamicElements').innerHTML;
    console.log("Saving", content);
    localStorage.setItem('savedBoard', content); // 
}

// Loads and displays saved elements from local storage upon page load
function loadFromLocalStorage() {
    const savedContent = localStorage.getItem('savedBoard');
    if (savedContent) {
        document.getElementById('dynamicElements').innerHTML = savedContent; // Restore content
    }
}

// Initialize and load saved content when the document is fully loaded
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
