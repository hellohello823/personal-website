// hobbies.page
tailwind.config = {
  theme: {
    extend: {
      colors: {
        pink: "#ffb3c6",
        "pink-deep": "#ff8fab",
        "pink-soft": "#ffe0ec",
        "pink-pale": "#fff0f6",
        brown: "#4a3a3a",
        "brown-mid": "#7a5c5c",
        "page-bg": "#fff5f7",
      },
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      animation: {
        "float-a": "floatA 4s ease-in-out infinite",
        "float-b": "floatB 5.5s ease-in-out infinite 0.8s",
        "float-c": "floatC 4.5s ease-in-out infinite 1s",
        "spin-slow": "spinSlow 14s linear infinite",
        "pulse-a": "pulseA 3.5s ease-in-out infinite",
      },
      keyframes: {
        floatA: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        floatB: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-7px) rotate(-2deg)" },
        },
        floatC: {
          "0%,100%": { transform: "translateY(0) rotate(45deg)" },
          "50%": { transform: "translateY(-9px) rotate(50deg)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseA: {
          "0%,100%": { opacity: ".3", transform: "scale(1)" },
          "50%": { opacity: ".6", transform: "scale(1.15)" },
        },
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hobby-card");
  const firstCard = cards[0];
  let firstCardReady = false;

  if (firstCard) {
    const firstTilt = "2.2deg";
    firstCard.style.setProperty("--tilt", firstTilt);
    firstCard.classList.add("hobby-card-entrance");

    firstCard.addEventListener(
      "animationend",
      () => {
        firstCard.style.opacity = "1";
        firstCardReady = true;
        firstCard.style.transform = `translateY(0) rotate(2.2deg) scale(1)`;
        firstCard.classList.remove('hobby-card-entrance');
      },
      { once: true }
    );
  }

  cards.forEach((card) => {
    const tiltDir = card.dataset.tilt;
    const tiltAngle = tiltDir === "left" ? "-2.2deg" : "2.2deg";
    const swingClass = tiltDir === "left" ? "h-swing-left" : "h-swing-right";

    card.style.setProperty("--tilt", tiltAngle);

    if (card !== firstCard) {
      card.style.transform = `rotate(${tiltAngle})`;
      card.style.transition = "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)";
    }

    card.addEventListener("mouseenter", () => {
      if (window.innerWidth <= 900) return;
      if (/*card === firstCard &&*/ !firstCardReady) return;
      card.classList.remove("h-swing-left", "h-swing-right");
      card.style.transition = "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)";
      card.style.transform = "rotate(0deg) translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
      if (window.innerWidth <= 900) return;
      if (/*card === firstCard &&*/ !firstCardReady) return;
      card.style.transition = "none";
      card.style.transform = "none";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.remove("h-swing-left", "h-swing-right");
          void card.offsetWidth;
          card.classList.add(swingClass);

          setTimeout(() => {
            card.classList.remove("h-swing-left", "h-swing-right");
            card.style.transition =
              "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)";
            card.style.transform = `rotate(${tiltAngle})`;
          }, 900);
        });
      });
    });
  });

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const tiltDir = entry.target.dataset.tilt;
          const tiltAngle = tiltDir === "left" ? "-2.2deg" : "2.2deg";
          entry.target.style.transition =
            "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)";
          entry.target.style.transform = `rotate(${tiltAngle})`;
        } else {
          entry.target.classList.remove("visible");
          entry.target.style.transition = "none";
          entry.target.style.transform = "";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  cards.forEach((card, i) => {
    if (i !== 0) revealObs.observe(card);
  });
});


//projects page
$(function () {
  var tlPath = document.getElementById("tl-line-path");
  var tlBox = document.getElementById("mainTimeline");
  var DASH = 4000;

  function updateLine() {
    if (!tlPath || !tlBox) return;
    var rect = tlBox.getBoundingClientRect();
    var totalH = tlBox.offsetHeight;
    var scrolled = Math.max(0, -rect.top + window.innerHeight * 0.5);
    var progress = Math.min(1, scrolled / totalH);
    tlPath.style.strokeDashoffset = DASH * (1 - progress);
  }

  var cardObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).addClass("visible");
          $(e.target).find(".tl-dot").addClass("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  $(".reveal-card").each(function () {
    cardObs.observe(this);
  });

  var genObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $(e.target).addClass("visible");
        else $(e.target).removeClass("visible");
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
  );

  $(".reveal").each(function () {
    genObs.observe(this);
  });

  $(window).on("scroll", function () {
    var s = $(this).scrollTop();
    $("[data-layer='slow']").css(
      "transform",
      "translateY(" + s * 0.055 + "px)",
    );
    $("[data-layer='fast']").css("transform", "translateY(" + s * 0.12 + "px)");
    updateLine();
  });

  updateLine();
});

//agribuddy details
$(function () {
  var revealObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $(e.target).addClass("visible");
        else $(e.target).removeClass("visible");
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
  );
  $(".reveal").each(function () {
    revealObs.observe(this);
  });

  $(window).on("scroll", function () {
    var s = $(this).scrollTop();
    $("[data-layer='slow']").css("transform", "translateY(" + s * 0.04 + "px)");
    $("[data-layer='fast']").css("transform", "translateY(" + s * 0.09 + "px)");
  });

  var barObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target)
            .find(".progress-bar-fill")
            .each(function () {
              var w = $(this).css("width");
              $(this).css("width", 0).animate({ width: w }, 1200);
            });
          barObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  $(".sticky-note, .bg-white").each(function () {
    barObs.observe(this);
  });
});

//equilife details
$(function () {
  var revealObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $(e.target).addClass("visible");
        else $(e.target).removeClass("visible");
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
  );
  $(".reveal").each(function () {
    revealObs.observe(this);
  });

  $(window).on("scroll", function () {
    var s = $(this).scrollTop();
    $("[data-layer='slow']").css("transform", "translateY(" + s * 0.04 + "px)");
    $("[data-layer='fast']").css("transform", "translateY(" + s * 0.09 + "px)");
  });

  var barObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target)
            .find(".progress-bar-fill")
            .each(function () {
              var w = $(this).css("width");
              $(this).css("width", 0).animate({ width: w }, 1200);
            });
          barObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  $(".sticky-note, .bg-white").each(function () {
    barObs.observe(this);
  });
});

//flipnlearn details
$(function () {
  var revealObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $(e.target).addClass("visible");
        else $(e.target).removeClass("visible");
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
  );
  $(".reveal").each(function () {
    revealObs.observe(this);
  });

  $(window).on("scroll", function () {
    var s = $(this).scrollTop();
    $("[data-layer='slow']").css("transform", "translateY(" + s * 0.04 + "px)");
    $("[data-layer='fast']").css("transform", "translateY(" + s * 0.09 + "px)");
  });

  var barObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target)
            .find(".progress-bar-fill")
            .each(function () {
              var w = $(this).css("width");
              $(this).css("width", 0).animate({ width: w }, 1200);
            });
          barObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  $(".sticky-note, .bg-white").each(function () {
    barObs.observe(this);
  });
});

//timelyne details
$(function () {
  var revealObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) $(e.target).addClass("visible");
        else $(e.target).removeClass("visible");
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
  );
  $(".reveal").each(function () {
    revealObs.observe(this);
  });

  $(window).on("scroll", function () {
    var s = $(this).scrollTop();
    $("[data-layer='slow']").css("transform", "translateY(" + s * 0.04 + "px)");
    $("[data-layer='fast']").css("transform", "translateY(" + s * 0.09 + "px)");
  });

  var barObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target)
            .find(".progress-bar-fill")
            .each(function () {
              var w = $(this).css("width");
              $(this).css("width", 0).animate({ width: w }, 1200);
            });
          barObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  $(".sticky-note, .bg-white").each(function () {
    barObs.observe(this);
  });
});
