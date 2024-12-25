import {BEmbed} from "./components/Embed/BEmbed";

const VIDEO_SRC = "https://www.youtube.com/watch?v=iPIZNSgJHnI"

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bod">Embed</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Video(16:9)</h2>
            <BEmbed 
              controls
              autoPlay
              src={VIDEO_SRC}
              className="round-lg shadow-lg"
            >
            </BEmbed>
          </div>
        </div>
    </div>
  )
}