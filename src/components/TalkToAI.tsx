import { useEffect, useRef, useState } from 'react';
import { GlowingCircle } from "./GlowingCircle";
import askProfessional, { speakText } from '../api/askProfessional';

type TalkToAIProps = {
    isTalkingToAI: boolean,
    setIsTalkingToAI: (updated: boolean) => void,
}

export default function TalkToAI({
    isTalkingToAI,
    setIsTalkingToAI,
}: TalkToAIProps) {
    const [hightTalkToAI, setHightTalkToAI] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [isProcessingAIRequest, setIsProcessingAIRequest] = useState(false);

    const handleTalkToAIWithTranscript = async (finalText: string) => {
        console.log({finalText})
        if(finalText.length > 1000) {
            const utterance = new SpeechSynthesisUtterance("Please ask a shorter question.");
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
            return;
        }
        setIsProcessingAIRequest(true);
        try {
            const response = await askProfessional(finalText);
            console.log("🧠 AI Response:", response);
    
            // TODO: Display in UI
        } catch (err) {
            console.error("❌ Error talking to AI:", err);
        } finally {
            setIsProcessingAIRequest(false);
        }
    };
    

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("SpeechRecognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.continuous = true;

        recognition.onstart = () => {
            console.log("Listening...");
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript && !isProcessingAIRequest) {
                handleTalkToAIWithTranscript(finalTranscript);
            }

        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Error occurred in recognition:", event.error);
        };

        recognition.onend = () => {
            console.log("Recognition ended");
            setIsTalkingToAI(false);
        };

        // Tooltip logic
        const highlightCount = parseInt(localStorage.getItem("talk_ai_highlight") || "0");
        if (highlightCount < 2) {
            setHightTalkToAI(true);
            localStorage.setItem("talk_ai_highlight", (highlightCount + 1).toString());

            setTimeout(() => setHightTalkToAI(false), 3000);
        }
    }, []);


    const startListening = () => {
        console.log("Start Listening", { isTalkingToAI });
      
        speakText("Hi, I am AI. How can I help you?");

        if (isProcessingAIRequest) {
            console.warn("⏳ Already processing an AI request");
            return;
        }
        
        if (isTalkingToAI) {
            setIsTalkingToAI(false);
            recognitionRef.current?.stop();
        } else {
            setIsTalkingToAI(true);
            recognitionRef.current?.start();
            //    return handleTalkToAI();
        }
    };
    return (
        <div className="relative inline-block">
           
            <button
                onClick={startListening}
                type="button"
                className={`
                    relative h-10 border border-gray-300 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-all
                    ${hightTalkToAI ? "animate-pulse ring-2 ring-gray-400" : ""}
                    ${isTalkingToAI ? 'w-30' : ''}
                `}
            >
                {isTalkingToAI ? (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <GlowingCircle />
                        </div>

                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTalkingToAI(false);
                                recognitionRef.current?.stop();
                            }}
                            className="absolute text-xs top-1 right-1 cursor-pointer"
                            role="button"
                            tabIndex={0}
                        >
                            ✕
                        </div>
                    </>
                ) : (
                    'Talk to AI'
                )}
            </button>
        </div>
    );
}
