const URL = "loanwords.json";

async function getLoanwords() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const loanwords = await response.json();
    if (!isValidLoanwords(loanwords)) {
      throw new Error("Loanwords JSON file is not in the correct format.");
    }
    return loanwords;
  } catch (error) {
    console.error(`Error fetching loanwords: ${error}`);
    return [];
  }
}

function isValidLoanwords(loanwords) {
  if (!Array.isArray(loanwords)) {
    return false;
  }
  const requiredFields = ["hiragana", "katakana", "romaji", "translation"];
  for (const loanword of loanwords) {
    if (typeof loanword !== "object") {
      return false;
    }
    for (const field of requiredFields) {
      if (!(field in loanword)) {
        return false;
      }
    }
  }
  return true;
}

function generateTable(loanwords) {
  const table = document.createElement("table");
  const headers = ["Katakana", "Hiragana", "Romaji", "Translation"];
  table.appendChild(generateHeaderRow(headers));
  //loanwords.forEach(loanword => table.appendChild(generateRow(loanword, headers)));
  return table;
}

function generateHeaderRow(headers) {
  const headerRow = document.createElement("tr");
  headers.forEach(header => headerRow.appendChild(generateHeader(header)));
  return headerRow;
}

function generateHeader(header) {
  const th = document.createElement("th");
  th.textContent = header;
  return th;
}

function generateRow(loanword, headers) {
  const row = document.createElement("tr");
  headers.forEach(header => row.appendChild(generateCell(loanword[header])));
  return row;
}

function generateCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

async function main() {
  const loanwords = await getLoanwords();
  const table = generateTable(loanwords);
  document.getElementById("app").appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
  main().catch(error => {
    console.error(error);
  });
});
