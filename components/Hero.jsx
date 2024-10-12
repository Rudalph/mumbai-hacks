"use client"
import React, { useRef, useEffect } from 'react'
import Typed from 'typed.js';
import Navbar from './Navbar';

const Hero = () => {

    const typingRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'BANK FUSION',
            ],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 3000,
            loop: true,
            showCursor: true,
        };

        const typingInstance = new Typed(typingRef.current, options);

        return () => {
            typingInstance.destroy();
        };
    }, []);

    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://www.kaleyra.com/wp-content/uploads/Conversation-banking-with-ai.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-75"></div>
                <div className="hero-content text-neutral-content text-center lg:mt-20">
                    <div className="max-w-md lg:mr-16">
                        <h1 className="mb-5 lg:text-5xl text-2xl font-bold text-[#FFD066]"><span ref={typingRef} /></h1>
                        <p className="mb-5 font-semibold">
                        Elevating banking excellence with peak performance and passionate service.
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero