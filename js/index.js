import gallery from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  arrList: [],

  insertList() {
    gallery.map(({ preview, description }) => {
      arrList = `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${preview}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${preview}"
            alt="${description}"
            />
        </a>
        </li>`;
    });
    this.galleryList.insertAdjacentHTML(
      "afterbegin",
      [...this.arrList].join("")
    );
  },
};

refs.insertList();
