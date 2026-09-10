/* =====================================================
   EVENTELA.KZ
   JAVASCRIPT
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const weddingDate = new Date("2026-09-17T18:00:00");


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
