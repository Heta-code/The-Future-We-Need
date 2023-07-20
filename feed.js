var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    centerSlide: 'true',
    spaceBetween: 40,
    fade: 'true',
    grabCursor: 'true',
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });