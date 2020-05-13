"use strict";

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', ()=>{
//     navigator.serviceWorker.register('service_worker.js')
//       .then((reg) => console.log(`service worker registered`, reg))
//       .catch((err) => console.log(`service worker not registered: ${err}`));
//   })
// }

const applicationServerPublicKey =
  "BHGJsAHFOeGNAGn87NiP3BGH_N43_8pnJdb6qG8HaI7hO3Mfc4seiH0OdFNzA7GjmwfqZoBRuXRAT6Dv8Mwf-WY";

const pushButton = document.querySelector(".js-push-btn");
pushButton.addEventListener("click", () => console.log(`push button clicked`));

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  navigator.serviceWorker
    .register("service_worker.js")
    .then(function (swReg) {
      console.log("Service Worker is registered", swReg);

      swRegistration = swReg;
      initializeUI();
    })
    .catch((error) => console.error("Service Worker Error", error));
} else pushButton.textContent = "Push Not Supported";

function initializeUI() {
  pushButton.addEventListener("click", function () {
    pushButton.disabled = true;
    if (isSubscribed) unsubscribeUser();
    else subscribeUser();
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription().then((subscription) => {
    isSubscribed = !(subscription === null);
    if (isSubscribed) console.log("User IS subscribed.");
    else console.log("User is NOT subscribed.");
    updateBtn();
  });
}

function updateBtn() {
  if (Notification.permission === "denied") {
    pushButton.textContent = "Push Messaging Blocked.";
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }
  if (isSubscribed) pushButton.textContent = "Disable Push Messaging";
  else pushButton.textContent = "Enable Push Messaging";
  pushButton.disabled = false;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then((subscription) => {
      console.log("User is subscribed.");
      updateSubscriptionOnServer(subscription);
      isSubscribed = true;
      updateBtn();
    })
    .catch((err) => {
      console.log("Failed to subscribe the user: ", err);
      updateBtn();
    });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector(".js-subscription-json");
  const subscriptionDetails = document.querySelector(
    ".js-subscription-details"
  );

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove("is-invisible");
  } else subscriptionDetails.classList.add("is-invisible");
}

function unsubscribeUser() {
  swRegistration.pushManager
    .getSubscription()
    .then((subscription) => {
      if (subscription) subscription.unsubscribe();
    })
    .catch((error) => console.log("Error unsubscribing", error))
    .then(() => {
      updateSubscriptionOnServer(null);
      console.log("User is unsubscribed.");
      isSubscribed = false;
      updateBtn();
    });
}
