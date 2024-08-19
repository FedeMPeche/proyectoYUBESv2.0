// Asegúrate de que el script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    var previewImage = document.getElementById('preview-image');

    previewImage.addEventListener('click', function () {
        playYouTubeVideo();
    });
});

function playYouTubeVideo() {
    var previewImageContainer = document.getElementById('preview-image');
    var youtubeEmbed = 'https://www.youtube.com/embed/LL34IlZkEvg?si=X3IGOE3NpyPeT9BA&autoplay=1'; // URL de embed con autoplay

    // Crear un elemento iframe para el video de YouTube
    var iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = youtubeEmbed;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    // Reemplazar la imagen de vista previa con el iframe del video de YouTube
    previewImageContainer.innerHTML = '';
    previewImageContainer.appendChild(iframe);
}


