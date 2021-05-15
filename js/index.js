import gallery from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  galleryLink: document.querySelector(".gallery__link"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  arrList: [],

  insertList() {
    gallery.map(({ preview, original, description }) => {
      this.arrList.push(`<li class="gallery__item">
        <a
            class="gallery__link"
            href=""
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </li>`);
    });

    this.galleryList.insertAdjacentHTML(
      "afterbegin",
      [...this.arrList].join("")
    );
  },

  onPressKey(event) {
    let indexEl = gallery.findIndex(
      (gallery) => gallery.original === refs.lightboxImage.src
    );
    switch (event.code) {
      case "Escape":
        refs.lightbox.classList.remove("is-open");
        refs.lightboxImage.setAttribute("src", "");
        window.removeEventListener("keydown", refs.onPressKey);
        break;

      case "ArrowLeft":
        indexEl === 0 ? (indexEl = gallery.length - 1) : (indexEl -= 1);
        refs.lightboxImage.setAttribute("src", gallery[indexEl].original);
        break;

      case "ArrowRight":
        indexEl === gallery.length - 1 ? (indexEl = 0) : (indexEl += 1);
        refs.lightboxImage.setAttribute("src", gallery[indexEl].original);
        break;
    }
  },
};

refs.insertList();
refs.galleryList.addEventListener("click", (event) => {
  event.preventDefault();

  const dataSourse = event.target.dataset.source;

  if (event.target.classList.value === "gallery__image") {
    refs.lightbox.classList.add("is-open");
    refs.lightboxImage.setAttribute("src", dataSourse);
  }

  window.addEventListener("keydown", refs.onPressKey);
});

refs.lightbox.addEventListener("click", (event) => {
  if (
    event.target.dataset.action === "close-lightbox" ||
    event.target.className === "lightbox__overlay"
  ) {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImage.setAttribute("src", "");
  }

  window.removeEventListener("keydown", refs.onPressKey);
});
