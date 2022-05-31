let numArray = [];
let speed = 1;
let sortAlgo = 'bubblesort'

window.onload = function() {
    Particles.init({
      selector: '.background',
      color: '#75A5B7',
      maxParticles: 130,
      connectParticles: true,
      speed: 0.4,
    });
  };

var rangeInput = document.getElementById("slider1");

rangeInput.addEventListener('mouseup', function() {
  const sliderVal = document.getElementById("slider1").value;
  $('.sorting-canvas').empty();
  generateBars(sliderVal);
});


$( "#generate-array" ).click(function() {
  $('.sorting-canvas').css('visibility', 'visible');
  $('.sorting-canvas').empty();
  const sliderVal = document.getElementById("slider1").value
  generateBars(sliderVal);
});

$('#sort').click(async function() {
  checkSpeed();
  checkSortingAlgo();

  console.log(speed);
  console.log(sortAlgo);

  if (numArray.length === 0) {
    alert("Generate an array first :)")
  } else {
    if (sortAlgo === 'bubblesort') {
      bubbleSort();
    } else {
      alert("Not yet implemented, kindly switch to Bubble Sort...")
    }
  }
});

function generateBars(numOfBars) {
  const width = 800/numOfBars;
  const colors = ["#3d3d3d", "#000000"]
  let colorValue = 0;
  numArray = [];

  for (let i = 0; i < numOfBars; i++) {
    colorValue += 1;
    if (colorValue === 2) {
      colorValue = 0;
    }
    
    const random_num = Math.floor(Math.random() * 500) + 1;
    numArray.push(random_num);

    $('<div>', {
      class: 'bar',
      style: 'height: ' + random_num + 'px; width: ' + width + 'px; background-color: ' + colors[colorValue] + ';',

    }).appendTo('.sorting-canvas');
  }
  const newWidth = (500-Math.min.apply(Math, numArray)) + 'px';
  
  $('.sorting-canvas').css('height', newWidth);
}

function updateCanvas(newArray) {
  $('.sorting-canvas').empty();

  const width = 800/newArray.length;
  const colors = ["#3d3d3d", "#000000"]
  let colorValue = 0;

  for (let i = 0; i < newArray.length; i++) {
    colorValue += 1;
    if (colorValue === 2) {
      colorValue = 0;
    }

    $('<div>', {
      class: 'bar',
      style: 'height: ' + newArray[i] + 'px; width: ' + width + 'px; background-color: ' + colors[colorValue] + ';',

    }).appendTo('.sorting-canvas');
  }

  const newWidth = (500-Math.min.apply(Math, numArray)) + 'px';
  $('.sorting-canvas').css('height', newWidth);
}

function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

function checkSpeed() {
  let spdButtons = $("#speed-btns :input");
  if (spdButtons[1].checked) {
    speed = 0.01;
  } else {
    speed = 10;
  }
}

function checkSortingAlgo() {
  let buttons = $("#algo-btns :input");
  if (buttons[0].checked) {
    sortAlgo = 'bubblesort';
  } else if (buttons[1].checked) {
    sortAlgo = 'mergesort';
  } else if (buttons[2].checked) {
    sortAlgo = 'quicksort';
  }
}

async function bubbleSort() {
  let len = numArray.length;
  for (let i = 0; i < len; i++) { //you can also use "for in", so you don't need the variable "len"
      for (let j = 0; j < len; j++) {
          if (numArray[j] > numArray[j + 1]) {
              let tmp = numArray[j];
              numArray[j] = numArray[j + 1];
              numArray[j + 1] = tmp;
              updateCanvas(numArray);
              await delay(speed);
          }
      }
  }
}

