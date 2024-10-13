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
        <div className='bg-white'>
            <div className="hero min-h-screen bg-[#FFFFFF]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="https://miro.medium.com/v2/resize:fit:1200/1*9I6EIL5NG20A8se5afVmOg.gif"
                        className="max-w-sm rounded-lg  bg-transparent" />
                    <div>
                        <h1 className="text-5xl font-bold text-[#009AE3]"><span ref={typingRef} /></h1>
                        <br />
                        <p className="py-6">
                            We elevate banking excellence by delivering peak performance and passionate service.
                            Our focus is on providing personalized, seamless experiences that meet each customer’s unique needs.
                        </p>
                        <br />
                        <div className='flex justify-start gap-10'>
                            <input type="text" placeholder="Subscribe" className="input input-bordered w-full max-w-xs" />
                            <button className="btn bg-[#008AF7] hover:bg-[#008AF7] text-white">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero