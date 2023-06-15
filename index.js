const APIKEY="4aa7429afa8f4fb0a10d3cfbf78c1a9b";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(topic){
        const res= await fetch(`${url}${topic}&apiKey=${APIKEY}`);
        const data = await res.json();
        binddata(data.articles);
}
 function binddata(articles){
    const cardcontainer=document.getElementById('card-container');
    const cardtemplate=document.getElementById('template-card');
    cardcontainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=cardtemplate.content.cloneNode(true);
        filldataincard(cardclone, article);
        cardcontainer.appendChild(cardclone);
    });
 }
function reload(){
    window.location.reload();
}

 function filldataincard(cardclone,article){
    const newsimg=cardclone.querySelector('#news-image');
    const newstitle=cardclone.querySelector('#newstitle');
    const newscontent=cardclone.querySelector('#news-content');
    const newsource=cardclone.querySelector('#news-source');    
    console.log(article);
    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newscontent.innerHTML=article.description;
    newsource.innerHTML=`${article.source.name}`;

    cardclone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url,"-blank");
    });

}
let selectedcur=null;
function navitemclicked(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    selectedcur?.classList.remove('active');
    selectedcur=navitem;
    selectedcur.classList.add('active');

}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    selectedcur?.classList.remove('active');
    selectedcur=null;
});