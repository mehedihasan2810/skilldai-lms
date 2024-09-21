import { Message } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = (messages: Message[]) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const lastMessageRef = useRef<Message | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage !== lastMessageRef.current) {
        // New message added
        lastMessageRef.current = lastMessage;
        if (isAtBottom) {
          scrollToBottom();
        } else {
          setShowScrollButton(true);
        }
      } else if (autoScroll) {
        // Existing message updated
        scrollToBottom();
      }
    }
  }, [messages, isAtBottom, autoScroll, scrollToBottom]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const bottomThreshold = 20;
        const newIsAtBottom =
          scrollTop + clientHeight >= scrollHeight - bottomThreshold;

        setIsAtBottom(newIsAtBottom);
        setShowScrollButton(!newIsAtBottom);
        setAutoScroll(newIsAtBottom);
      }
    };

    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll, { passive: true });
      return () => current.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNewMessage = useCallback(() => {
    if (isAtBottom) {
      scrollToBottom();
    } else {
      setShowScrollButton(true);
    }
    setAutoScroll(true);
  }, [isAtBottom, scrollToBottom]);

  const handleManualScroll = () => {
    scrollToBottom();
    setAutoScroll(true);
    setShowScrollButton(false);
  };

  return {
    messagesRef,
    scrollRef,
    scrollToBottom,
    isAtBottom,
    showScrollButton,
    handleNewMessage,
    handleManualScroll,
  };
};

export const useScrollAnchor2 = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      if (isAtBottom && !isVisible) {
        messagesRef.current.scrollIntoView({
          block: "end",
        });
      }
    }
  }, [isAtBottom, isVisible]);

  useEffect(() => {
    const { current } = scrollRef;

    if (current) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement;
        const offset = 25;
        const isAtBottom =
          target.scrollTop + target.clientHeight >=
          target.scrollHeight - offset;

        setIsAtBottom(isAtBottom);
      };

      current.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      return () => {
        current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (visibilityRef.current) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          });
        },
        {
          rootMargin: "0px 0px -150px 0px",
        }
      );

      observer.observe(visibilityRef.current);

      return () => {
        observer.disconnect();
      };
    }
  });

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
};
