document.addEventListener("DOMContentLoaded", () => {
    fetch('ingredients.json')
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors du chargement du JSON');
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('ingredient');
            container.innerHTML = ''; // On vide les blocs statiques existants

            data.forEach(product => {
                const box = document.createElement('div');
                box.className = 'ingredient-box';

                // Image de l'ingrédient
                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.product_name;

                // Nom de l'ingrédient
                const name = document.createElement('h2');
                name.textContent = product.product_name;

                // Nutri-score
                const nutri = document.createElement('img');
                const grade = product.nutriscore_grade && product.nutriscore_grade !== 'not-applicable'
                    ? product.nutriscore_grade
                    : 'unknown';
                nutri.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${grade}.svg`;
                nutri.alt = `Nutriscore ${grade}`;

                // Ajout dans le bloc
                box.appendChild(img);
                box.appendChild(name);
                box.appendChild(nutri);

                // Ajout dans le container
                container.appendChild(box);
            });
        })
        .catch(err => {
            console.error('Erreur de chargement des ingrédients :', err);
        });
});