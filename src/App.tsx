import './App.css'
import { CardGrid } from './components/CardGrid';
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid';
import ResumeViewer from './components/ResumeViewer';

/*
🎙 Glowing button should listen to the mic and record audio
📝 Transcribe the audio to text
🤖 Send the text to the AI API
🔊 Speak out any response from the AI API
🕐 Handle short pauses — treat them as part of one prompt and send only the latest spoken text
✂️ If character limit exceeds, speak a warning: “Please ask a shorter question.”

*/

function App() {
  
  
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">

      <Hero />

      <CardGrid /> 

      <ResumeViewer />
      
      <ProjectsGrid />
      <footer className="py-6 text-center">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Shashi. All rights reserved.</p>
      </footer>
    </main>
  );
}


export default App
