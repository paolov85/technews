let loading = false;

document.getElementById('loadMoreBtn').addEventListener('click', function() {
    if (loading) return;
    loading = true;

    // mostra il loader
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loadMoreBtn').style.display = 'none';

    // simula il caricamento di nuovi dati (richiama la funzione di callback dopo un certo intervallo di tempo)
    setTimeout(function() {
        // aggiungi nuovi elementi alla tua pagina (es: fetch data from server)

        // nascondi il loader
        document.getElementById('loading').style.display = 'none';
    document.getElementById('loadMoreBtn').style.display = 'block';


        // aggiorna lo stato di caricamento
        loading = false;
    }, 2000);
});