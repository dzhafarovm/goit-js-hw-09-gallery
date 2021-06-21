import './sass/main.scss';

import { galleryItems } from './js/gallery';


// Элементы
const ulEl = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const overleyEl = document.querySelector('.lightbox__overlay');
const modalImg = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
let currentIndex;


// --1--
createGallery(galleryItems);
function createGallery(items) {
  const markup = items.map((item, idx) =>
    `
    <li class="gallery__item">
      <a class="gallery__link"
      href="${item.original}"
      >
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          data-index="${idx}"
          alt="${item.description}"
        />
      </a>
   </li>
    `
  ).join('');
  ulEl.innerHTML = markup
};


// --2--
ulEl.addEventListener('click', onPictureClick);
function onPictureClick(evt) {
  evt.preventDefault();
  
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  
  modal.classList.add('is-open');
  modalImg.src = evt.target.dataset.source;
  modalImg.alt = evt.target.alt;
  currentIndex = Number(evt.target.dataset.index);
  document.addEventListener('keydown', changeImgOnClick);
};


// --3--
closeModalBtn.addEventListener('click', closeModal);
overleyEl.addEventListener('click', closeModal);

function changeImgOnClick(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  } else if (evt.code === 'ArrowRight') {
    onRight();
  } else if (evt.code === 'ArrowLeft') {
    onLeft();
  };
};

function closeModal() {
  modal.classList.remove('is-open');
  modalImg.src = '';
  modalImg.alt = '';
  document.removeEventListener('keydown', changeImgOnClick);
};

function onRight() { 
  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  } changeImg()
}

function onLeft() {
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  } else {
    currentIndex -= 1;
  } changeImg()
}

function changeImg() {
  modalImg.src = galleryItems[currentIndex].original;
  modalImg.alt = galleryItems[currentIndex].description;
}