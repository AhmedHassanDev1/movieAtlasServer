"use client"

import { genImageUrl } from "@/utils/url"
import Image from "next/image"


function GradientBlurOverlay() {
    return <div
        className="absolute w-full h-full cinematic-overlay backdrop-blur-xs"
    ></div>
}


function BackDrop({ url }: { url: string | null }) {
    const backDropUrl = genImageUrl(url, "backdrop")
    console.log(backDropUrl);

    return (
        <div className="absolute w-full h-full z-1 ">
            {backDropUrl && (
                <Image
                    src={backDropUrl}
                    fill
                    objectFit="cover"
                    alt=" "
                    quality={100}
                />
            )}
            <GradientBlurOverlay />
        </div>
    )
}

export default BackDrop
