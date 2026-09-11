'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import reelStill from '@/public/reel-2024.jpg';
import styles from './HeroMedia.module.css';

const REEL_ID = 'M7YusauFAlU';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const IFRAME_API = 'https://www.youtube.com/iframe_api';

/* Minimal typing for the parts of the YouTube IFrame Player API we use. */
interface YTPlayer {
  mute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
}

interface YTStateEvent {
  data: number;
  target: YTPlayer;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: YTStateEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

/** Load the IFrame Player API once and resolve with the `YT` namespace. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    if (!document.querySelector(`script[src="${IFRAME_API}"]`)) {
      const script = document.createElement('script');
      script.src = IFRAME_API;
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    // On the server (and during hydration) assume reduced motion so the
    // still is what gets rendered first; the player is added on the client.
    () => true,
  );
}

/**
 * Background media for the home hero.
 *
 * The still from the 2024 reel renders immediately (and is all that renders
 * when the visitor prefers reduced motion). A muted YouTube player is created
 * behind it through the IFrame Player API, sized to cover the hero at any
 * aspect ratio, and only revealed while it is actually playing. Whenever the
 * player stops (blocked autoplay, pause, end of video) the still takes over
 * again and playback is restarted, so YouTube's play button and overlays are
 * never on screen.
 */
export default function HeroMedia() {
  const showVideo = !usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showVideo || !mountRef.current) return;

    let player: YTPlayer | null = null;
    let cancelled = false;

    // The API replaces the target element with the iframe, so give it a
    // child to consume and keep our mount node for styling.
    const target = document.createElement('div');
    mountRef.current.appendChild(target);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      const { PlayerState } = YT;

      player = new YT.Player(target, {
        videoId: REEL_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: REEL_ID,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: ({ target: p }) => {
            p.mute();
            p.playVideo();
          },
          onStateChange: ({ data, target: p }) => {
            if (data === PlayerState.PLAYING) {
              setPlaying(true);
            } else if (data === PlayerState.ENDED) {
              setPlaying(false);
              p.seekTo(0, true);
              p.playVideo();
            } else if (
              data === PlayerState.PAUSED ||
              data === PlayerState.UNSTARTED ||
              data === PlayerState.CUED
            ) {
              // Anything but playing/buffering hides the player so YouTube's
              // poster and play button never show, then nudges it to play.
              setPlaying(false);
              p.mute();
              p.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      setPlaying(false);
      player?.destroy();
      target.remove();
    };
  }, [showVideo]);

  return (
    <div className={styles.media} aria-hidden="true">
      <Image
        src={reelStill}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className={`${styles.still}${playing ? ` ${styles.stillHidden}` : ''}`}
      />
      {showVideo && (
        <div
          ref={mountRef}
          className={`${styles.frame}${playing ? ` ${styles.frameVisible}` : ''}`}
        />
      )}
      <div className={styles.shadeVertical} />
      <div className={styles.shadeHorizontal} />
    </div>
  );
}
