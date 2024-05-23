document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        const recipes = document.querySelectorAll('.recipe');

        recipes.forEach(function(recipe) {
            const title = recipe.querySelector('h3').textContent.toLowerCase();
            const content = recipe.querySelector('p').textContent.toLowerCase();
            const listItems = Array.from(recipe.querySelectorAll('li')).map(li => li.textContent.toLowerCase());
            const combinedText = [title, content, ...listItems].join(' ');

            if (combinedText.includes(searchTerm)) {
                recipe.style.display = '';
                highlightText(recipe, searchTerm);
            } else {
                recipe.style.display = 'none';
            }
        });
    });

    function highlightText(recipe, searchTerm) {
        const elementsToHighlight = recipe.querySelectorAll('h3, p, li');
        elementsToHighlight.forEach(element => {
            const innerHTML = element.innerHTML;
            const regex = new RegExp(searchTerm, 'gi');
            const highlightedHTML = innerHTML.replace(regex, match => `<mark>${match}</mark>`);
            element.innerHTML = highlightedHTML;
        });
    }

    const openFormButton = document.getElementById('openFormButton');
    const formModal = document.getElementById('formModal');
    const closeButton = document.querySelector('.close-button');
    const recipeForm = document.getElementById('recipeForm');

    openFormButton.addEventListener('click', function() {
        formModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        formModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === formModal) {
            formModal.style.display = 'none';
        }
    });

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const recipeName = document.getElementById('recipeName').value.trim();
        const recipeType = document.getElementById('recipeType').value;
        const recipeDetails = document.getElementById('recipeDetails').value.trim();
        const recipeItems = document.getElementById('recipeItems').value.trim().split('\n');
        
        if (recipeName && recipeType && recipeDetails && recipeItems.length > 0) {
            // Create new recipe element
            const newRecipe = document.createElement('article');
            newRecipe.classList.add('recipe');
            
            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipeName;
            newRecipe.appendChild(recipeTitle);
            
            const recipeContent = document.createElement('p');
            recipeContent.textContent = recipeDetails;
            newRecipe.appendChild(recipeContent);
            
            const recipeList = document.createElement('ul');
            recipeItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                recipeList.appendChild(listItem);
            });
            newRecipe.appendChild(recipeList);
            
            // Append the new recipe to the appropriate section
            const section = document.getElementById(recipeType);
            section.appendChild(newRecipe);
            
            alert('Recipe submitted successfully!');
            recipeForm.reset();
            formModal.style.display = 'none';
        } else {
            alert('Please fill out all fields.');
        }
    });
});
