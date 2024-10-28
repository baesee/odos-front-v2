import React from 'react';

interface YouTubeEmbedProps {
    videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#000',
            }}
        >
            <iframe
                width="100%"
                height="56.25%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                }}
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;
