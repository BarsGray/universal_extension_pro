
let enabled = false;

// Загружаем состояние из хранилища
async function loadSettings() {
  const data = await chrome.storage.local.get("enabled");

  enabled = data.enabled ?? false;

  updateBorder();

  console.log("Состояние расширения:", enabled);
}

// Обновляем рамку
function updateBorder() {
  if (enabled) {
    document.body.style.border = "5px solid #6366f1";
  } else {
    document.body.style.border = "";
  }
}

// Получаем команды от popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle") {
    enabled = message.enabled;

    updateBorder();

    console.log("Новое состояние:", enabled);
  }
});

// Следим за изменениями хранилища
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.enabled) {
    enabled = changes.enabled.newValue ?? false;

    updateBorder();

    console.log("Хранилище изменилось:", enabled);
  }
});

// Запускаем загрузку
loadSettings();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// let enabled = false;

// function updateBorder() {
//   if (enabled) {
//     document.body.style.border = "5px solid #6366f1";
//   } else {
//     document.body.style.border = "";
//   }
// }

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.action === "toggle") {
//     enabled = message.enabled;
//     updateBorder();
//   }
// });

// console.log("Расширение подключено к сайту!");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// console.log("Моё расширение работает на этом сайте!");

// document.body.style.border = "5px solid #6366f1";