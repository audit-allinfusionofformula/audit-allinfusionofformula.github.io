// Get the parent element that contains all of the task cards
const taskCardContainer = document.querySelector('.quest-few-shot');

// Add an event listener to the parent element
taskCardContainer.addEventListener('touchstart', (event) => {
  // Check if the clicked element is a task card
  if (event.target.classList.contains('task-card')) {
    // Get the button element within the task card
    const button = event.target.querySelector('button');

    // Trigger the click event on the button
    //button.click();
    //saveTaskDescriptionOnClick(event);
    button.removeAttribute('hidden');
  }
}, { passive: true });

taskCardContainer.addEventListener('click', (event) => {
  // Check if the clicked element is a task card
  if (event.target.classList.contains('task-card')) {
    // Get the button element within the task card
    const button = event.target.querySelector('button');

    // Trigger the click event on the button
    button.click();
    saveTaskDescriptionOnClick(event);
  }
});

/**
 * Save task card description to local storage when the button is clicked.
 * @param {Event} event - The event object.
 */
function saveTaskDescriptionOnClick(event) {
  const taskCard = event.target.closest('.task-card') || event.currentTarget.closest('.task-card');
  
  if (taskCard) {
    taskCard.style.display = 'none';
    const description = taskCard.querySelector('p').textContent;
    const timestamp = Date.now();
    const fileName = `audit-allinfusionofformula-quests-${description}`;
    localStorage.setItem(fileName, timestamp);
  }
}
