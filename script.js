$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    // Initial update to render the first pet
    updateActivePetDisplay();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.sleep-button').click(clickedSleepButton);

    // Event listener for switching between multiple pets
    $('.switch-pet-btn').click(function() {
      currentPetIndex = $(this).data('index');
      currentPet = pets[currentPetIndex];
      updateActivePetDisplay();
      updatePetMessage("Switched to " + currentPet.name + "!");
    });

    // Unique JQuery Methods
    // ---------------------
    // 1. .focus() method: Triggers when any button receives focus.
    $('button').focus(function() {
      $(this).css('outline', '3px solid #ffcc00');
    });

    // 2. .focusout() method: Triggers when any button loses focus.
    $('button').focusout(function() {
      $(this).css('outline', 'none');
    });
});

// Object Constructor For Multiple Pets
// ------------------------------------
function Pet(name, weight, happiness, energy, imageUrl) {
  this.name = name;
  this.weight = weight;
  this.happiness = happiness;
  this.energy = energy;
  this.imageUrl = imageUrl;

  // Method to check and prevent stats from dropping below zero
  this.validateStats = function() {
    if (this.weight < 0) {
      this.weight = 0;
    }
    if (this.happiness < 0) {
      this.happiness = 0;
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  };
}

// Ask the player for names using prompt() when the page loads
var pet1Name = prompt("What would you like to name your first pet?", "Grimoire");
var pet2Name = prompt("What would you like to name your second pet?", "Calpico");

// Fallback to default names if the player cancels or leaves them blank
if (!pet1Name) pet1Name = "Grimoire";
if (!pet2Name) pet2Name = "Calpico";

// Instantiate multiple unique pet objects using the player-provided names
var pets = [
  new Pet(pet1Name, 55, 10, 15, "hound.jpg"),
  new Pet(pet2Name, 12, 16, 10, "hound.jpg")
];

// Track the currently active pet
var currentPetIndex = 0;
var currentPet = pets[currentPetIndex];

// Update the switch buttons in the HTML so they display the custom names chosen by the player
$('.switch-pet-btn[data-index="0"]').text(pets[0].name);
$('.switch-pet-btn[data-index="1"]').text(pets[1].name);

function clickedTreatButton() {
  currentPet.happiness += 2;
  currentPet.weight += 1;
  updatePetMessage("Yum! " + currentPet.name + " loved that treat!");
  updateActivePetDisplay();
}

function clickedPlayButton() {
  // Check if the pet has enough energy to play
  if (currentPet.energy <= 0) {
    updatePetMessage(currentPet.name + " is too exhausted to play! Let them sleep first.");
    return; // Stop the function here so stats don't change
  }

  currentPet.happiness += 3;
  currentPet.weight -= 1;
  currentPet.energy -= 2;
  updatePetMessage("Woohoo! " + currentPet.name + " had a blast playing!");
  updateActivePetDisplay();
}

function clickedExerciseButton() {
  // Check if the pet has enough energy to exercise
  if (currentPet.energy <= 0) {
    updatePetMessage(currentPet.name + " has no energy left to exercise! They need a nap.");
    return; // Stop the function here so stats don't change
  }

  currentPet.happiness -= 1;
  currentPet.weight -= 2;
  currentPet.energy -= 3;
  updatePetMessage("Whew! " + currentPet.name + " worked hard!");
  updateActivePetDisplay();
}

function clickedSleepButton() {
  currentPet.energy += 5;
  currentPet.happiness += 2;
  currentPet.weight += 1;
  updatePetMessage("Zzz... " + currentPet.name + " had a great nap!");
  updateActivePetDisplay();
}

function updatePetMessage(message) {
  $('.pet-message').text('"' + message + '"');
}

function updateActivePetDisplay() {
  // Ensure stats don't drop below zero
  currentPet.validateStats();

  // Update HTML elements with currentPet properties
  $('.name').text(currentPet.name);
  $('.weight').text(currentPet.weight);
  $('.happiness').text(currentPet.happiness);
  $('.energy').text(currentPet.energy);
  $('.pet-image').attr('src', currentPet.imageUrl);
}