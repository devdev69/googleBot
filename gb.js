// ==UserScript==
// @name         gb1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://learn.javascript.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let input = document.getElementsByName('q')[0];
let searchBtn = document.getElementsByName('btnK')[1];
let keywords = ['javascript','makita screw gun','learn js','iphone 13','react','hilti dx 76'];
let keyword = keywords[Math.floor(Math.random()*keywords.length)];

if(searchBtn != undefined){
    input.value = keyword;
    searchBtn.click();
}else if(location.hostname === "www.google.com"){
    let links = document.links;
    let nextPage = true;
    let currentPage = document.getElementsByClassName('YyVfkd')[0].innerText;
    for(let i=0;i<links.length;i++){
        let link = links[i];
        if(link.href.indexOf('learn.javascript.ru') != -1){
            link.click();
            nextPage = false;
            break;
        }
    }
    if(currentPage > 2) location.href = "https://www.google.com/";
    else if(nextPage) pnnext.click();
}else{
    setInterval(()=>{
        let links = document.links;
        let randomIndex = Math.floor(Math.random()*links.length);
        let link = links[randomIndex];
        if(link.href.includes("https://learn.javascript.ru")){
            link.click();
        }
    },300);
    if(Math.random()>0.8){location.href = "https://www.google.com/"}
}
