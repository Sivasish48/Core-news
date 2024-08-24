var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var NEWS_API_KEY = "cfda5e5851744b18a111432e1a5564c9";
var newsUrl = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", function () { return fetchNews("India"); });
function fetchNews(query) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(newsUrl).concat(query, "&apiKey=").concat(NEWS_API_KEY))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    bindData(data.articles);
                    return [2 /*return*/];
            }
        });
    });
}
function bindData(articles) {
    var cardsContainer = document.getElementById("cards-container");
    var newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    articles.forEach(function (article) {
        if (!article.urlToImage) {
            article.urlToImage = 'https://via.placeholder.com/400x200';
        }
        var cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    var _a;
    var newsImg = cardClone.querySelector("#news-img");
    var newsTitle = cardClone.querySelector("#news-title");
    var newsSource = cardClone.querySelector("#news-source");
    var newsDesc = cardClone.querySelector("#news-desc");
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description || "No description available.";
    var date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = "".concat(article.source.name, " \u00B7 ").concat(date);
    (_a = cardClone.firstElementChild) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        window.open(article.url, "_blank");
    });
}
var curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    var navItem = document.getElementById(id);
    curSelectedNav === null || curSelectedNav === void 0 ? void 0 : curSelectedNav.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
var searchButton = document.getElementById("search-button");
var searchText = document.getElementById("search-text");
searchButton.addEventListener("click", function () {
    var query = searchText.value;
    if (!query)
        return;
    fetchNews(query);
    curSelectedNav === null || curSelectedNav === void 0 ? void 0 : curSelectedNav.classList.remove("active");
    curSelectedNav = null;
});
document.querySelectorAll(".nav-link").forEach(function (navItem) {
    navItem.addEventListener("click", function (event) {
        var id = event.target.id;
        onNavItemClick(id);
    });
});
