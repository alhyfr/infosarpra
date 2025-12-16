import React, { useRef, useEffect, useState } from 'react';

export default function Marquee({
    children,
    speed = 40,
    pauseOnHover = true,
    direction = 'up',
    className = ''
}) {
    const containerRef = useRef(null);
    const [duration, setDuration] = useState(20);

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.scrollHeight / 2;
            // Calculate duration based on height and speed
            // speed is pixels per second, so duration = height / speed
            const calculatedDuration = height / speed;
            setDuration(calculatedDuration);
        }
    }, [children, speed]);

    return (
        <div
            className={`relative overflow-hidden h-full w-full ${className}`}
            style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
        >
            <div
                ref={containerRef}
                className={`flex flex-col ${pauseOnHover ? 'hover:pause-animation' : ''}`}
                style={{
                    animation: `marquee-${direction} ${duration}s linear infinite`,
                }}
            >
                {/* Original content */}
                <div className="flex flex-col">
                    {children}
                </div>
                {/* Duplicated content for seamless loop */}
                <div className="flex flex-col" aria-hidden="true">
                    {children}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-up {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }

                @keyframes marquee-down {
                    0% {
                        transform: translateY(-50%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                .hover\\:pause-animation:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
        </div>
    );
}
