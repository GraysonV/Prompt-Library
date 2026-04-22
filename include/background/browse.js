const container = document.getElementById('prompts-display');
const subjectSelect = document.getElementById('input-subject');
const orderSelect = document.getElementById('input-order');
// const buttonPrompts = document.getElementById('button-prompts');
const SCROLL_BOTTOM_OFFSET = -50;
const limit = 10;
const limitLarge = 30;
let startAfter = "";
let finished = false;
let scrollPaused = true;

let params = new URLSearchParams(document.location.search);
let searchQuery = params.get("q"); // Is the search query
let subjectQuery = params.get("s"); // Is the subject query
let orderQuery = params.get("o"); // Asc/Desc query
if (subjectQuery != null) {
    subjectSelect.value = subjectQuery;
}
if (orderQuery == null) {
    orderQuery = "desc";
} else {
    orderSelect.value = orderQuery;
}
console.log(orderQuery);

// Load prompts, returns true or false if it loads them.
async function loadPrompts() {
    
    let newContainer = document.createElement("div");
    newContainer.innerHTML = '<p>Loading...</p>';
    container.appendChild(newContainer);
    // buttonPrompts.hidden = true;
    scrollPaused = true;

    try {
        let snapshot;
        let isSubjectQuery = (subjectQuery != null && subjectQuery != "all")

        if (isSubjectQuery) {
            snapshot = 
                await db.collection('prompts')
                .where('subject', "==", subjectQuery)
                .limit(limitLarge)
                .get();
        } else {
            // TODO: Replace "timestamp" string with a number that actually represents the time
            // it was uploaded so I can order it properly.
            snapshot = 
                await db.collection('prompts')
                .orderBy('timestamp', 'desc')
                .startAfter(startAfter)
                .limit(limit)
                .get();
        }
        newContainer.innerHTML = '';
        // buttonPrompts.hidden = true;

        snapshot.forEach(doc => {
            const data = doc.data();
            addCard(data, newContainer);
            // The assignments keep overriding until the last timestamp in the list
            // which is then used for loading the next set of prompts.
            startAfter = data.timestamp;
        });

        if (snapshot.empty || snapshot.size < limit || isSubjectQuery) {
            newContainer.innerHTML += '<hr><p>No more prompts. How sad!</p> <p><small><a href="#">Top of the Page &uArr;</a></small></p>';
            // Button Prompt stays hidden
            return false;
        } else {
            // buttonPrompts.hidden = false;
        }
    } catch (e) {
        newContainer.innerHTML = 'Error loading. Check Firestore.';
        return false;
    }
    scrollPaused = false;
    return true;
}

function addCard(data, container) {
    const card = document.createElement('div');
    let subject = "None";
    if (data.subject != null) {
        subject = beautifySubject(data.subject);
    }
    card.className = 'prompt-card';
    card.innerHTML = `
        <div class="prompt-title"><h3>${escapeHtml(data.title)}</h3></div>
        <div class="prompt-content"><p>${escapeHtml(data.content)}</p></div>
        <div class="prompt-meta"><p><small>${subject} - ${data.author} - ${data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'now'}</small></p></div>
    `;
    container.appendChild(card);
}

finished != loadPrompts();

addEventListener("scroll", function() {
    if (!finished && !scrollPaused) {
        // console.log(pageYOffset + window.innerHeight >= document.body.scrollHeight + SCROLL_BOTTOM_OFFSET);
        if (pageYOffset + window.innerHeight >= document.body.scrollHeight + SCROLL_BOTTOM_OFFSET) {
            finished != loadPrompts();
        }
    }
});

subjectSelect.onchange = (event) => {
    var inputText = event.target.value;

    let url = window.location.href.split("?")[0];
    url += '?s=' + inputText;

    if (searchQuery != null){
        url += '&q=' + searchQuery;
    }
    if (orderQuery != null){
        url += '&o=' + orderQuery;
    }

    window.location.href = url;

    console.log(inputText);
}

orderSelect.onchange = (event) => {
    var inputText = event.target.value;

    let url = window.location.href.split("?")[0];
    url += '?o=' + inputText;

    if (searchQuery != null){
        url += '&q=' + searchQuery;
    }
    if (subjectQuery != null){
        url += '&s=' + subjectQuery;
    }

    window.location.href = url;

    console.log(inputText);
}