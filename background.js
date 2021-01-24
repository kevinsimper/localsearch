chrome.omnibox.setDefaultSuggestion({
  description: "Search %s in localsearch",
});

chrome.omnibox.onInputStarted.addListener(() => {
  console.log("Input Started");
});

chrome.omnibox.onInputCancelled.addListener(() => {
  console.log("Input Cancelled");
});

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.create({ url: "http://localhost:8001/search?q=" + text });
});

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  const res = await fetch(`http://localhost:8001/suggest?q=${text}`);
  const { data } = await res.json();

  const suggestContent = data.map((suggestion) => {
    return {
      content: suggestion,
      description: suggestion,
    };
  });
  suggest(suggestContent);
});
