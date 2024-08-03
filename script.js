document.addEventListener('DOMContentLoaded', loadLists);

function copyTextCheaty() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempban ${inputText} 7d cheaty //${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText);
}

function copyTextKopanieAFK() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempban ${inputText} 7d kopanie afk //${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText);
}

function copyTextscamdc() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempbanip ${inputText} 365d scam dc //${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText);
}

function copyTextcashset() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashsetv2 ${inputText} set 0 //gc1`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText);
}

function copyTextcashset2() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashsetv2 ${inputText} set 0 //gc2`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText);
}

function copyTextcashsetmoney() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashset ${inputText} 0 //MoneySMP`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText);
}

function copyToClipboard(text) {
    // Tworzenie tymczasowego pola tekstowego
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);

    // Zaznaczenie i skopiowanie tekstu
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Dla urządzeń mobilnych

    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Wyświetlenie komunikatu
    const messageElement = document.getElementById('message');
    messageElement.innerText = `Tekst skopiowany dla ${document.getElementById('nicknameInput').value}!`;
    messageElement.style.opacity = 1;

    // Ukrycie komunikatu po 2 sekundach
    setTimeout(() => {
        messageElement.style.opacity = 0;
    }, 2000);
}

function addToBanList(text) {
    const list = document.getElementById('banList');
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
    saveBanList();
}

function addToCashsetList(text) {
    const list = document.getElementById('cashsetList');
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
    saveCashsetList();
}

function clearBanList() {
    const list = document.getElementById('banList');
    list.innerHTML = '';
    saveBanList();
}

function clearCashsetList() {
    const list = document.getElementById('cashsetList');
    list.innerHTML = '';
    saveCashsetList();
}

function saveBanList() {
    const list = document.getElementById('banList');
    const items = list.getElementsByTagName('li');
    const itemArray = [];

    for (let i = 0; i < items.length; i++) {
        itemArray.push(items[i].textContent);
    }

    // Zapis do ciasteczka
    document.cookie = `banList=${JSON.stringify(itemArray)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function saveCashsetList() {
    const list = document.getElementById('cashsetList');
    const items = list.getElementsByTagName('li');
    const itemArray = [];

    for (let i = 0; i < items.length; i++) {
        itemArray.push(items[i].textContent);
    }

    // Zapis do ciasteczka
    document.cookie = `cashsetList=${JSON.stringify(itemArray)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function loadLists() {
    const banListCookie = getCookie('banList');
    const cashsetListCookie = getCookie('cashsetList');
    
    if (banListCookie) {
        const itemArray = JSON.parse(banListCookie);
        const list = document.getElementById('banList');

        for (let i = 0; i < itemArray.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = itemArray[i];
            list.appendChild(listItem);
        }
    }
    
    if (cashsetListCookie) {
        const itemArray = JSON.parse(cashsetListCookie);
        const list = document.getElementById('cashsetList');

        for (let i = 0; i < itemArray.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = itemArray[i];
            list.appendChild(listItem);
        }
    }
}

// Funkcja do pobierania wartości z ciasteczka
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}
