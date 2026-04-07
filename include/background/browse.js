// Load prompts
async function loadPrompts() {
    const container = document.getElementById('prompts-display');
    container.innerHTML = '<p>Loading...</p>';

    try {
        const snapshot = await db.collection('prompts').orderBy('timestamp', 'desc').get();
        container.innerHTML = '';

        if (snapshot.empty) {
            container.innerHTML = 'No prompts. Upload first!';
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            console.log(data);
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.innerHTML = `
                <div class="prompt-title"><h3>${escapeHtml(data.title)}</h3></div>
                <div class="prompt-content"><p>${escapeHtml(data.content)}</p></div>
                <div class="prompt-meta"><p><small>${data.author} - ${data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'now'}</small></p></div>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        container.innerHTML = 'Error loading. Check Firestore.';
    }
}

loadPrompts();