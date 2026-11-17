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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const status = document.getElementById("status");
// const toggle = document.getElementById("toggle");
// const message = document.getElementById("message");

// async function loadSettings() {
//   try {
//     const data = await chrome.storage.local.get("enabled");

//     console.log("Данные из хранилища:", data);

//     const enabled = data.enabled ?? false;

//     updateInterface(enabled);
//   } catch (error) {
//     console.error("Ошибка загрузки:", error);
//   }
// }

// function updateInterface(enabled) {
//   status.textContent = enabled ? "Включено" : "Выключено";

//   status.classList.toggle("active", enabled);

//   message.textContent = enabled ? "Расширение активно!" : "Расширение отключено.";
// }

// toggle.addEventListener("click", async () => {
//   try {
//     const data = await chrome.storage.local.get("enabled");

//     const enabled = !(data.enabled ?? false);

//     await chrome.storage.local.set({ enabled });

//     console.log("Новое значение:", enabled);

//     const saved = await chrome.storage.local.get("enabled");

//     console.log("Проверка сохранения:", saved);

//     updateInterface(enabled);
//   } catch (error) {
//     console.error("Ошибка сохранения:", error);
//   }
// });

// loadSettings();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const status = document.getElementById("status");
// const toggle = document.getElementById("toggle");
// const message = document.getElementById("message");

// // Загружаем настройки
// async function loadSettings() {
//   const data = await chrome.storage.local.get("enabled");

//   const enabled = data.enabled ?? false;

//   updateInterface(enabled);
// }

// // Обновляем интерфейс
// function updateInterface(enabled) {
//   status.textContent = enabled ? "Включено" : "Выключено";

//   status.classList.toggle("active", enabled);

//   message.textContent = enabled ? "Расширение активно!" : "Расширение отключено.";
// }

// // Обработка кнопки
// toggle.addEventListener("click", async () => {
//   const data = await chrome.storage.local.get("enabled");

//   const enabled = !(data.enabled ?? false);

//   await chrome.storage.local.set({ enabled });

//   updateInterface(enabled);
// });

// // Запуск
// loadSettings();
