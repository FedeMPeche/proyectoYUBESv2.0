//VIDEO DE YOUTUBE 

document.querySelector('.youtube-container').addEventListener('click', function() {
    const videoId = this.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
  
    this.innerHTML = '';
    this.appendChild(iframe);
  });