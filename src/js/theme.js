const themeBtn = document.querySelector('#theme-toggle');
const body = document.body;


const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  body.classList.add('light-mode');
}


themeBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});