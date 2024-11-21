function createClickListener(selector) {
  return function(handler) {
    const buttons = document.querySelectorAll(selector);
    if (buttons.length > 0) {
      buttons.forEach(button => {
        button.addEventListener('click', handler);
      });
    } else {
      console.error(`No buttons found with selector: ${selector}`);
    }
  };
}

// Usage example
const container = document.querySelector('.container-quest-few-shot');
const taskItems = container.querySelectorAll('.task-card');

createClickListener('.btn')(event => {
  const taskItem = event.target.closest('.task-card');

  // Perform client-side function based on the clicked task item
  if (taskItem) {
    const title = taskItem.querySelector('h2').textContent;
    console.log(`Clicked task: ${title}`);

    // Example: Add a class to the clicked task item
    const button = taskItem.querySelector('.btn');
    if (button) {
      button.classList.add('clicked');
    }

    // Example: Get the href attribute of the button
    const href = event.target.getAttribute('href');
    console.log(`Button href: ${href}`);

    // Example: Get the badges of the task item
    const badges = taskItem.querySelectorAll('.badge');
    const badgeTexts = Array.from(badges).map(badge => badge.textContent);
    console.log(`Task badges: ${badgeTexts.join(', ')}`);

    // Example: Get the description of the task item
    const description = taskItem.querySelector('p').textContent;
    console.log(`Task description: ${description}`);

    // Example: Perform additional actions based on the task item
    if (title === 'Launch Partner Airdrop (NebX)') {
      // Perform specific actions for this task
      console.log('Performing specific actions for the partner airdrop task');
    }

  }
});