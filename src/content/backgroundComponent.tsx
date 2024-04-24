import { Box } from "@chakra-ui/react";
import React from "react"; // Importar React para acceso a React.ReactNode
import { Button } from "@chakra-ui/react";

// Definiendo props para VideoBackground
interface VideoBackgroundProps {
    children?: React.ReactNode; // `children` puede ser cualquier elemento React
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ children }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
    const videoSources: string[] = [
        "https://www.youtube.com/embed/NrVFAOrmSLE?autoplay=1&controls=0&loop=1&playlist=NrVFAOrmSLE&mute=1&modestbranding=1&rel=0",
        "https://www.youtube.com/embed/tlmn8HMg2aw?autoplay=1&controls=0&loop=1&playlist=tlmn8HMg2aw&mute=1&modestbranding=1&rel=0",
        "https://www.youtube.com/embed/avSAVXPJl0U?autoplay=1&controls=0&loop=1&playlist=avSAVXPJl0U&mute=1&modestbranding=1&rel=0",
    ];

    const [isVideoForeground, setIsVideoForeground] = React.useState(false); // [1]

    const handleVideoFilter = () => {
        setIsVideoForeground(!isVideoForeground);
    };

    const handleVideoSwitchClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        setCurrentVideoIndex(nextVideoIndex);
    };

    return (
        <Box
            height="100vh"
            width="100vw"
            overflow="hidden"
            position="relative"
            style={{ position: "relative", zIndex: 0 }}
        >
            <Button
                onClick={handleVideoSwitchClick}
                position="absolute"
                top="0.5rem"
                left="4rem"
                zIndex="2147483647"
            >
                Switch Video
            </Button>
            <Button
                onClick={handleVideoFilter}
                position="absolute"
                top="0.5rem"
                right="6rem"
                zIndex="2147483647"
            >
                {isVideoForeground ? "Unblur" : "Blur"} Video
            </Button>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            >
                <iframe
                    src={videoSources[currentVideoIndex]}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "120vw",
                        height: "120vh",
                        transform: "translate(-50%, -50%) scale(1.2)",
                        objectFit: "cover",
                        filter: isVideoForeground
                            ? "blur(6px)"
                            : "contrast(120%) saturate(110%)",
                    }}
                ></iframe>
            </div>
            {children}
        </Box>
    );
};

export default VideoBackground;