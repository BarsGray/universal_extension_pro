const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const message = document.getElementById("message");

async function loadSettings() {
  const data = await chrome.storage.local.get("enabled");
  updateInterface(data.enabled ?? false);
}

function updateInterface(enabled) {
  status.textContent = enabled ? "Включено" : "Выключено";
  status.classList.toggle("active", enabled);

  message.textContent = enabled
    ? "Рамка включена!"
    : "Рамка выключена.";
}

toggle.addEventListener("click", async () => {
  const data = await chrome.storage.local.get("enabled");
  const enabled = !(data.enabled ?? false);

  await chrome.storage.local.set({ enabled });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        action: "toggle",
        enabled
      });
    } catch (error) {
      console.log("На этой странице нельзя выполнить скрипт:", error.message);
    }
  }

  updateInterface(enabled);
});

loadSettings();
