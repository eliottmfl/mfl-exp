document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('mflExpPopupClosed') !== 'true') {
        setTimeout(showPopup, 3000);
    }
});

function showPopup() {
    document.querySelector('.custom-popup-overlay').style.display = 'flex';
    addCloseEvent();
}

function addCloseEvent() {
    const closeButton = document.querySelector('.custom-popup .close-button');
    const overlay = document.querySelector('.custom-popup-overlay');

    closeButton.addEventListener('click', () => {
        document.querySelector('.custom-popup').style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        sessionStorage.setItem('mflExpPopupClosed', 'true');
    });

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.querySelector('.custom-popup').style.display = 'none';
                overlay.style.display = 'none';
                sessionStorage.setItem('mflExpPopupClosed', 'true');
            }
        });
    }
}
