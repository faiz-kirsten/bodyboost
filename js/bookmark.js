// Bookmarking system
let blogs = [];

// This function executes immediately when the page loads to check whether the user bookmarked any articles before.
function myLoad() {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem("allBlogs", JSON.stringify(blogs));
        localStorage.setItem("hasCodeRunBefore", true);
    } else {
        // The book array containing the book objects is retrieved - the same logic applies for duplicate code.
        blogs = JSON.parse(localStorage.getItem("allBlogs"));
        let i = 0;

        // Each blog(object) is displayed as a card(div) in the bookmarks page.
        blogs.forEach((b) => {
            const article = document.createElement("div"),
                bookmarkedArticles = document.querySelector(
                    "#bookmarked-articles"
                );
            i++;
            // The innerHTML of the div contains each property of the object.
            article.innerHTML = `<div class="card"><div class="card-info"> <div> <span class="card-date">${b.date}</span> </div> <a href=${b.url} class="card-info-link"> <p class="card-title">${b.title}</p><p class="card-description">${b.description} </p> </a href="" ></div></div>`;

            // A new div is appending to the 'bookmarkedArticles' element(div).
            bookmarkedArticles.append(article);
        });

        // if there are no bookmarks a message is displayed.
        if (i <= 0) {
            const bookmarkedArticles = document.querySelector(
                    "#bookmarked-articles"
                ),
                noBookmarks = document.createElement("p");

            noBookmarks.innerHTML = `You have no bookmarks. Visit my <a href="blog.html" class="card-info-link"> blog page.</a>`;

            // This only executes after a certain interval to prevent errors.
            setInterval(() => {
                bookmarkedArticles.append(noBookmarks);
            }, 200);
        }
    }
}

// article object constructor
class Article {
    constructor(title, date, description, url) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.url = url;
    }
}

// Bookmarking an article
document
    .querySelector(".main-content-article")
    .addEventListener("click", function (e) {
        // The following variables contain the content of specific elements of which I will be using as parameters in my Article class.
        blogs = JSON.parse(localStorage.getItem("allBlogs"));

        const target = e.target,
            title = target.parentElement.nextElementSibling.innerText,
            date = target.parentElement.firstElementChild.innerText,
            description =
                target.parentElement.nextElementSibling.nextElementSibling
                    .childNodes[3].innerText,
            concatDescription = `${description.substring(
                0,
                Math.min(description.length, 75)
            )}...`,
            articleUrl = window.location.pathname,
            newArticle = new Article(
                title,
                date,
                concatDescription,
                articleUrl
            );

        // adds or removes the filter which indicates whether it is bookmarked or not.
        if (target.matches(".bookmark-icon")) {
            // checks whether the element has the specified class and either adds or removes it.
            if (target.classList.contains("filter-secondary-600")) {
                target.classList.remove("filter-secondary-600");

                // iterates throught the blog array and checks whether the title parameter is the same as the title retrieved from the
                // blog article and then removes it using the splice method.
                for (b of blogs) {
                    if (b.title == title) {
                        blogs.splice(blogs.indexOf(b), 1);
                        break;
                    }
                }
            } else {
                target.classList.add("filter-secondary-600");
                // adds the new article to the blogs array.
                blogs.push(newArticle);

                // an alert pops up showing the user how many bookmarks they have and asks whether they want to visit
                // the bookmarks page.
                if (
                    window.confirm(
                        `You have ${blogs.length} bookmarked articles. Would you like to view all your bookmarks?`
                    )
                ) {
                    // if the user clicks yes they are redirected to the bookmarks page.
                    window.location.href = "../html/bookmarks.html";
                }
            }
        }

        localStorage.setItem("allBlogs", JSON.stringify(blogs));
    });

// This function is used to check whether the article the user is currently visiting has been bookmarked previously
function checkBookmarkedOnLoad() {
    blogs = JSON.parse(localStorage.getItem("allBlogs"));
    const bookmarkIcon = document.querySelector(".bookmark-icon"),
        title = document.querySelector(".article-title");

    // the blog is iterated through and if the title of the current article matches the title parameter
    // of b(object) then the bookmarkIcon will get the necessary styling
    for (b of blogs) {
        if (b.title == title.innerText) {
            bookmarkIcon.classList.add("filter-secondary-600");
            break;
        }
    }
}
