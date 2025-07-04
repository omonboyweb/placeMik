import { baseUrl } from "./server.js"
const banner = document.querySelector(".hero__banner")
const proBlock = document.querySelector('.product__blocks')
const laptop = document.querySelector(".laptop__block")
const phone = document.querySelector(".phone__block")
const products = document.querySelector(".main")
const modal = document.querySelector(".modal")
const count = document.querySelector(".count")
const removeModeal = document.querySelector(".removeModeal")
let newArr = getStorage("wishList") || []
function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getStorage(key) {
    const dataStorage = JSON.parse(localStorage.getItem(key));
    return dataStorage || []
}

function bannerGet(data) {
    banner.innerHTML = data.slice(0, 1).map((item) => {
        return `
          <div>
              <img src="${item.img}" alt="" loading="lazy" />
            </div>
        `}).join('')
}
async function getdataBan() {
    try {
        const URl = await baseUrl("banners");
        bannerGet(URl)
    } catch (error) {
        console.log(error);
    }
}
getdataBan()
//////////
function noutbookIn(data) {
    proBlock.innerHTML = data.map((item) => {
        return `
 <div class="card">
    <div class="card__img">
        <img src="${item.img}" alt="${item.title}"  loading="lazy"  />
    </div>
    <div class="card__content">
        <span class="card-name">${item.title}</span>
        <span class="card-brand">${item.brand}</span>
        <div class="cost">
            <span>Price</span>
            <span>${item.price}</span>
        </div>
        <div class="add">
            <span class="addWishlist" data-path="computers" data-id="${item.id}">+</span>
          </div>
    </div>
</div>
        `
    }).join("")

};

async function noutbook() {
    try {
        const res = await baseUrl("computers");
        noutbookIn(res)
    } catch (error) {
        console.log(error);
    }
}
noutbook()

function laptopIn(data) {
    laptop.innerHTML = data.map((item) => {
        return `
 <div class="card"">
    <div class="card__img">
        <img src="${item.img}" alt="${item.title}"  loading="lazy"  />
    </div>
    <div class="card__content">
        <span class="card-name">${item.title}</span>
        <span class="card-brand">${item.brand}</span>
        <div class="cost">
            <span>Price</span>
            <span>${item.price}</span>
        </div>
        <div class="add">
            <span class="addWishlist" data-path="sport" data-id="${item.id}">+</span>
          </div>
    </div>
</div>
        `
    }).join("")

}

async function laptops() {
    try {
        const res = await baseUrl("sport");
        laptopIn(res)
    } catch (error) {
        console.log(error);

    }
}

laptops()


//// Phone inner html 

function phoneIn(data) {
    phone.innerHTML = data.map((item) => {
        return `
 <div class="card">
        <div class="card__img">
          <img src="${item.img}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="card__content">
          <span class="card-name">${item.title}</span>
          <span class="card-brand">${item.brand}</span>
          <div class="cost">
            <span>Price</span>
            <span>${item.price}</span>
          </div>
          <div class="add">
            <span class="addWishlist"  data-path="phones" data-id="${item.id}">+</span>
          </div>
        </div>
      </div>
        `
    }).join("");
}

async function phones() {
    try {
        const res = await baseUrl("phones");
        phoneIn(res)
    } catch (error) {
        console.log(error);

    }
}

phones();

products.addEventListener("click", async (e) => {
    const ids = Number(e.target.dataset.id);
    const path = e.target.dataset.path;
    if (e.target.dataset.id) {
        const product = await baseUrl(path, ids)
        const similarId = newArr.some(itemId => itemId.id === product.id)
        if (similarId) {
            newArr = newArr.filter(item => item.id !== product.id)
        } else {
            newArr.push(product)
        }
    }
    setStorage("wishList", newArr)
    wishCount();

})


function wishCount() {
    count.textContent = newArr.length
    if (newArr.length > 0) {
        count.style.display = "block"
    } else {
        count.style.display = "none"
    }
}
wishCount();


count.addEventListener("click", (e) => {
    modal.classList.add("modal", "active");
    modal.innerHTML = newArr.map(item => {
        return `
<div class="modal-content">
    <img src="${item.img}" alt="" id="modal-img" />
    <div class="modal-details">
      <h2 id="modal-title">${item.title}</h2>
    </div>
  </div>

        `
    }).join("")
})

