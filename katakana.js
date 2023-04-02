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
        const errorDiv = document.createElement("div");
        errorDiv.textContent = `Error fetching loanwords: ${error}`;
        document.getElementById("app").appendChild(errorDiv);
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
    table.append(...loanwords.map(loanword => generateRow(loanword, headers)));
    return table;
}

function generateHeaderRow(headers) {
    const headerRow = document.createElement("tr");
    headerRow.append(...headers.map(header => generateHeader(header)));
    return headerRow;
}

function generateHeader(header) {
    const th = document.createElement("th");
    th.textContent = header;
    return th;
}

function generateRow(loanword, headers) {
    const row = document.createElement("tr");
    row.append(...headers.map(header => generateCell(loanword[header])));
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
    const appDiv = document.getElementById("app");
    if (loanwords.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "No loanwords to display.";
        appDiv.appendChild(errorDiv);
    } else {
        appDiv.insertBefore(table, appDiv.firstChild);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    main().catch(error => {
        console.error(error);
    });
});
