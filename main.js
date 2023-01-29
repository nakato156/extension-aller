const sitesToBlock = ["xvideos.com", "es.pornhub.com", 'xnxx.com', 'xhamster.com'];

function getUrl(url){
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const match = url.match(regex);
  return match[1];
}

const checkTab = (activeTab) => {
  chrome.tabs.get(activeTab.tabId, (tab) => {
    if (sitesToBlock.includes(getUrl(tab.url))) {
      chrome.tabs.update(tab.id, {url: "about:blank"});
    }
  });
}

chrome.webRequest.onBeforeRequest.addListener(details => {
    if (sitesToBlock.includes(getUrl(details.url))) {
      return {cancel: true};
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
