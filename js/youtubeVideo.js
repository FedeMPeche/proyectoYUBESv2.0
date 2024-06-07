function playYouTubeVideo() {
    var youtubeContainer = document.getElementById('youtube');
    var youtubeEmbed = 'https://youtu.be/HwWjmEEh_OA?si=Uhc3wE2iuuvELYur';

    // Crear un elemento iframe para el video de YouTube
    var iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = youtubeEmbed;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    // Reemplazar la imagen de vista previa con el iframe del video de YouTube
    youtubeContainer.innerHTML = '';
    youtubeContainer.appendChild(iframe);
}
