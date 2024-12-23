const audio = document.getElementById('audio');
audio.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});
audio.addEventListener('loadeddata', () => {
    console.log('Audio loaded successfully');
});
