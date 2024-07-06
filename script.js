// script.js

async function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const siteUrl = 'https://your-sharepoint-site-url';
    const apiUrl = `${siteUrl}/_api/search/query?querytext='${query}'`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json;odata=verbose',
            },
        });
        const data = await response.json();
        displayResults(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results);
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

function displayResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    results.forEach(result => {
        const title = result.Cells.results.find(cell => cell.Key === 'Title').Value;
        const url = result.Cells.results.find(cell => cell.Key === 'Path').Value;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        resultItem.innerHTML = `<a href="${url}" target="_blank">${highlight(query, title)}</a>`;
        searchResultsDiv.appendChild(resultItem);
    });
}

function highlight(query, text) {
    const regex = new RegExp(query, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}
