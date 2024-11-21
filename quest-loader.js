const cacheDir = 'cache/';
const taskContainer = document.querySelector('.container-quest-few-shot');

// Get a list of files in the cache directory
const files = [];
const xhr = new XMLHttpRequest();
xhr.open('GET', cacheDir, true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const fileNames = xhr.responseText.split('\n');
    fileNames.forEach(fileName => {
      if (fileName.endsWith('.json') && fileName !== 'quest-1-shot.json') {
        files.push(fileName);
      }
    });
  }
};

xhr.send();

// Load each task file and append it to the container
files.forEach(file => {
  const filePath = cacheDir + file;
  fetch(filePath)
    .then(response => response.json())
    .then(taskData => {
      const taskHtml = `
        <div class="task-card">
          <h2>${taskData.title}</h2>
          <p>${taskData.description}</p>
          <div class="badges">
            ${taskData.badges.map(badge => `<span class="badge ${badge.type}">${badge.text}</span>`).join('')}
          </div>
          <button class="btn" onclick="${taskData.button.onclick}">${taskData.button.text}</button>
        </div>
      `;
      taskContainer.insertAdjacentHTML('beforeend', taskHtml);
    })
    .catch(error => console.error('Error loading task file:', error));
});