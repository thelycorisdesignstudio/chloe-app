import React from 'react';
import Image from 'next/image';

const MissionStatement: React.FC = () => {
    const assets = {
        juiceCup: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=200&h=200&fit=crop",
        banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
        balletDress: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=200&h=200&fit=crop",
        dummy: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&h=200&fit=crop",
    };

    return (
        <section 
          id="about"
          className="relative w-full overflow-hidden bg-[#F7F5F2] pt-32 pb-40"
          aria-labelledby="mission-heading"
        >
            <div className="absolute inset-x-0 top-0 h-full w-full flex justify-center pointer-events-none" aria-hidden="true">
                <div className="relative w-full max-w-[1440px] h-full"> 
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-[120%] bg-[#B3F5FF] rounded-[50%_50%_0_0] -translate-y-[10%]"></div>
                </div>
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center">
                <div className="flex justify-center mb-[-40px] relative z-20" aria-hidden="true">
                    <div className="w-[380px] h-[220px] relative">
                         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                            <div className="flex gap-14">
                                <div className="w-8 h-8 rounded-full bg-[#004D3F]"></div>
                                <div className="w-8 h-8 rounded-full bg-[#004D3F]"></div>
                            </div>
                            <div className="w-14 h-7 rounded-b-full bg-[#004D3F] mt-2"></div>
                         </div>
                    </div>
                </div>

                <div className="max-w-[1000px] mx-auto mt-20 relative">
                    
                    <div className="absolute -left-12 top-0 md:left-0 md:top-10 rotate-[-15deg] transition-transform hover:scale-110 hidden md:block" aria-hidden="true">
                        <div className="flex flex-col items-center">
                            <Image src={assets.juiceCup} alt="" width={100} height={100} className="object-contain" loading="lazy" />
                            <p className="font-hand text-[#004D3F] text-lg -mt-2">pack the drinks</p>
                        </div>
                    </div>

                    <div className="absolute -right-12 top-10 md:right-0 md:top-20 rotate-[15deg] transition-transform hover:scale-110 hidden md:block" aria-hidden="true">
                        <div className="flex flex-col items-center">
                            <Image src={assets.banana} alt="" width={110} height={110} className="object-contain" loading="lazy" />
                            <p className="font-hand text-[#004D3F] text-lg -mt-2">snaaacks</p>
                        </div>
                    </div>

                    <div className="absolute -left-16 bottom-10 md:left-[-40px] md:bottom-20 rotate-[-10deg] transition-transform hover:scale-110 hidden md:block" aria-hidden="true">
                        <div className="flex flex-col items-center">
                            <Image src={assets.balletDress} alt="" width={120} height={120} className="object-contain" loading="lazy" />
                            <p className="font-hand text-[#004D3F] text-lg -mt-2">ballet class</p>
                        </div>
                    </div>

                    <div className="absolute -right-16 bottom-20 md:right-[-20px] md:bottom-32 rotate-[12deg] transition-transform hover:scale-110 hidden md:block" aria-hidden="true">
                        <div className="flex flex-col items-center">
                            <Image src={assets.dummy} alt="" width={90} height={90} className="object-contain" loading="lazy" />
                            <p className="font-hand text-[#004D3F] text-lg -mt-2 whitespace-nowrap">pack the dummy</p>
                        </div>
                    </div>

                    <div className="absolute right-20 bottom-[-40px] hidden md:block rotate-[-5deg] transition-transform hover:scale-110" aria-hidden="true">
                         <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-white/0 mb-2 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🍎</div>
                            </div>
                            <p className="font-hand text-[#004D3F] text-lg -mt-2 whitespace-nowrap">mooooresnacks</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-8 relative z-10 px-4">
                        <h2 id="mission-heading" className="text-[#004D3F] font-black text-[42px] leading-[0.9] md:text-[80px] lg:text-[100px] tracking-tighter uppercase max-w-[900px]">
                            WE&apos;RE ON A<br />
                            MISSION TO<br />
                            HELP LIGHTEN<br />
                            PARENTS&apos;<br />
                            MENTAL LOAD
                        </h2>
                        
                        <p className="text-[#004D3F] font-bold text-lg md:text-2xl max-w-[600px] leading-snug">
                            Because making memories shouldn&apos;t be another thing on your to–do list.
                        </p>
                    </div>
                </div>

                <div className="mt-24 flex justify-center" aria-hidden="true">
                    <div className="relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-[-20px] items-end">
                            <div className="w-16 h-16 rounded-2xl bg-[#FF9B3F] border-2 border-[#004D3F] -rotate-12 translate-x-4"></div>
                            <div className="w-16 h-16 rounded-2xl bg-[#5271FF] border-2 border-[#004D3F] rotate-0 z-10 overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center bg-white text-xs">⚽</div>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-[#FF6B9B] border-2 border-[#004D3F] rotate-12 -translate-x-4"></div>
                        </div>

                        <div className="relative w-[150px] h-[150px] bg-[#B3F5FF] border-2 border-[#004D3F] rounded-[40px] flex items-center justify-center shadow-[4px_4px_0px_#004D3F] z-20 overflow-hidden">
                             <div className="flex flex-col items-center gap-1.5 mt-8">
                                <div className="flex gap-6">
                                    <div className="w-4 h-4 rounded-full bg-[#004D3F]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#004D3F]"></div>
                                </div>
                                <div className="w-8 h-4 rounded-b-full bg-[#004D3F]"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionStatement;