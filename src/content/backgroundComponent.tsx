import { Box } from "@chakra-ui/react";
import React from "react"; // Importar React para acceso a React.ReactNode
import { Button } from "@chakra-ui/react";
// import useColorMode from "@chakra-ui/react";

// Definiendo props para VideoBackground
interface VideoBackgroundProps {
    children?: React.ReactNode; // `children` puede ser cualquier elemento React
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ children }) => {
    // const { colorMode } = useColorMode();
    const videoRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Array of video sources
    const videoSources = [
        "../../assets/video1.mp4",
        "../../assets/video2.mp4",
        "../../assets/video3.mp4",
    ];

    // Get a random video source
    const randomVideoSource =
        videoSources[Math.floor(Math.random() * videoSources.length)];

    const [isVideoForeground, setIsVideoForeground] = React.useState(false); // [1]

    const handleSwitchClick = () => {
        setIsVideoForeground(!isVideoForeground);
    };

    const handleMetadataLoaded = (
        event: React.SyntheticEvent<HTMLVideoElement, Event>
    ) => {
        const target = event.target as HTMLVideoElement;
        target.currentTime = Math.random() * target.duration;
    };

    const [videoSource, setVideoSource] = React.useState(randomVideoSource);

    const handleVideoSwitchClick = () => {
        const currentVideoIndex = videoSources.indexOf(videoSource);
        const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        setVideoSource(videoSources[nextVideoIndex]);
        setIsLoading(true);
        setIsVideoForeground(!isVideoForeground);
        if (videoRef.current) {
            (videoRef.current as HTMLVideoElement).load();
        }
        console.log("Video source changed to: ", videoSource[nextVideoIndex]);
    };

    return (
        <Box height="100vh" width="100vw" overflow="hidden" position="relative">
            <Button
                onClick={handleSwitchClick}
                position="absolute"
                top="0.5rem"
                left="4rem"
                zIndex="2147483647"
            >
                Switch HUD
            </Button>
            <Button
                onClick={handleVideoSwitchClick}
                position="absolute"
                top="0.5rem"
                left="12rem"
                zIndex="2147483647"
            >
                Switch Video
            </Button>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onLoadedMetadata={handleMetadataLoaded}
                onCanPlay={() => setIsLoading(false)}
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: isVideoForeground ? 2147483640 : -1,
                    filter: isVideoForeground
                        ? "contrast(1.2) saturate(1.3) brightness(1.1) sharpen(0.8)"
                        : "contrast(1.2) saturate(1.3) brightness(1.1) blur(6px)",
                    // "blur(6px) grayscale(0.8) brightness(0.7)
                    transition: "opacity 1s",
                    opacity: isLoading ? 0 : 1,
                }}
            >
                <source src={randomVideoSource} type="video/mp4" />
                Tu navegador no soporta el tag de video.
            </video>
            {children} {/* Renderiza los children pasados al componente */}
        </Box>
    );
};

export default VideoBackground;
