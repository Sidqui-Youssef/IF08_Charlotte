document.addEventListener("DOMContentLoaded", () => {
    fetch('ingredients.json')
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors du chargement du JSON');
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('ingredient');
            container.innerHTML = '';

            let totalScore = 0;
            let count = 0;

            const nutriMap = {
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5
            };

            data.forEach(product => {
                const box = document.createElement('div');
                box.className = 'ingredient-box';

                // Image de l'ingrédient
                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.product_name;

                // Nom
                const name = document.createElement('h2');
                name.textContent = product.product_name;

                // Nutri-score individuel
                const nutri = document.createElement('img');
                let grade = product.nutriscore_grade && product.nutriscore_grade !== 'not-applicable'
                    ? product.nutriscore_grade
                    : 'unknown';

                nutri.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${grade}.svg`;
                nutri.alt = `Nutriscore ${grade}`;

                // Incrémentation pour moyenne globale
                if (nutriMap[grade]) {
                    totalScore += nutriMap[grade];
                    count++;
                }

                box.appendChild(img);
                box.appendChild(name);
                box.appendChild(nutri);
                container.appendChild(box);
            });

            // Calcul Nutri-Score moyen
            if (count > 0) {
                const avgScore = totalScore / count;
                let finalGrade = '';

                if (avgScore < 1.5) finalGrade = 'a';
                else if (avgScore < 2.5) finalGrade = 'b';
                else if (avgScore < 3.5) finalGrade = 'c';
                else if (avgScore < 4.5) finalGrade = 'd';
                else finalGrade = 'e';

                const globalNutri = document.getElementById('global-nutriscore');
                const scoreImg = document.createElement('img');
                scoreImg.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${finalGrade}.svg`;
                scoreImg.alt = `Nutriscore global: ${finalGrade}`;
                globalNutri.appendChild(scoreImg);
            }
        })
        .catch(err => {
            console.error('Erreur de chargement des ingrédients :', err);
        });
});
