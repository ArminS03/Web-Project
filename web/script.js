document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userSelect = document.getElementById('user-select').value;
        if (userSelect === 'player') {
            window.location.href = 'player_home.html';
        } else if (userSelect === 'designer') {
            window.location.href = 'designer_home.html';
        } else {
            alert('لطفاً نقش کاربر را انتخاب کنید.');
        }
    });
});

const correctAnswerSelect = document.getElementById("correct-answer");
correctAnswerSelect.addEventListener("change", function() {
    document.querySelectorAll("input[type='text']").forEach(input => input.classList.remove("correct-answer"));
    const selectedValue = this.value;
    const correctInput = document.getElementById(`choice${selectedValue}`);
    if (correctInput) {
        console.log("hello");
        correctInput.classList.add("correct-answer");
    }
});

function toggleCard(card) {
    card.addEventListener("click", function(event) {
        if (event.target.tagName !== "SELECT" && event.target.tagName !== "OPTION" && event.target.tagName !== "SPAN"
        ) {
            card.classList.toggle("expanded");
        }
    });
}

function togglePlayerCard(card) {
    card.addEventListener("click", function(event) {
        if (event.target.tagName !== "BUTTON") {
            card.classList.toggle("expanded");
        }
    });
}

function clickStars(star) {
        const rating = star.dataset.value;
        const stars = star.parentNode.querySelectorAll(".star");
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add("filled");
            } else {
                s.classList.remove("filled");
            }
        });
}

function inStars(star) {
    const rating = star.dataset.value;
    const stars = star.parentNode.querySelectorAll(".star");
    stars.forEach((s, index) => {
        if (index < rating) {
            s.classList.add("hovered");
        } else {
            s.classList.remove("hovered");
        }
    });
}

function outStars(star) {
    const stars = star.parentNode.querySelectorAll(".star");
    stars.forEach(s => s.classList.remove("hovered"));
}

function submitSelection() {
    const selectedQuestions = [];
    const checkboxes = document.querySelectorAll('#available-questions input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedQuestions.push(checkbox.value);
    });

    localStorage.setItem('relatedQuestions', JSON.stringify(selectedQuestions));

    window.location.href = 'original_question_page.html';
}

function updateRelatedQuestions() {
    const relatedQuestions = JSON.parse(localStorage.getItem('relatedQuestions'));
    if (relatedQuestions) {
        const relatedQuestionsContainer = document.querySelectorAll('.related-questions ul');
        relatedQuestionsContainer.forEach(container => {
            container.innerHTML = '';
            relatedQuestions.forEach(question => {
                const li = document.createElement('li');
                li.innerHTML = `سوال: <span class="related-question">${question}</span>`;
                container.appendChild(li);
            });
        });
    }
}

document.getElementById('addCategoryForm').addEventListener('submit', function(event) {
    const categoryName = document.getElementById('categoryName').value.trim();

    if (categoryName) {
        const existingCategories = JSON.parse(localStorage.getItem('categories')) || [];

        existingCategories.push(categoryName);
        localStorage.setItem('categories', JSON.stringify(existingCategories));

        window.location.href = 'categories.html';
    } else {
        alert('لطفاً نام دسته را وارد کنید.');
    }
});

function loadCategories() {
    const categoriesContainer = document.querySelector('.categories');
    const existingCategories = JSON.parse(localStorage.getItem('categories')) || [];

    categoriesContainer.innerHTML = '';
    existingCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.textContent = category;
        categoriesContainer.appendChild(button);
    });
}

if (window.location.href.includes('categories.html')) {
    loadCategories();
}

function checkAnswer(selectedButton, answerType) {
    const options = selectedButton.parentNode.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
        });

    if (answerType) {
        options.forEach(option => {
            option.classList.add('incorrect');
            });
        selectedButton.classList.remove('incorrect');
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.remove('correct');
        selectedButton.classList.add('incorrect');
    }
}

function toggleDark(btn) {
    document.querySelectorAll('*').forEach(element => {
        element.classList.toggle('dark-mode');
    });;
    btn.textContent = document.body.classList.contains('dark-mode') ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک';
}
