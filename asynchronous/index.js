async function loadFjord(url) {
  const fetchUrl = await fetch(url);
  const text = await fetchUrl.text();
  const domParse = await new DOMParser().parseFromString(text, "text/html");
  console.log(domParse);
}
loadFjord("https://bootcamp.fjord.jp");

// fetch('https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch')
//   .then((res)=>{return res.text();})
//   .then(text=> new DOMParser().parseFromString(text, "text/html"))
//   .then(document => console.log(document));
