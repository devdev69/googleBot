// ==UserScript==
// @name         gb1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://learn.javascript.ru/*
//@match         https://ru.wikipedia.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function getCookie(name) {  //фунция для получения куки
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
let sites = {  //обьект искомых сайтов и ключевых слов для поиска
    "learn.javascript.ru" : ["javascript","learn js","react"],
    "ru.wikipedia.org" : ["js", "es6", "javascript"]
};
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)]; //рандомный выбор ключа из обьекта sites
let input = document.getElementsByName('q')[0];  //инпут на главной странице поиска гугла
let searchBtn = document.getElementsByName('btnK')[1];  //кнопка начала поиска
let keywords = sites[site]; // ключевые слова для поиска из объекта sites
let keyword = keywords[Math.floor(Math.random()*keywords.length)]; //рандомный выбор ключевого слова

if(searchBtn != undefined){  //если мы на главной странице гугла...
    document.cookie = "site="+site; //запоминаем искомый сайт в куки
    input.value = keyword;  //вводим ключевое слово в инпут
    searchBtn.click(); //нажимаем кнопку поиска
}else if(location.hostname === "www.google.com"){ //если мы на странице поиска
    let site = getCookie("site");  //пишем искомый сайт из куки в переменную для дальнейшего сравнения с найденными ссылками
    let links = document.links; //сохраняем все ссылки на странице в переменную
    let nextPage = true;  //значение, необходимое для перехода на следующую страницу поиска в дальнейшем, если необходимо
    let currentPage = document.getElementsByClassName('YyVfkd')[0].innerText;  //номер текущей страницы в поиске
    for(let i=0;i<links.length;i++){ //цикл для перебора всех найденных ссылок и поиска в них искомого сайта
        let link = links[i];
        if(link.href.indexOf(site) != -1){  //если нужный сайт присутствует
            link.click();  //кликаем по нему
            nextPage = false; //переход на следующую страницу не требуется
            break; //останавливаем цикл
        }
    }
    if(currentPage > 2) location.href = "https://www.google.com/"; //если мы ушли слишком далеко в поиске, то возвращаемся на главную страницу поиска
    else if(nextPage) pnnext.click();  //если искомая ссылка на сайт не найденна, то это значение true и мы переходим на следующую страницу поиска
}else{  //если мы перешли на нужный сайт
    setInterval(()=>{  //поставим таймер на на рандомное нажатие ссылок
        let links = document.links;  //собираем ссылки со страницы в переменную
        let randomIndex = Math.floor(Math.random()*links.length);  //переменная для рандомного выбора индекса из массива
        let link = links[randomIndex];  //рандомная ссылка
        if(link.href.includes(location.hostname)){ //если ссылка уведёт бота на другой сайт, то он пересанет работать, по этому для начала проверяем ведёт ли ссылка на другой сайт и если она ведёт только на другую страницу сайта
            link.click();  //то кликаем по ней
        }
    },300);  //данный код вызывается каждые 300 миллисекунд
    if(Math.random()>0.8){location.href = "https://www.google.com/"}  //с вероятностью 20% переходти на главную страницу поиска
}
