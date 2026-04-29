import { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section className="bg-foreground py-16 md:py-24">
      <div className="container-narrow px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            VK7 In Aktion
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-card mb-3">
            Erleben Sie die Kraft des Kobold
          </h2>
          <p className="text-card/55 text-base max-w-lg mx-auto leading-relaxed">
            Christa Abrigada zeigt Ihnen live, wie der Kobold VK7 Ihren Alltag revolutioniert.
          </p>
        </div>

        {/* Video player */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)] cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src="/christa-vk7.mp4"
            className="w-full h-auto block"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Centre play/pause — shows on hover or when paused */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
            style={{ opacity: hovered || !playing ? 1 : 0 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-5 ring-1 ring-white/20">
              {playing
                ? <Pause className="w-8 h-8 text-white" />
                : <Play  className="w-8 h-8 text-white translate-x-0.5" />
              }
            </div>
          </div>

          {/* Bottom-left: muted hint */}
          {muted && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/60 text-xs pointer-events-none select-none">
              <VolumeX className="w-3.5 h-3.5" />
              Ton aktivieren
            </div>
          )}

          {/* Bottom-right: mute toggle */}
          <button
            onClick={toggleMute}
            className="absolute bottom-3.5 right-4 bg-black/50 hover:bg-black/75 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors ring-1 ring-white/10"
            aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
          >
            {muted
              ? <VolumeX className="w-4 h-4" />
              : <Volume2 className="w-4 h-4" />
            }
          </button>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;
