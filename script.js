/* =========================
   OPEN INVITATION
========================= */

function openInvitation() {

    const intro = document.getElementById("intro");
    const main = document.getElementById("main");
    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");


    // Показываем сайт

    main.classList.add("visible");


    // Убираем заставку

    setTimeout(function () {

        intro.classList.add("hidden");

    }, 100);


    // Показываем кнопку музыки

    musicButton.classList.add("show");


    // Запускаем музыку

    music.play().catch(function(error) {

        console.log("Музыка не запустилась:", error);

    });

}


/* =========================
   MUSIC
========================= */

function toggleMusic() {

    const music = document.getElementById("music");
    const button = document.getElementById("musicButton");


    if (music.paused) {

        music.play();

        button.innerHTML = "♫";

    } else {

        music.pause();

        button.innerHTML = "🔇";

    }

}
