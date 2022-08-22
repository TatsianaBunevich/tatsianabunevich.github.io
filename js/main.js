// typed text

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  // typed text
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // inject css
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".typewrite > .wrap { border-right: 0.08em solid rgba(114,114,114,0.8)}";
  document.body.appendChild(css);

  // preloader
  var el = document.getElementById("preloader-wrapper");
  el.style.display = "none";
  var body = document.querySelector("body");
  body.classList.remove("loading");

  // swiper

  var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    autoHeight: true,
    speed: 600,
    slidesPerView: 1,
    parallax: true,
    mousewheel: true,
  });

  swiper.on("slideChangeTransitionEnd", function () {
    const activeSlide = document.querySelector(".swiper-slide-active");
    const hasVerticalScrollbar =
      activeSlide.scrollHeight > activeSlide.clientHeight;

    if (hasVerticalScrollbar) {
      const scrollDifferenceTop =
        activeSlide.scrollHeight - activeSlide.swiperSlideSize;

      if (activeSlide.scrollTop === 0) activeSlide.scrollTop += 1;
      if (activeSlide.scrollTop === scrollDifferenceTop)
        activeSlide.scrollTop -= 2;
      swiper.mousewheel.disable();
      swiper.allowTouchMove = false;

      activeSlide.addEventListener("scroll", () => {
        if (
          activeSlide.scrollTop <= 0 ||
          scrollDifferenceTop - activeSlide.scrollTop <= 1
        ) {
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
        }
      });
    }
  });
};
