import { Box, Typography } from "@mui/material";
import { VideoAsset } from "../../types/media";
import Image from "next/image";
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { getYoutubeThumbnail } from "@/utils/url";

type Props = {
  video: VideoAsset;
  active?: boolean;
  onClick?: () => void;
};

export default function VideoCard({ video  }: Props) {


 
  
  const thumbnail = getYoutubeThumbnail(video.url) as string

  return (
    <Box
   
      sx={{
        // width:"23%",
        aspectRatio: "16/9",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        display:"flex",
        justifyContent:"center", 
        transition: ".2s",

        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Image
        src={thumbnail}
        fill
        alt={video.name}
        style={{
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.85), transparent)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          display:"flex",
          alignItems:"center",
          gap:1,
          bottom: 12,
          left: 12,
          right: 12,
          fontWeight: 600,
        }}
      >
        <PlayCircleOutlinedIcon sx={{ fontSize: 40 }}/>
     
      </Box>
    </Box>
  );
}