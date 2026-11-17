chrome.runtime.onInstalled.addListener(async () => {
  console.log("Расширение установлено!");

  const data = await chrome.storage.local.get("enabled");

  console.log("Начальные настройки:", data);
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Chrome запущен!");
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") {
    console.log("Хранилище изменилось:", changes);
  }
});




// chrome.runtime.onInstalled.addListener(() => {
//   console.log("My Chrome Extension установлено!");
// });

// chrome.runtime.onStartup.addListener(() => {
//   console.log("Chrome запущен!");
// });
