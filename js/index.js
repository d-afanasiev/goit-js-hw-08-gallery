import gallery from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  galleryLink: document.querySelector(".gallery__link"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
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
    console.dir(event);
    console.log(event.code);
    if (event.code === "Escape") {
      refs.lightbox.classList.remove("is-open");
      refs.lightboxImage.setAttribute("src", "");
      window.removeEventListener("keydown", refs.onRemoveLightbox);
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
