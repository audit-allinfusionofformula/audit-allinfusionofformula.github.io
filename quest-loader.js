/**
 * Load JSON files from the cache directory and render them as task cards.
 *
 * @const {string} cacheDir - The directory containing the JSON files.
 * @const {Element} taskContainer - The container element to render the task cards.
 */
const cacheDir = 'cache/';
const taskContainer = document.querySelector('.quest-few-shot');

/**
 * Get a list of files in the cache directory and fetch their contents.
 *
 * @const {string} repoUrl - The URL of the GitHub repository.
 * @const {string[]} fileNames - The names of the JSON files.
 * @const {Promise<any>[]} filePromises - The promises for the file contents.
 */
const files = [];
const repoUrl = 'https://api.github.com/repos/audit-allinfusionofformula/audit-allinfusionofformula.github.io/contents/cache';

fetch(repoUrl)
  .then(response => response.json())
  .then(data => {
    const fileNames = data
      .filter(file => file.type === 'file' && file.name.endsWith('.json'))
      .map(file => file.name)
      .filter(fileName => fileName !== 'quest-1-shot.json');

    const filePromises = fileNames.map(fileName => {
      const fileUrl = `https://raw.githubusercontent.com/audit-allinfusionofformula/audit-allinfusionofformula.github.io/main/cache/${fileName}`;
      return fetch(fileUrl).then(response => response.json());
    });

    /**
     * Render the task cards when all the promises are resolved.
     *
     * @param {any[]} fileDataArray - The array of file contents.
     */
    Promise.all(filePromises).then(fileDataArray => {
      fileDataArray.forEach(fileData => {
        const fileName = `audit-allinfusionofformula-quests-${fileData.title}`;
        const localStorageItem = localStorage.getItem(fileName);
        if (localStorageItem) {
          const savedTimestamp = parseInt(localStorageItem, 10);
          const currentTime = Date.now();
          const savedDate = new Date(savedTimestamp);
          const currentDate = new Date();
          if (Math.abs(currentTime - savedTimestamp) > 5 * 60 * 60 * 1000 &&
              (savedDate.getDate() !== currentDate.getDate() ||
              savedDate.getMonth() !== currentDate.getMonth() ||
              savedDate.getFullYear() !== currentDate.getFullYear())) {
            localStorage.removeItem(fileName);
          } else {
            return;
          }
        }
        const taskHtml = `
          <div class="task-card">
            <h2>${fileData.title}</h2>
            <p>${fileData.description}</p>
            <div class="badges">
              ${fileData.badges.map(badge => `<span class="badge badge-${badge.type}">${badge.text}</span>`).join('')}
            </div>
            <button class="btn" onclick="${fileData.button.onclick}" hidden>${fileData.button.text}</button>
          </div>
        `;
        taskContainer.insertAdjacentHTML('beforeend', taskHtml);
      });
    });
  });
