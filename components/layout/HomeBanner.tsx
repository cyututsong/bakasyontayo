



export default function HomeBanner() {

    return (

        <>
            <div className="w-full h-[70vh] flex flex-col items-center pt-20 bg-blue-100">
                <div className="container w-8xl ">

                    <div className="w-xl ">
                        <h1 className="text-2xl md:text-4xl lg:text-6xl leading-[1.1em]">
                            Begin Your <br/>
                            <b className=""> Fantastic Travel <br />
                            Experience</b> Here
                        </h1>
                        <p className="mt-10">
                            Discover handcrafted Travel Experiences that blend adventure
                            adventure and luxury, creating memories that last a lifetime
                        </p>

                        <div className="mt-5 w-full flex item-start gap-x-5">
                            <button className="px-5 py-2 bg-red-500 text-white rounded-sm font-medium cursor-pointer">Discover Now</button>
                            <button className="px-5 py-2 bg-yellow-500 text-black rounded-sm font-medium cursor-pointer">How it Works?</button>
                        </div>
                    </div>






                </div>
            </div>
        
        </>

    );

}