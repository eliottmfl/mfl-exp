document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('mflExpPopupClosed') !== 'true') {
        setTimeout(showPopup, 3000);
    }
});

function showPopup() {
    document.querySelector('.mfl-custom-popup-overlay').style.display = 'flex';
    addCloseEvent();
}

function addCloseEvent() {
    const closeButton = document.querySelector('.mfl-custom-popup .mfl-close-button');
    const overlay = document.querySelector('.mfl-custom-popup-overlay');

    closeButton.addEventListener('click', () => {
        document.querySelector('.mfl-custom-popup').style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        sessionStorage.setItem('mflExpPopupClosed', 'true');
    });

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.querySelector('.mfl-custom-popup').style.display = 'none';
                overlay.style.display = 'none';
                sessionStorage.setItem('mflExpPopupClosed', 'true');
            }
        });
    }
}
