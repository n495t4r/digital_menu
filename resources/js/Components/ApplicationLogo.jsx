import { useState, useEffect } from 'react';

const ApplicationLogo = ({ className = '' }) => {
    const [imageExists, setImageExists] = useState(false);
    const logoPath = '/storage/img/appLogo.png';

    useEffect(() => {
        // Get the full URL by combining window.location.origin and logoPath
        const fullPath = `${window.location.origin}${logoPath}`;

        fetch(logoPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setImageExists(true);
            })
            .catch((error) => {
                console.log(`Image check failed for path: ${fullPath}`);
                console.log('Error details:', error.message);
                setImageExists(false);
            });
    }, []);

    if (imageExists) {
        return (
            <img 
                src={logoPath}
                alt="Logo"
                className={className}
            />
        );
    }

    // Fallback SVG
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={className}>
            {/* Outer circle */}
            <circle cx="250" cy="250" r="240" fill="black"/>
            
            {/* Inner white circle border */}
            <circle cx="250" cy="250" r="220" fill="none" stroke="white" strokeWidth="4"/>
            
            {/* Text "PEVA" with more stylized font */}
            <text x="250" y="240" 
                textAnchor="middle" 
                fill="white" 
                fontFamily="'Arial Black', Impact, sans-serif"
                fontSize="120px"
                fontWeight="700">
                PEVA
            </text>
            
            {/* Text "RESTAURANT" */}
            <text x="250" y="290" 
                textAnchor="middle" 
                fill="white" 
                fontFamily="Arial, sans-serif"
                fontSize="35px"
                letterSpacing="2px">
                RESTAURANT
            </text>
            
            {/* Stylized orange swoosh with gradient */}
            <defs>
                <linearGradient id="swooshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#FF6B35" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.6"/>
                </linearGradient>
            </defs>
            
            {/* More complex curved swoosh */}
            <path d="M130 320 C180 330, 250 335, 370 320 S380 325, 390 328" 
                fill="none" 
                stroke="url(#swooshGradient)" 
                strokeWidth="6"
                strokeLinecap="round"/>
            
            {/* "a nourishing experience" text */}
            <text x="250" y="355" 
                textAnchor="middle" 
                fill="white" 
                fontFamily="'Times New Roman', serif"
                fontSize="22px"
                fontStyle="italic">
                a nourishing experience
            </text>
        </svg>
    );
};

export default ApplicationLogo;