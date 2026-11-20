function waitForLoad(tabId) {
  return new Promise(resolve => {
    function listener(id, info) {
      if (id === tabId && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'visitLinks') {
    visitLinks(message.links);
  }
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function visitLinks(links) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  const tabId = tab.id;
  const returnUrl = 'https://argument.testvzh.ru/';

  for (const url of links) {
    console.log('Открываем:', url);

    let loaded = waitForLoad(tabId);
    await chrome.tabs.update(tabId, { url });
    await loaded;

    console.log('Страница загружена');

    // await delay(3000); // Ждём 2 секунды

    loaded = waitForLoad(tabId);
    await chrome.tabs.update(tabId, { url: returnUrl });
    await loaded;

    console.log('Вернулись назад');
  }

  console.log('Все ссылки обработаны');
}

