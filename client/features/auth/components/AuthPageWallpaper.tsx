"use client"
import Image from "next/image"

function AuthPageWallpaper() {
  return (
    <div className="absolute w-full h-full">
      <Image
      src={"/movie_gallery_wallpepar.jpg"} 
      alt="auth page wallpaper."
      fill 
      quality={100}
      objectFit="cover"
      />
      <div className="absolute  bg-[#000000ed] w-full h-full z-10"></div>
    </div>
  )
}

export default AuthPageWallpaper
