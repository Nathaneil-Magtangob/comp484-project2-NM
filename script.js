$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Initial update to render the first pet
    updateActivePetDisplay();
  
    // Event listeners for action buttons
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

    // ==========================================
    // UNIQUE JQUERY METHODS DEMONSTRATION
    // ==========================================
    
    // 1. .focus() method: Triggers when any button receives focus.
    $('button').focus(function() {
      $(this).css('outline', '3px solid #ffcc00');
    });

    // 2. .focusout() method: Triggers when any button loses focus.
    $('button').focusout(function() {
      $(this).css('outline', 'none');
    });
});

// ==========================================
// OBJECT CONSTRUCTOR FOR MULTIPLE PETS
// ==========================================
function Pet(name, weight, happiness, energy, imageUrl) {
  this.name = name;
  this.weight = weight;
  this.happiness = happiness;
  this.energy = energy;
  this.imageUrl = imageUrl;

  // Method to check and prevent stats from dropping below zero
  this.validateStats = function() {
    if (this.weight < 0) this.weight = 0;
    if (this.happiness < 0) this.happiness = 0;
    if (this.energy < 0) this.energy = 0;
  };
}

// Instantiate multiple unique pet objects using the constructor
var pets = [
  new Pet("Rover", 12, 10, 8, "https://images.unsplash.com/photo-1543466835-00a7907e9de1"),
  new Pet("Luna", 9, 14, 15, "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8")
];

// Track the currently active pet
var currentPetIndex = 0;
var currentPet = pets[currentPetIndex];

function clickedTreatButton() {
  currentPet.happiness += 2;
  currentPet.weight += 1;
  updatePetMessage("Yum! " + currentPet.name + " loved that treat!");
  updateActivePetDisplay();
}

function clickedPlayButton() {
  currentPet.happiness += 3;
  currentPet.weight -= 1;
  currentPet.energy -= 2;
  updatePetMessage("Woohoo! " + currentPet.name + " had a blast playing!");
  updateActivePetDisplay();
}

function clickedExerciseButton() {
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