/*Задание 1
1. Поиск в интернете (бесплатные api примеры).
2. Найти любые данные, на произвольную тему.
3. Создать файл data.js.
4. Создать переменную которая будет хранить данные из публичных api.

Задание 2
1. Создать файл index.html.
2. Подключить data.js.
3. Сформировать контент из данных (картинка загловок и параграф).
4. Добавить данный контент в вёрстку.
5. * Добавить стили при необходимости (по желанию).
*/

const articles_url = `https://newsapi.org/v2/everything?q=Москва&from=2023-02-08&sortBy=publishedAt&apiKey=8044676db32f4f36a582fc8df27766e8`


function newsElement (result)  {
   if (!result || !result.articles) {
      return;
   }
   const centerEl = document.querySelector('.center');
   centerEl.innerHTML = '';
   result.articles.forEach(article => {
   const articleEl = document.createElement('div');
   articleEl.classList.add('center__box');
   const h3El = document.createElement('h3');
   h3El.classList.add('center__heading');
   h3El.textContent = article.author;
   articleEl.append(h3El);
   const pEl = document.createElement('p');
   pEl.classList.add('p__center');
   pEl.textContent = article.description;
   articleEl.append(pEl);
   const imgEl = document.createElement('img');
   imgEl.src = article.urlToImage;
   imgEl.alt = 'photo';
   articleEl.append(imgEl);
   const linkEl = document.createElement('a');
   linkEl.classList.add('center__link')
   linkEl.href = article.url;
   linkEl.textContent = 'Ссылка на источник';
   articleEl.append(linkEl);
   centerEl.appendChild(articleEl);
   });   
};

const toggleLoader = ()=> {
   const loaderHTML = document.querySelector('#loader');
   const isHidden = loaderHTML.hasAttribute('hidden');
   if(isHidden) {
      loaderHTML.removeAttribute('hidden');
   } else {
      loaderHTML.setAttribute('hidden', '');
   }
};

const getAllNews = () => {
   const news = fetch(articles_url, {
      method: 'GET'}
   )
   news
      .then((response) => {
         if (!response.ok) {
            throw new Error('Ошибка запроса!');
         }
         return response.json();
      })
      .then((result) => {
         newsElement(result);
      })
      .catch((error) => {
         console.log('error', error);
      })
      .finally(()=> {
         toggleLoader();
      })
}
getAllNews();

