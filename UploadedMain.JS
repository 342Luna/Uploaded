const mailContents = {
    1: "<div class ='headerMail'><h1>New game alert!</h1><div>",
    2: "<div class ='headerMail'><h1>Security alert for your repository</h1><div>",
    3: "<div class ='headerMail'><h1>Project Update & Notes</h1><div>",
    4: "<div class ='headerMail'><h1>Your ticket #4029 has been updated</h1><div>",
    5: "<div class ='headerMail'><h1>Top Tech Stories This Week</h1><div>",
    6: "<div class ='headerMail'><h1>More cute cat ideas for you! ᓚᘏᗢ</h1><div>",
    7: "<div class ='headerMail'><h1>Please bring back your book</h1><div>",
    8: "<div class ='headerMail'><h1>Anniversary</h1><div>",
    9: "<div class ='headerMail'><h1>CLEAN YOUR ROOM</h1><div>"
};

const mailItems = document.querySelectorAll(".mailItem");
const displayContainer = document.getElementById("mailView");

let activeContentDiv = null;

mailItems.forEach(item => {
    item.addEventListener("click", function() {
    
    // 1. read when clicked (removes 'unread')
    if (this.classList.contains("unread")) {
        this.classList.remove("unread");
    }

    // 2. Delete previously opened if exists
    if (activeContentDiv) {
        activeContentDiv.remove();
    }

    // 3. Get ID of mail from 'data-mail-id'
    const mailId = this.getAttribute("data-mail-id");
    const readerMailId = this.getAttribute("reader-mail-id");

    // 4. Create new div 
    const newDiv = document.createElement("div");
    newDiv.className = "mail-content-box";
    newDiv.innerHTML = `<h3>Reading Mail From @${readerMailId}</h3><p>${mailContents[mailId]}</p>`;

    // 5. Append new div
    displayContainer.appendChild(newDiv);

    // 6. Save created div
    activeContentDiv = newDiv;
    });
});