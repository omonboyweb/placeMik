const banner = document.querySelector(".hero__banner")
const proBlock = document.querySelector('.product__block')
const viewMore = document.querySelector(".viewMore")

function bannerGet(data) {
    banner.innerHTML = data.slice(0, 1).map((item) => {
        return `
          <div>
              <img src="${item.img}" alt="" />
            </div>
        `
    }).join('')
}
async function getdataBan() {
    try {
        const URL = await fetch("https://market-backend-zeta.vercel.app/banners");
        const res = await URL.json()
        bannerGet(res)
    } catch (error) {
        console.log(error);
    }
}
getdataBan()


function proInner(data, counts) {
    proBlock.innerHTML = data.slice(0, counts).map((item) => {

        return `
        <div class="card">
              <div class="card__img">
                <img src="${item.img}" alt="${item.title}" />
              </div>
              <div class="card__content">
                <span class="card-name">${item.title}</span>
                <span class="card-brand">${item.brand}</span>
                <div class="cost">
                  <span>Price</span>
                  <span>${item.price}</span>
                </div>
              </div>
            </div>
        `
    }).join('')
}

function view(count) {

    viewMore.addEventListener("click", () => {
        counts = count.length;
        proInner(count, counts)


    })
}
async function getPro() {
    try {
        const URL = await fetch("https://market-backend-zeta.vercel.app/computers");
        const res = await URL.json()
        view(res)
        proInner(res, 8)

    } catch (error) {
        console.log(error);
    }
}


getPro()