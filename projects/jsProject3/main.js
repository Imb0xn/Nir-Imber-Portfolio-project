let elementCount = 0;

document.getElementById('createElementButton').addEventListener('click', function () {
    elementCount++;
    let uniqueId = "element-" + elementCount;
    let creationDate = new Date().toLocaleString();

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

    newElement.style.width = width + 'px';
    newElement.style.height = height + 'px';
    newElement.style.backgroundColor = backgroundColor;
    newElement.style.color = fontColor;
    newElement.style.fontSize = fontSize + 'px';
    newElement.style.border = `${frameThickness}px ${frameStyle} ${frameColor}`;

    newElement.style.padding = innerSpacing + 'px';
    newElement.style.margin = outerSpacing + 'px';
    newElement.style.borderRadius = roundedCorners + 'px';

    newElement.innerHTML = content;

    newElement.title = "Created on: " + creationDate;
    newElement.id = uniqueId;

    document.getElementById('dynamicElements').appendChild(newElement);



});

document.getElementById('clearBoardButton').addEventListener('click', clearBoard);


function clearBoard() {
    document.getElementById('dynamicElements').innerHTML = ''; // Clear specific container
    localStorage.removeItem('savedBoard'); // Clear saved state in local storage
}

function saveToLocalStorage() {
    const content = document.getElementById('dynamicElements').innerHTML;
    console.log("Saving to local storage:", content); // Add this line for debugging
    localStorage.setItem('savedBoard', content);
}

function loadFromLocalStorage() {
    const savedContent = localStorage.getItem('savedBoard');
    if (savedContent) {
        document.getElementById('dynamicElements').innerHTML = savedContent;
    }
}


// // Call this function to load saved content when the page loads
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

