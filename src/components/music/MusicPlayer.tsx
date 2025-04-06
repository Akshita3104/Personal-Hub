
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Music } from "lucide-react";

// Sample music playlist
const SAMPLE_PLAYLIST = [
  { id: 1, title: "Focus Flow", artist: "Study Beats", duration: "03:45" },
  { id: 2, title: "Deep Concentration", artist: "Mind Tunes", duration: "04:20" },
  { id: 3, title: "Ambient Work", artist: "Productivity", duration: "05:15" },
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(SAMPLE_PLAYLIST[0]);
  const [volume, setVolume] = useState([50]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (track: typeof SAMPLE_PLAYLIST[0]) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Music Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-md bg-dashboard-lightblue p-2">
              <Music className="h-6 w-6 text-dashboard-blue" />
            </div>
            <div>
              <p className="font-medium">{currentTrack.title}</p>
              <p className="text-xs text-slate-500">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">{currentTrack.duration}</div>
        </div>

        <div className="mb-4 h-1 w-full bg-slate-100 rounded-full">
          <div className={`h-1 bg-dashboard-blue rounded-full ${isPlaying ? "w-3/4" : "w-0"} transition-all duration-1000`} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500"
            onClick={() => {
              const currentIndex = SAMPLE_PLAYLIST.findIndex(
                (track) => track.id === currentTrack.id
              );
              const prevIndex = 
                (currentIndex - 1 + SAMPLE_PLAYLIST.length) % SAMPLE_PLAYLIST.length;
              handleTrackChange(SAMPLE_PLAYLIST[prevIndex]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" x2="5" y1="19" y2="5"></line>
            </svg>
          </Button>

          <Button
            onClick={togglePlay}
            className="h-10 w-10 rounded-full bg-dashboard-blue hover:bg-dashboard-blue/80 p-0 shadow-lg"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="4" height="16" x="6" y="4"></rect>
                <rect width="4" height="16" x="14" y="4"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500"
            onClick={() => {
              const currentIndex = SAMPLE_PLAYLIST.findIndex(
                (track) => track.id === currentTrack.id
              );
              const nextIndex = (currentIndex + 1) % SAMPLE_PLAYLIST.length;
              handleTrackChange(SAMPLE_PLAYLIST[nextIndex]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" x2="19" y1="5" y2="19"></line>
            </svg>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-slate-500"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <Slider 
            className="flex-1" 
            value={volume} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => setVolume(value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-slate-500"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Playlist</h4>
          <div className="space-y-2">
            {SAMPLE_PLAYLIST.map((track) => (
              <div
                key={track.id}
                className={`flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors ${
                  currentTrack.id === track.id
                    ? "bg-dashboard-lightblue text-dashboard-blue"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => handleTrackChange(track)}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {currentTrack.id === track.id && isPlaying ? (
                      <div className="flex space-x-0.5">
                        <div className="h-3 w-0.5 animate-pulse bg-dashboard-blue"></div>
                        <div className="h-4 w-0.5 animate-pulse bg-dashboard-blue"></div>
                        <div className="h-2 w-0.5 animate-pulse bg-dashboard-blue"></div>
                      </div>
                    ) : (
                      <Music className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs text-slate-500">{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
