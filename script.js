// JavaScript code for managing banned users list, cashset list, and download functions

document.addEventListener('DOMContentLoaded', loadLists);

function copyTextCheaty() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempban ${inputText} 7d cheaty // ${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText, nickname);
}

function copyTextKopanieAFK() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempban ${inputText} 7d kopanie afk // ${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText, nickname);
}

function copyTextscamdc() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/tempbanip ${inputText} 365d scam dc // ${nickname}`;
    
    copyToClipboard(formattedText);
    addToBanList(formattedText, nickname);
}

function copyTextcashset() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashsetv2 ${inputText} set 0 // gc1`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText, nickname);
}

function copyTextcashset2() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashsetv2 ${inputText} set 0 // gc2`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText, nickname);
}

function copyTextcashsetmoney() {
    const inputText = document.getElementById('inputText').value;
    const nickname = document.getElementById('nicknameInput').value;
    const formattedText = `/cashset ${inputText} 0 // MoneySMP`;
    
    copyToClipboard(formattedText);
    addToCashsetList(formattedText, nickname);
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const messageElement = document.getElementById('message');
    const nickname = document.getElementById('nicknameInput').value;
    messageElement.innerText = `Tekst skopiowany do schowka dla ${nickname}!`;
    messageElement.style.opacity = 1;

    setTimeout(() => {
        messageElement.style.opacity = 0;
    }, 2000);

    // Save nickname to cookie
    document.cookie = `nickname=${nickname}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function addToBanList(text, nickname) {
    const list = document.getElementById('banList');
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
    saveBanList();
}

function addToCashsetList(text, nickname) {
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

    const nickname = document.getElementById('nicknameInput').value;
    document.cookie = `banList=${JSON.stringify(itemArray)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `banListNickname=${nickname}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function saveCashsetList() {
    const list = document.getElementById('cashsetList');
    const items = list.getElementsByTagName('li');
    const itemArray = [];

    for (let i = 0; i < items.length; i++) {
        itemArray.push(items[i].textContent);
    }

    const nickname = document.getElementById('nicknameInput').value;
    document.cookie = `cashsetList=${JSON.stringify(itemArray)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `cashsetListNickname=${nickname}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function loadLists() {
    const banListCookie = getCookie('banList');
    const banListNicknameCookie = getCookie('banListNickname');
    const cashsetListCookie = getCookie('cashsetList');
    const cashsetListNicknameCookie = getCookie('cashsetListNickname');
    
    if (banListCookie && banListNicknameCookie) {
        const itemArray = JSON.parse(banListCookie);
        const list = document.getElementById('banList');

        for (let i = 0; i < itemArray.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = itemArray[i];
            list.appendChild(listItem);
        }

        document.getElementById('nicknameInput').value = banListNicknameCookie;
    }
    
    if (cashsetListCookie && cashsetListNicknameCookie) {
        const itemArray = JSON.parse(cashsetListCookie);
        const list = document.getElementById('cashsetList');

        for (let i = 0; i < itemArray.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = itemArray[i];
            list.appendChild(listItem);
        }

        document.getElementById('nicknameInput').value = cashsetListNicknameCookie;
    }
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}

function downloadBanList() {
    const list = document.getElementById('banList');
    const items = list.getElementsByTagName('li');
    const itemArray = [];

    for (let i = 0; i < items.length; i++) {
        itemArray.push(items[i].textContent);
    }

    const textToSave = itemArray.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'ban_list.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function downloadCashsetList() {
    const list = document.getElementById('cashsetList');
    const items = list.getElementsByTagName('li');
    const itemArray = [];

    for (let i = 0; i < items.length; i++) {
        itemArray.push(items[i].textContent);
    }

    const textToSave = itemArray.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'cashset_list.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

// Event listener for loading lists on DOM content load
document.addEventListener('DOMContentLoaded', loadLists);

