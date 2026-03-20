document.addEventListener('DOMContentLoaded', () => {
    const t = (key) => {
        const lang = localStorage.getItem('rep_lang') || 'ko';
        return window.translations && window.translations[lang] ? window.translations[lang][key] : '';
    };

    const urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');
    
    if (!postId || postId === 'undefined') {
        postId = localStorage.getItem('current_view_post_id');
    }

    const detailView = document.getElementById('detailView');

    if (!postId) {
        alert(t('detail_alert_select') || "게시글 리스트에서 조회할 다이어리를 먼저 선택해 주세요.");
        window.location.href = "mypage.html";
        return;
    }

    // Clear fallback to prevent phantom loads later
    localStorage.removeItem('current_view_post_id');

    const renderDetail = () => {
        const posts = JSON.parse(localStorage.getItem('reptile_posts') || '[]');
        const post = posts.find(p => p.id.toString() === postId);

        if (!post) {
            detailView.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <i data-lucide="alert-triangle" class="icon-large" style="color: #ef4444;"></i>
                    <h3>${t('detail_deleted') || "삭제되었거나 존재하지 않는 게시물입니다."}</h3>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        // Render full detail
        detailView.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
                <h2 style="font-family: var(--font-heading); margin: 0;">${t('detail_title') || "파충류 다이어리"}</h2>
                <span style="color: var(--text-muted); font-size: 0.95rem;">📅 ${post.date}</span>
            </div>
            ${post.image ? `<img src="${post.image}" alt="Post detail image" class="detail-img" style="width: 100%; max-height: 500px; object-fit: contain; border-radius: 12px; margin-bottom: 2rem;">` : ''}
            <div class="detail-content">
                ${post.text}
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    };

    renderDetail();
    window.addEventListener('languageChanged', renderDetail);
});
