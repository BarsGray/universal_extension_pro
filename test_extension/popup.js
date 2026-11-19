const toggle = document.getElementById("toggle");
// const message = document.getElementById("message");
const statusBtn = document.getElementById("status");

async function loadSettings() {
  const data = await chrome.storage.local.get("enabled");
  updateInterface(data.enabled ?? false);
}

function updateInterface(enabled) {
  statusBtn.textContent = enabled ? "Включено" : "Выключено";
  statusBtn.classList.toggle("active", enabled);

  // message.textContent = enabled ? "Рамка включена!" : "Рамка выключена.";
}

async function tabObj() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);

  if (tab?.id) {
    await chrome.tabs.sendMessage(tab.id, {
      action: "toggle",
      url: tab.url
    });
  }
}
// tabObj();

toggle.addEventListener('click', async () => {
  const data = await chrome.storage.local.get("enabled");
  // const enabled = !(data.enabled ?? false);
  // await chrome.storage.local.set({ enabled });
  
  tabObj();
  
  console.log(data);
  console.log(data.enabled);
  
  statusBtn.classList.toggle("active");
  statusBtn.textContent = statusBtn.classList.contains("active") ? "Включено" : "Выключено";
  console.log('Тест');
});

loadSettings();
