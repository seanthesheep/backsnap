import React, { useState } from "react";

const Compressor = () => {
    const [image, setImage] = useState("");
    return (
        <div>
            <div className="text-center">
                <p className="mt-6 text-base leading-7 text-gray-600">Upload an image to compress</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={() => console.log}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Upload Image
                    </button>
                    <button
                        onClick={() => console.log}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Compress
                    </button>
                    {image &&
                        <a href={image} download={true} className="text-sm font-semibold text-gray-900">
                            <svg className="w-3 h-3 mr-2 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                            </svg>
                            Download
                        </a>
                    }
                </div>
                <div className="flex items-center w-full justify-center">
                    <img src={image} className="max-h-96 mt-5" />
                </div>
            </div>
        </div>
    )
}

export default Compressor;