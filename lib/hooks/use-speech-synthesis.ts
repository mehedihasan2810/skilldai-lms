import { useState, useCallback, useEffect } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (content: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  voices: SpeechSynthesisVoice[];
}

export function useSpeechSynthesis(voiceIndex = 2): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voicesArray = speechSynthesis.getVoices();
      setVoices(voicesArray);
    };

    // Load voices immediately if available
    loadVoices();

    // Add event listener for when voices are changed/loaded
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((content: string) => {
    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    
    if (voices.length > voiceIndex) {
      utterance.voice = voices[voiceIndex];
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [voices, voiceIndex]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return { speak, stop, isSpeaking, voices };
}