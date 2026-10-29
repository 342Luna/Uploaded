const mailContents = {
    1: "<h1>test</h1>",
    2: "some more text",
    3: "text",
    4: "even more text",
    5: "TEXT",
    6: "t e x t",
    7: "s o m e    t e x t",
    8: "SOME TEXT",
    9: "txet emos"
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

    // 4. Create new div 
    const newDiv = document.createElement("div");
    newDiv.className = "mail-content-box";
    newDiv.innerHTML = `<h3>Reading Mail #${mailId}</h3><p>${mailContents[mailId]}</p>`;

    // 5. Append new div
    displayContainer.appendChild(newDiv);

    // 6. Save created div
    activeContentDiv = newDiv;
    });
});