const API_URL = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=ahvShiro&api_key=46f9b34a93f8bcda246613595b1e8ffa&format=json&limit=3";

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getTrackImage(track) {
    if (!Array.isArray(track?.image)) {
        return "";
    }

    const preferredSizes = ["extralarge", "large", "medium", "small"];

    for (const size of preferredSizes) {
        const image = track.image.find((item) => item.size === size && item["#text"]);
        if (image?.["#text"]) {
            return image["#text"];
        }
    }

    return "";
}

function renderTracks(tracks) {
    const container = document.querySelector("#lastfm-tracks");

    if (!container) {
        return;
    }

    if (!tracks.length) {
        container.innerHTML = "<p>Nenhuma música recente encontrada.</p>";
        return;
    }

    container.innerHTML = tracks
        .map((track) => {
            const trackName = escapeHtml(track?.name || "Música desconhecida");
            const artistName = escapeHtml(track?.artist?.["#text"] || "Artista desconhecido");
            const cover = getTrackImage(track);
            const coverMarkup = cover
                ? `<img src="${escapeHtml(cover)}" alt="Capa do álbum de ${trackName}" class="track-cover">`
                : '<div class="track-cover track-cover-placeholder" aria-hidden="true">Sem capa</div>';

            return `
                <article class="track-card">
                    ${coverMarkup}
                    <div class="track-info">
                        <h2>${trackName}</h2>
                        <p>${artistName}</p>
                    </div>
                </article>
            `;
        })
        .join("");
}

export async function getLastFmData() {
    const container = document.querySelector("#lastfm-tracks");

    if (container) {
        container.innerHTML = "<p>Carregando músicas...</p>";
    }

    try {
        const resp = await fetch(`${API_URL}`);

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const data = await resp.json();
        const tracksResponse = data?.recenttracks?.track;
        const tracks = Array.isArray(tracksResponse)
            ? tracksResponse.slice(0, 3)
            : tracksResponse
                ? [tracksResponse]
                : [];

        renderTracks(tracks);
    } catch (error) {
        console.log(error);

        if (container) {
            container.innerHTML = "<p>Não foi possível carregar as músicas agora.</p>";
        }
    }
}