import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form eventListener
searchForm.addEventListener('submit', e => {
    //Get search term
    const searchTerm = searchInput.value;

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    //Get limit
    const searchLimit = document.getElementById('limit').value;


    //Check input 
    if (searchTerm === '') {
        //Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    //Clear search input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then
        (results => {
            let output = '<div class="card-columns">'
            //Loop through posts
            results.forEach(post => {

                //check for image
                const image = post.preview ? post.preview.images[0].source.url :
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsolgYXZlO9Crj6hBqhEVl2XDJVKw-PU-DxQ&usqp=CAU';
                output += `
                <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 250)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
  </div>
</div>`
            });
            output += '</div>';

            document.getElementById('results').innerHTML = output;
        });

    e.preventDefault();
});

//Show message
function showMessage(message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const searchContainer = document.getElementById('search-container');
    //Get search
    const search = document.getElementById('search');

    //Insert message
    searchContainer.insertBefore(div, search);

    //Timeout alert msg
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//Truncate Text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}