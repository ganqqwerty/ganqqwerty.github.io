const appDiv = document.getElementById('app');

function isValidLoanword(loanword) {
  return loanword.hiragana && loanword.katakana && loanword.romaji && loanword.translation;
}

function generateTableRow(loanword) {
  const hiraganaCell = document.createElement('td');
  hiraganaCell.textContent = loanword.hiragana;
  hiraganaCell.classList.add('hiragana');

  const katakanaCell = document.createElement('td');
  katakanaCell.textContent = loanword.katakana;

  const romajiCell = document.createElement('td');
  romajiCell.textContent = loanword.romaji;
  romajiCell.classList.add('romaji');

  const translationCell = document.createElement('td');
  translationCell.textContent = loanword.translation;
  translationCell.classList.add('translation');

  const row = document.createElement('tr');
  row.appendChild(hiraganaCell);
  row.appendChild(katakanaCell);
  row.appendChild(romajiCell);
  row.appendChild(translationCell);

  return row;
}

function generateTable(loanwords) {
  const table = document.createElement('table');
  table.id = 'loanwords-table';

  const headerRow = document.createElement('tr');
  const hiraganaHeader = document.createElement('th');
  hiraganaHeader.textContent = 'Hiragana';
  const katakanaHeader = document.createElement('th');
  katakanaHeader.textContent = 'Katakana';
  const romajiHeader = document.createElement('th');
  romajiHeader.textContent = 'Romaji';
  const translationHeader = document.createElement('th');
  translationHeader.textContent = 'Translation';

  headerRow.appendChild(hiraganaHeader);
  headerRow.appendChild(katakanaHeader);
  headerRow.appendChild(romajiHeader);
  headerRow.appendChild(translationHeader);
  table.appendChild(headerRow);

  const tableRows = loanwords.filter(isValidLoanword).map(generateTableRow);
  tableRows.forEach(row => table.appendChild(row));

  return table;
}

function loadData() {
  fetch('loanwords.json')
    .then(response => response.json())
    .then(data => {
      const table = generateTable(data.loanwords);
      appDiv.appendChild(table);
    })
    .catch(error => console.error('Error loading loanwords', error));
}

loadData();
