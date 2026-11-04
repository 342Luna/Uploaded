// data for uploading
const mailData = {
  // today
  1: { subject: "New game alert!", body: 'Hey adventurer! Tired of the same old games? UPLOADED is a great new experience! <hr> UPLOADED is made to give you a truly UNFORGETTABLE experience. This game will drag you with it! The story is great and it\'s almost like you are truly there! there are fun bosses and cool powerups! You can customize your avatar and even learn some while playing the game!<br><br> ★★★★★ “The best game I\'ve EVER played!”<br>— Alex R. | Verified Player<br>UPLOADED is an absolutely incredible experience! The story is so immersive that it feels like you\'re actually part of the game. The boss fights are exciting, the power-ups are amazing, and the character customization is surprisingly detailed!<br>I even learned a few things while playing! I can\'t recommend this game enough. Everyone should download it immediately!<br>10/10 — Best decision of my life.<br><br>It\'s available NOW!👉 <a href="downloadingScreen/loadingscreen.html">click here</a> to start your adventure!<br><br>Don\'t miss out. Your journey is waiting.<br><br><i>Downloaded, installed, and reviewed by yourGameDownloader.</i>'},
  2: { subject: "sorry", body: "Hey emm I would like to apoligies for what I said earlier in a mail<br><br>My mom found out and she put me on house arrest untill I say sorry<br><br>so sorry I tried to blackmail you, please forgive me!<br><br>Sincerely<br>Jerry Mason (formerly secret anonymous hackerman)<br><br><i>@anonymous</i>"},
  3: { subject: "Security alert for your repository", body: "We detected a potential issue in your latest commit... <br><br><a href='eastereggs/github.com.html'>SOLVE</a><br><br><i>@GitHub</i>" },
  4: { subject: "Project Update & Notes", body: "Hey, I took a look at the layout changes and they look great! You might wanna fine tune them tho..? Still more then enough time to do so! Good luck :D<br><br>Cheers!<br><br> <i>@Jhomes Caspers</i>" },
  // yesterday
  5: { subject: "YOU WON THE LOTTERY 🎉🎉🎉🎉", body: "CONGRATULATIONS 🎉🎉🎉🎉🎉🎉🎉🎉!<br>YOU WON THE LOTTERY 💰💰💰💰💰💰💰💰 !!!<br><br>CLICK THIS LINK TO CLAIM YOUR PRIZE!!!<br>VVVVVVVVVVVVVVVVVVVVVVVVVVVVV<br><br><a href='eastereggs/alternateIntro.html'>http://claim_you_money.com/winners/<a><br>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br><br>AND FOLLOW THESE 3 SIMPLE STEPS:<br><br>1. FILL IN YOUR FULL LEGAL NAME<br>2. FILL IN YOUR CREDIT CARD INFORMATION<br>3. CLAIM YOUR MONEY BY FILLING IN YOUR PIN CODe!<br><br>WE HopE YOU ENJOY OUR SERVICES!!!!<br><br><i>@FREE_MONEY.MONEY</i>"},
  6: { subject: "Dog", body: "woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof foow woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof miaw woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof meeeehhh woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof 192.221.150.42 woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof <br><br> - most sincerely: <br>Woof McWoof."},
  7: { subject: "Your ticket #4029 has been updated", body: "Thank you for reaching out. We have resolved the issue.<br><br><i>@Support Team</i>" },
  // older
  8: { subject: "Top Tech Stories This Week", body: "Here is your weekly round-up of the best developer news.<br><br><a href='eastereggs/NewsPaper.html'>Discover HERE</a><br><br><i>@Support Team</i>" },
  9: { subject: "Your Cars warrenty", body: "Hello,<br>We would like to talk to you about your car\'s extended warrenty.<br><br>We have GREAT deals for YOU ��️ SPECIFICALLY, ranging from OVERPRICED to EVEN MORE OVERPRICED.<br><br>We offer the following services:<br>- insurance fraud (€ 2000)<br>- warrenty extension (2 years, €400000)<br>- warrenty prevention(1) (3-4 buisnessdays, €4000)<br><br>(1)<br>Warrenty preventiontm works on the basis that we can make your car manufacturer go bankrupt (say,by blowing up their headquarters), so that you cannot claim your warrenty anymore.*<br><br><small>*If you claim your warrenty BEFORE we make the company go bankrupt, the contract between us will be terminated and you will be liable for ALL of the damages done to the company we tried to destroy.</small>"},
  10: { subject: "More cute cat ideas for you! ᓚᘏᗢ", body: "<img src='Pictures/cat7.jpg'><img src='Pictures/cat1.jpg'><img src='Pictures/cat2.jpg'><img src='Pictures/cat3.jpg'><img src='Pictures/cat4.jpg'><img src='Pictures/cat5.jpg'><img src='Pictures/cat6.jpg'><br><br><i>@Pinter@st</i>" },
  11: { subject: "Please bring back your book", body: "It's been a year since the deadline. A year. PLEASE BRING BACK THE BOOK WE DO NOT KNOW HOW TO GET IT BACK AND WE WANT IT BACK. <br><br> Best regards, Your Library <br><br><i>@Your Library</i>" },
  12: { subject: "Anniversary", body: "Tommorow it will be a year since the deadline. Should we celebrate? No seriously, if you bring back that book by tommorow, you won\'t have to pay the penalty for the book. Even better.. WE will pay YOU 5 WHOLE DOLLARS of you bring it back.<br><br> Best regards, Your Library <br><br><i>@Your Library</i>" },
  13: { subject: "Read me.", body: ""},
  14: { subject: "CLEAN YOUR ROOM", body: "You still haven't cleaned your room. It's a mess. Clean it now before something will start rotting in there." },
  15: { subject: "Funny mail ideas", bode: "Hi. I've send you the funny 3mail ideas through t3ams! Spelling mistakes are made on purpose 👍<br><br><i>@Jhomes Caspers</i>"}
};

// generate mailContents
const mailContents = {};

for (const [id, data] of Object.entries(mailData)) {
  mailContents[id] = `
    <div class="headerMail">
      <h1>${data.subject}</h1>
    </div>
    <div class="bodyMail">
      <p>${data.body}</p>
    </div>
  `.trim();
}

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