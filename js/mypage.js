document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('postImageBtn');
    const fileNameSpan = document.getElementById('fileName');
    const textarea = document.getElementById('postText');
    const submitBtn = document.getElementById('submitPostBtn');
    const feedContainer = document.getElementById('mypageFeed');
    const noPostsMsg = document.getElementById('noPostsMsg');

    let selectedImageBase64 = null;

    // Load posts from localStorage
    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('reptile_posts') || '[]');
        feedContainer.innerHTML = '';

        if (noPostsMsg) noPostsMsg.style.display = 'none';

        // Show only the 4 latest posts
        const recentPosts = posts.slice(0, 4);
        
        recentPosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'info-card feed-card';
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                if (e.target.closest('.feed-delete')) return;
                localStorage.setItem('current_view_post_id', post.id);
                window.location.href = `post_detail.html?id=${post.id}`;
            };
            card.innerHTML = `
                <button class="feed-delete" onclick="deletePost(${post.id})" title="글 삭제"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i></button>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="feed-thumb" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;">` : ''}
                <div class="feed-date" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; margin-top: 0.5rem;">📅 ${post.date}</div>
                <p class="feed-preview">${post.text}</p>
            `;
            feedContainer.appendChild(card);
        });

        // Add dummy placeholders to ensure the layout always displays 4 cards strictly to protect thumbnail sizing.
        const placeholdersNeeded = 4 - recentPosts.length;
        for (let i = 0; i < placeholdersNeeded; i++) {
            const dummyCard = document.createElement('div');
            dummyCard.className = 'info-card feed-card placeholder-card';
            dummyCard.style.opacity = '0.4';
            dummyCard.innerHTML = `
                <div style="width: 100%; height: 220px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; flex-direction: column; color: var(--text-muted);">
                    <i data-lucide="image" style="width: 32px; height: 32px; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                    <span style="font-size: 0.8rem;">샘플 이미지 공간</span>
                </div>
                <div class="feed-date" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; margin-top: 0.5rem;">📅 샘플 기록 날짜</div>
                <p class="feed-preview" style="color: var(--text-muted);">이 공간은 샘플 데모 데이터입니다. 새로운 다이어리 글과 사진을 작성하면 이곳에 등록됩니다!</p>
            `;
            feedContainer.appendChild(dummyCard);
        }

        if (window.lucide) window.lucide.createIcons();
    };

    // Make delete globally accessible
    window.deletePost = (id) => {
        if(confirm('이 다이어리 기록을 정말 삭제하시겠습니까?')) {
            let posts = JSON.parse(localStorage.getItem('reptile_posts') || '[]');
            posts = posts.filter(p => p.id !== id);
            localStorage.setItem('reptile_posts', JSON.stringify(posts));
            loadPosts();
        }
    };

    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameSpan.textContent = file.name;
                
                // Convert to Base64
                const reader = new FileReader();
                reader.onload = (event) => {
                    selectedImageBase64 = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                fileNameSpan.textContent = "";
                selectedImageBase64 = null;
            }
        });
    }

    // Submit post
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const text = textarea.value.trim();
            if (!text && !selectedImageBase64) {
                alert('내용을 작성하거나 파충류 사진을 등록해 주세요.');
                return;
            }

            const posts = JSON.parse(localStorage.getItem('reptile_posts') || '[]');
            const newPost = {
                id: Date.now(),
                date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' }),
                text: text.replace(/\n/g, '<br>'), // Basic newline format
                image: selectedImageBase64
            };

            // Add to beginning of array
            posts.unshift(newPost);
            
            try {
                localStorage.setItem('reptile_posts', JSON.stringify(posts));
            } catch (e) {
                alert('로컬 저장소 용량이 초과되었습니다. 너무 많은 고화질 사진을 올리셨을 수 있습니다. 기존 데이터를 일부 삭제해 주세요.');
                return;
            }

            // Reset form
            textarea.value = '';
            fileInput.value = '';
            fileNameSpan.textContent = '';
            selectedImageBase64 = null;

            // Reload visual
            loadPosts();
        });
    }

    // Initial load if on mypage
    if (feedContainer) {
        loadPosts();
    }
});
