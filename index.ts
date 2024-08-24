const NEWS_API_KEY: string = "cfda5e5851744b18a111432e1a5564c9";
const newsUrl: string = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query: string): Promise<void> {
    const res: Response = await fetch(`${newsUrl}${query}&apiKey=${NEWS_API_KEY}`);
    const data: { articles: Article[] } = await res.json();
    bindData(data.articles);
}

interface Article {
    urlToImage: string | null;
    title: string;
    source: { name: string };
    description: string | null;
    publishedAt: string;
    url: string;
}

function bindData(articles: Article[]): void {
    const cardsContainer = document.getElementById("cards-container") as HTMLElement;
    const newsCardTemplate = document.getElementById("template-news-card") as HTMLTemplateElement;

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) {
            article.urlToImage = 'https://via.placeholder.com/400x200';
        }
        const cardClone = newsCardTemplate.content.cloneNode(true) as DocumentFragment;
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone: DocumentFragment, article: Article): void {
    const newsImg = cardClone.querySelector("#news-img") as HTMLImageElement;
    const newsTitle = cardClone.querySelector("#news-title") as HTMLElement;
    const newsSource = cardClone.querySelector("#news-source") as HTMLElement;
    const newsDesc = cardClone.querySelector("#news-desc") as HTMLElement;

    newsImg.src = article.urlToImage!;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description || "No description available.";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild?.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav: HTMLElement | null = null;

function onNavItemClick(id: string): void {
    fetchNews(id);
    const navItem = document.getElementById(id) as HTMLElement;
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button") as HTMLElement;
const searchText = document.getElementById("search-text") as HTMLInputElement;

searchButton.addEventListener("click", () => {
    const query: string = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

document.querySelectorAll(".nav-link").forEach((navItem) => {
    navItem.addEventListener("click", (event: Event) => {
        const id = (event.target as HTMLElement).id;
        onNavItemClick(id);
    });
});
