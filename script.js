const endpoint = "https://jsonplaceholder.typicode.com/comments?postId=3";
const SEARCH_VALUE = document.querySelector("input[type='text']");
const LIST = document.querySelector(".list");
const INPUT_BOX = document.querySelector(".input-box");
let fetchedData = [];
let prevSearch = "";
let isDataReady = false;
const Suggest = () => {
  let request = new XMLHttpRequest();
  request.open("GET", endpoint);
  request.send();
  request.addEventListener("load", () => {
    fetchedData = JSON.parse(request.responseText);
    isDataReady = true;
  });
};

const Search = () => {
  if (SEARCH_VALUE.value !== prevSearch) {
    if (SEARCH_VALUE.value.length != 0 && isDataReady) {
      prevSearch = SEARCH_VALUE.value;
      fetchedData.forEach(({ name }) => {
        if (name.toUpperCase().indexOf(SEARCH_VALUE.value.toUpperCase()) > -1) {
          LIST.classList.add("list-back");
          SEARCH_VALUE.classList.add("onsearch-input");
          INPUT_BOX.classList.add("onsearch-box");
          LIST.innerHTML += `<li class="list-data ">${name}</li>`;
        }
      });
    } else {
      SEARCH_VALUE.classList.remove("onsearch-input");
      LIST.classList.remove("list-back");
      INPUT_BOX.classList.remove("onsearch-box");
      document.querySelector(".list").innerHTML = "";
    }
  }
};
window.addEventListener("load", Suggest);
document.body.addEventListener("click", (e) => {
  e.stopPropagation();
  SEARCH_VALUE.classList.remove("onsearch-input");
  LIST.classList.remove("list-back");
  INPUT_BOX.classList.remove("onsearch-box");
  document.querySelector(".list").innerHTML = "";
});
document.querySelector(".search-box").addEventListener("click", (e) => {
  e.stopPropagation();
});
SEARCH_VALUE.addEventListener("keyup", Search);
