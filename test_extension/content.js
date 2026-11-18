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
  }
});

console.log('Тест');