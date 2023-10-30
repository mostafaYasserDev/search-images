const accessKey = "DoJs2F0ll8gZjVDhl42cckwzWPI8YNQMvzQuVI_ES6I";
const secretKey = "vec3GM5eLpOr9z6O8lDXA6tnqt7ICtR4lJQEBzfcsj4";
const inputSearch = document.getElementById("search-img");
const result = document.querySelector(".container");
const form = document.querySelector(".search");
form.children[1].style = "display:none";
const btn = document.getElementById("sub");
const more = document.querySelector(".show-more");

let inputValue = "";
let page = "1";

async function searchImage() {
  inputValue = inputSearch.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${accessKey}`;

  const request = await fetch(url);
  const data = await request.json();
  const results = data.results;
  const total = document.getElementById("total");
  total.textContent = data.total;
  if (page == 1) {
    result.innerHTML = "";
  }
  results.map((resultRe) => {
    const boxDiv = document.createElement("div");
    boxDiv.className = "box";
    const image = document.createElement("img");
    image.src = resultRe.urls.small;
    image.alt = resultRe.alt_description;
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = resultRe.links.html;
    link.append(image);
    boxDiv.append(link);
    result.append(boxDiv);
  });

  page++;

  if (page > 1) {
    more.style.display = "inline";
    form.children[1].style = "display:block";
    more.innerHTML = "عرض المزيد من الصور";
  }

  if (data.total == 0) {
    more.style.display = "none";
  }

  if (data.total_pages == 1 || data.results.length == 0) {
    more.innerHTML = "هذه كل الصور، نرجوا أن تكون وجدت ما تريد";
  }
}
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  page = 1;
  searchImage();
});
more.addEventListener("click", () => {
  searchImage();
});
