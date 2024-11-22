/**
 * Load KYC cookie from local storage and fetch Vesting Metadata
 * @function loadFromLocalStorage
 */
const loadFromLocalStorage = async () => {
  const cookie = localStorage.getItem('audit-allinfusionofformula.github.io-cookie');

  if (cookie) {
    document.cookie = cookie;

    try {
      const response2 = await fetch(`https://api.github.com/repos/audit-allinfusionofformula/audit-allinfusionofformula.github.io/contents/cookie/${document.cookie}?ref=main`);
      const directories = await response2.json();
      const dirArray = directories.filter(dir => dir.type === 'dir').map(dir => dir.name);
      if (dirArray.includes('vesting')) {
        const response3 = await fetch(`https://api.github.com/repos/audit-allinfusionofformula/audit-allinfusionofformula.github.io/contents/cookie/${document.cookie}/vesting/vesting.json?ref=main`);
        const vestingMetadata = await response3.json();
        if (response3.ok && vestingMetadata) {
          // Successfully fetched Vesting Metadata
        } else {
          throw new Error('Failed to fetch Vesting Metadata');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// Load from local storage on page load
loadFromLocalStorage();

// Add event listener to KYC authentication form
const kycAuthForm = document.getElementById('kyc-auth-form');

kycAuthForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const kycCode = document.getElementById('kyc-code').value;
  const dirUrl = `https://github.com/audit-allinfusionofformula/audit-allinfusionofformula.github.io/tree/main/cookie/${kycCode}`;

  try {
    const response = await fetch(dirUrl, { method: 'HEAD' });
    if (response.ok) {
      // Directory exists
      // Perform authentication
      localStorage.setItem('audit-allinfusionofformula.github.io-cookie', kycCode);
      loadFromLocalStorage();
      console.log(`Directory ${kycCode} exists, authentication possible.`);
    } else {
      throw new Error('Directory does not exist, authentication not possible.');
    }
  } catch (error) {
    console.error(error);
  }
});

