let enabled = false;
async function updateBorder() {
  // const data = await chrome.storage.local.get("enabled");
  // const enabled = !(data.enabled ?? false);
  // await chrome.storage.local.set({ enabled });
  enabled = !enabled;
  
  if (enabled) {
    document.body.style.border = "5px solid #6366f1";
  } else {
    document.body.style.border = "";
  }
}

// Получаем команды от popup
chrome.runtime.onMessage.addListener( async (message) => {
  if (message.action === "toggle") {
    await updateBorder();

    // if (new URL(message.url).origin === 'https://argument.testvzh.ru') {
    if (message.url === 'https://argument.testvzh.ru/') {
      getLinks();
      console.log(message.url);
    } else {
      console.log('не верный адрес');
    }
  }
});

// function getLinks() {
//   let servicesLincs = document.querySelectorAll('.services_item');
//   console.log(servicesLincs);
//   servicesLincs.forEach(e => {
//     console.log(e.getAttribute('href'));
//   });
// }

function getLinks() {
    const servicesLinks = document.querySelectorAll('.services_item');
    const links = [];

    servicesLinks.forEach(e => {
        const link = e;

        if (link) {
            links.push(link.href);
        }
    });

    chrome.runtime.sendMessage({
        action: 'visitLinks',
        links: links
    });
}

console.log('Тест');