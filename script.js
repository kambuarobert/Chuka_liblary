// A simple array to act as our "database" for the frontend
let library = [
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

const bookListEl = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to render the books to the DOM
function renderBooks(booksToRender) {
    bookListEl.innerHTML = ''; // Clear the current list
    if (booksToRender.length === 0) {
        bookListEl.innerHTML = '<p>No books found.</p>';
        return;
    }

    booksToRender.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
        `;
        bookListEl.appendChild(bookItem);
    });
}

// Handle adding a new book
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    const newBook = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim()
    };

    // Simple validation
    if (newBook.title && newBook.author) {
        library.push(newBook);
        renderBooks(library); // Re-render the list with the new book
        addBookForm.reset(); // Clear the form
    } else {
        alert('Please enter both a title and an author.');
    }
});

// Handle search functionality
searchButton.addEventListener('click', () => {
    filterBooks();
});

searchInput.addEventListener('keyup', (e) => {
    // Also filter on 'Enter' key press
    if (e.key === 'Enter') {
        filterBooks();
    }
});

function filterBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredBooks = library.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}

// Initial render of the books when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(library);
});
