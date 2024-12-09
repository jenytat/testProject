const handleButtonClick = () => {
    let modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.add('is-open');
    }
};

const clouseModal = () => {
    let modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('is-open');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.querySelector('.modal__item--new');

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Удаляем предыдущие превью, если есть
        previewContainer.innerHTML = '';

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.className = 'preview-image';

                const removeBtn = document.createElement('button');
                removeBtn.innerText = '✖';
                removeBtn.className = 'remove-btn';
                removeBtn.onclick = () => {
                    img.remove();
                    removeBtn.remove();
                    fileInput.value = '';
                };

                previewContainer.appendChild(img);
                previewContainer.appendChild(removeBtn);
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.addEventListener('change', handleFileChange);

    // Удаление слушателей при размонтировании
    window.addEventListener('unload', () => {
        fileInput.removeEventListener('change', handleFileChange);
    });
});