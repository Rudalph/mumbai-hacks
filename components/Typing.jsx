'use client'
import React, { useRef, useEffect } from 'react'
import Typed from 'typed.js';

const Typing = () => {
    const typingRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'MediSense',
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
            <h2 className="text-3xl font-bold leading-tight text-[#F94F50] sm:text-4xl lg:text-5xl z-30">
                <span ref={typingRef} />
                <br />
            </h2>
        </div>
    )
}

export default Typing