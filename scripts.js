document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('product-gallery');
    const searchBar = document.getElementById('search-bar');

    function displayProducts(filter = '') {
        gallery.innerHTML = '';
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const name = document.createElement('div');
            name.classList.add('product-name');
            name.textContent = product.name;

            const price = document.createElement('div');
            price.classList.add('product-price');
            price.textContent = product.price;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const whatsappButton = document.createElement('button');
            whatsappButton.classList.add('whatsapp-button');
            whatsappButton.textContent = 'Заказать';
            whatsappButton.addEventListener('click', function() {
                window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=Я хочу заказать ${product.name}`, '_blank');
            });

            const youtubeButton = document.createElement('button');
            youtubeButton.classList.add('youtube-button');
            youtubeButton.textContent = 'Обзор на YouTube';
            youtubeButton.addEventListener('click', function() {
                window.open(product.video, '_blank');
            });

            buttonContainer.appendChild(whatsappButton);
            buttonContainer.appendChild(youtubeButton);

            productDiv.appendChild(img);
            productDiv.appendChild(name);
            productDiv.appendChild(price);
            productDiv.appendChild(buttonContainer);

            gallery.appendChild(productDiv);
        });
    }

    searchBar.addEventListener('input', function() {
        displayProducts(searchBar.value);
    });

    // Отображение товаров при загрузке страницы
    displayProducts();
});
