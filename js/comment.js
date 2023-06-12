// clear comment section input

const commentCancel = document.querySelector("#comment-cancel"),
    commentInput = document.querySelector(".comment-input"),
    commentPublish = document.querySelector("#comment-publish"),
    comments = document.querySelector("#comments"),
    commentCounter = document.querySelector("#comment-counter");

// cancel button clears the input when clicked
commentCancel.addEventListener("click", (e) => {
    e.preventDefault();
    clearInput(commentInput);
});

// variable used to count the amount of comments have been entered
let cCounter = Number(commentCounter.innerText) + 1;

// appends a comment(div) within the comments(div)
commentPublish.addEventListener("click", (e) => {
    e.preventDefault();

    // The innerHTMl of the div contains the necessary information which will be stored in the newComment(div)
    const newComment = document.createElement("div");
    newComment.innerHTML = `<div class="[ comment-user ]"> <img src="../assets/user/IMG_4270.jpg" alt="" class="[ comment-image ]" /><div>Admin</div></div><p>${commentInput.value}</p>`;
    comments.append(newComment);

    setInterval(clearInput(commentInput), 200);

    // the commentCounter increments by 1 after each comment
    commentCounter.innerText = cCounter;
    cCounter++;
});

// takes an input element and clears the value
function clearInput(form) {
    form.value = "";
}
