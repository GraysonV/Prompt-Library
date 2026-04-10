const container = document.getElementById('prompts-display');
// const buttonPrompts = document.getElementById('button-prompts');
const SCROLL_BOTTOM_OFFSET = -50
const limit = 10;
let startAfter = "";
let finished = false;
let scrollPaused = true;

// Load prompts, returns true or false if it loads them.
async function loadPrompts() {
    let newContainer = document.createElement("div");
    newContainer.innerHTML = '<p>Loading...</p>';
    container.appendChild(newContainer);
    // buttonPrompts.hidden = true;
    scrollPaused = true;

    try {
        const snapshot = await db.collection('prompts').orderBy('timestamp', 'desc').startAfter(startAfter).limit(limit).get();
        newContainer.innerHTML = '';
        // buttonPrompts.hidden = true;

        if (snapshot.empty || snapshot.size < limit) {
            newContainer.innerHTML = '<hr><p>No more prompts. How sad!</p> <p><small><a href="#">Top of the Page &uArr;</a></small></p>';
            // Button Prompt stays hidden
            return false;
        } else {
            // buttonPrompts.hidden = false;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            addCard(data, newContainer);
            // The assignments keep overriding until the last timestamp in the list
            // which is then used for loading the next set of prompts.
            startAfter = data.timestamp;
        });
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
        console.log(pageYOffset + window.innerHeight >= document.body.scrollHeight + SCROLL_BOTTOM_OFFSET);
        if (pageYOffset + window.innerHeight >= document.body.scrollHeight + SCROLL_BOTTOM_OFFSET) {
            finished != loadPrompts();
        }
    }
});