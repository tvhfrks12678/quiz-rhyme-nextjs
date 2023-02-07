export const YoutubeEmbed = ({ src }: { src: string }) => {
  return (
    <iframe
      loading="lazy"
      className="w-5/6 aspect-video rounded-2xl"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  )
}
