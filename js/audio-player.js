'use client';

function initAudioPlayer() {
    // Get DOM elements with error handling
    const getElement = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with id '${id}' not found`);
            return null;
        }
        return element;
    };

    const audio = getElement('audio');
    const playPauseBtn = getElement('play-pause');
    const rewindBtn = getElement('rewind');
    const forwardBtn = getElement('forward');
    const volumeBtn = getElement('volume');

    // Check if all elements are found
    if (!audio || !playPauseBtn || !rewindBtn || !forwardBtn || !volumeBtn) {
        console.error('Required elements not found');
        return;
    }

    // Array of audio tracks with error handling
    const tracks = ['./audio/fritz02.mp3', './audio/fritz03.mp3'];

    let currentTrackIndex = 0;
    let isPlaying = false;
    let isMuted = false;

    // Initialize first track with error handling
    try {
        audio.src = tracks[currentTrackIndex];
        audio.load(); // Preload the audio
    } catch (error) {
        console.error('Error loading audio:', error);
    }

    // Play/Pause function with error handling
    function togglePlayPause() {
        try {
            if (isPlaying) {
                audio.pause();
                playPauseBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                `;
            } else {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            playPauseBtn.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="6" y1="4" x2="6" y2="20"></line>
                                <line x1="18" y1="4" x2="18" y2="20"></line>
                            </svg>
                        `;
                        })
                        .catch((error) => {
                            console.error('Error playing audio:', error);
                        });
                }
            }
            isPlaying = !isPlaying;
        } catch (error) {
            console.error('Error in togglePlayPause:', error);
        }
    }

    // Previous track function with error handling
    function playPreviousTrack() {
        try {
            currentTrackIndex =
                currentTrackIndex === 0
                    ? tracks.length - 1
                    : currentTrackIndex - 1;
            audio.src = tracks[currentTrackIndex];
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error('Error playing previous track:', error);
                });
            }
        } catch (error) {
            console.error('Error in playPreviousTrack:', error);
        }
    }

    // Next track function with error handling
    function playNextTrack() {
        try {
            currentTrackIndex =
                currentTrackIndex === tracks.length - 1
                    ? 0
                    : currentTrackIndex + 1;
            audio.src = tracks[currentTrackIndex];
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error('Error playing next track:', error);
                });
            }
        } catch (error) {
            console.error('Error in playNextTrack:', error);
        }
    }

    // Toggle mute function with error handling
    function toggleMute() {
        try {
            audio.muted = !audio.muted;
            isMuted = audio.muted;
            volumeBtn.innerHTML = isMuted
                ? `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            `
                : `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
            `;
        } catch (error) {
            console.error('Error in toggleMute:', error);
        }
    }

    // Add event listeners with error handling
    playPauseBtn.addEventListener('click', togglePlayPause);
    rewindBtn.addEventListener('click', playPreviousTrack);
    forwardBtn.addEventListener('click', playNextTrack);
    volumeBtn.addEventListener('click', toggleMute);

    // Add error handling for audio element
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
    });
}

// Wait for DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioPlayer);
} else {
    initAudioPlayer();
}
