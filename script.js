const botonBuscar = document.getElementById("buscar");
botonBuscar.addEventListener("click", buscarAnime);
async function buscarAnime() {
    const nombreAnime = document.getElementById("busqueda").value;
    const resultado = document.getElementById("info");
    const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        title {
          romaji
          english
        }
        episodes
        averageScore
        coverImage {
          large
        }
      }
    }
  `;

    const variables = {
        search: nombreAnime
    };

    try {
      resultado.style.display = "block";
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        const data = await response.json();
        const anime = data.data.Media;

        resultado.innerHTML = `
      <h2>${anime.title.romaji}</h2>
      <p><strong>Inglés:</strong> ${anime.title.english || "No disponible"}</p>
      <p><strong>Episodios:</strong> ${anime.episodes}</p>
      <p><strong>Puntuación:</strong> ${anime.averageScore}</p>
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
    `;
    } catch (error) {
        resultado.innerHTML = "<p>Error al buscar el anime</p>";
        console.error(error);
    }
} 