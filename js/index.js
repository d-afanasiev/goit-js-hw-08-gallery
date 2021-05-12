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

  onRemoveLightbox(event) {
    let indexEl = gallery
      .map((gallery) => gallery.original)
      .indexOf(refs.lightboxImage.src);
    if (event.code === "Escape") {
      refs.lightbox.classList.remove("is-open");
      refs.lightboxImage.setAttribute("src", "");
      window.removeEventListener("keydown", refs.onRemoveLightbox);
    } else if (event.code === "ArrowLeft") {
      if (indexEl === 0) {
        indexEl = gallery.length - 1;
      } else {
        indexEl -= 1;
      }
      refs.lightboxImage.setAttribute("src", gallery[indexEl].original);
    } else if (event.code === "ArrowRight") {
      if (indexEl === gallery.length - 1) {
        indexEl = 0;
      } else {
        indexEl += 1;
      }
      refs.lightboxImage.setAttribute("src", gallery[indexEl].original);
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

  window.addEventListener("keydown", refs.onRemoveLightbox);
});

refs.lightbox.addEventListener("click", (event) => {
  if (
    event.target.dataset.action === "close-lightbox" ||
    event.target.className === "lightbox__overlay"
  ) {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImage.setAttribute("src", "");
  }

  window.removeEventListener("keydown", refs.onRemoveLightbox);
});
