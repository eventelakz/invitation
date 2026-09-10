/* =====================================================
   EVENTELA.KZ
   JAVASCRIPT
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const weddingDate = new Date("2026-09-17T18:00:00+05:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.log("Countdown elements not found");
    return;
  }

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Запускаем сразу
updateCountdown();

// Обновляем каждую секунду
setInterval(updateCountdown, 1000);

/*
   СЮДА ПОТОМ ВСТАВИМ GOOGLE APPS SCRIPT URL.

   Например:

   const GOOGLE_SCRIPT_URL =
   "https://script.google.com/macros/s/XXXXXXXX/exec";
*/

const GOOGLE_SCRIPT_URL =
    "YOUR_GOOGLE_APPS_SCRIPT_URL";


/* =====================================================
   ELEMENTS
===================================================== */

const opening =
    document.getElementById("opening");

const envelope =
    document.getElementById("envelope");

const openButton =
    document.getElementById("openButton");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("weddingMusic");

const musicControl =
    document.getElementById("musicControl");

const guestForm =
    document.getElementById("guestForm");

const formSuccess =
    document.getElementById("formSuccess");


/* =====================================================
   OPEN INVITATION
===================================================== */

openButton.addEventListener("click", function () {

    envelope.classList.add("open");

    document.body.classList.remove("locked");


    setTimeout(function () {

        mainContent.classList.add("visible");

    }, 600);


    setTimeout(function () {

        opening.classList.add("closed");

    }, 1300);


    musicControl.classList.add("show");


    music.play().catch(function () {

        console.log(
            "Браузер заблокировал автоматический запуск музыки."
        );

    });

});


/* =====================================================
   MUSIC
===================================================== */

musicControl.addEventListener(
    "click",
    function () {

        if (music.paused) {

            music.play();

            musicControl.innerHTML =
                '<span class="music-icon">♫</span>';

        } else {

            music.pause();

            musicControl.innerHTML =
                '<span class="music-icon">×</span>';

        }

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const now = new Date();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   RSVP FORM
===================================================== */

guestForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const submitButton =
            guestForm.querySelector(
                ".dark-button"
            );


        submitButton.textContent =
            "Отправляем...";

        submitButton.disabled = true;


        const formData =
            new FormData(guestForm);


        /*
           Проверяем, настроен ли Google Script.
        */

        if (
            GOOGLE_SCRIPT_URL ===
            "YOUR_GOOGLE_APPS_SCRIPT_URL"
        ) {

            alert(
                "Google Sheets пока не подключён. Сначала добавьте ссылку Google Apps Script в script.js."
            );

            submitButton.textContent =
                "Отправить ответ";

            submitButton.disabled = false;

            return;

        }


        try {

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    body: formData,

                    mode: "no-cors"
                }
            );


            guestForm.reset();

            formSuccess.classList.add("show");

            submitButton.textContent =
                "Ответ отправлен";


        } catch (error) {

            console.error(error);

            alert(
                "Не удалось отправить ответ. Попробуйте ещё раз."
            );


            submitButton.textContent =
                "Отправить ответ";

            submitButton.disabled = false;

        }

    }
);


/* =====================================================
   SCROLL REVEAL
   Плавное появление элементов
===================================================== */

const revealElements = document.querySelectorAll(
  ".section, .photo, .editorial-photo, .countdown, .program, .location, .rsvp"
);

revealElements.forEach(function(element) {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  function(entries) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(function(element) {
  revealObserver.observe(element);
});


/* =====================================================
   SLOW AUTO SCROLL
   Медленная автоматическая прокрутка
===================================================== */

let autoScroll;
let autoScrolling = false;

function startAutoScroll() {

  if (autoScrolling) return;

  autoScrolling = true;

  autoScroll = setInterval(function() {

    window.scrollBy(0, 1);

  }, 70);

}


function stopAutoScroll() {

  clearInterval(autoScroll);

  autoScrolling = false;

}


/*
   Если гость сам начинает листать,
   автоматическая прокрутка останавливается.
*/

window.addEventListener(
  "touchstart",
  stopAutoScroll,
  { passive: true }
);

window.addEventListener(
  "wheel",
  stopAutoScroll,
  { passive: true }
);

window.addEventListener(
  "mousedown",
  stopAutoScroll
);


/*
   Начинаем автоскролл через 3 секунды
   после открытия приглашения.
*/

openButton.addEventListener(
  "click",
  function() {

    setTimeout(function() {

      startAutoScroll();

    }, 3000);

  }
);
