import { useEffect } from 'react';

const MicrofrontendSvelte = () => {
    useEffect(() => {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        
        const root = document.getElementById("root");
        if (root) {
        root.style.height = "100vh";
        root.style.width = "100vw";
        root.style.margin = "0";
        root.style.padding = "0";
        }
    
        return () => {
        document.body.style.margin = "";
        document.body.style.padding = "";
        if (root) {
            root.style.height = "";
            root.style.width = "";
            root.style.margin = "";
            root.style.padding = "";
        }
        }
        }, []);
        return (
        <>
        <iframe
            src='../../micro-frontend-svelte/dist/index.html'
            title='Microfrontend Svelte'
            style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            border: "none",
            }}
        ></iframe>
        </>
        );
    }

export default MicrofrontendSvelte