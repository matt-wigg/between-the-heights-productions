'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import reelStill from '@/public/reel-2024.jpg';
import styles from './HeroMedia.module.css';

const REEL_ID = 'M7YusauFAlU';
const YOUTUBE_ORIGIN = 'https://www.youtube.com';
const REEL_EMBED = `${YOUTUBE_ORIGIN}/embed/${REEL_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${REEL_ID}&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const PLAYING = 1;

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
    // still is what gets rendered first; the embed is added on the client.
    () => true,
  );
}

interface YouTubeMessage {
  event?: string;
  info?: number | { playerState?: number };
}

/**
 * Background media for the home hero.
 *
 * The still from the 2024 reel renders immediately (and is all that renders
 * when the visitor prefers reduced motion). A muted, looping YouTube embed
 * loads behind it and is only revealed once the player reports that it is
 * actually playing, so blocked autoplay never exposes YouTube's poster UI.
 */
export default function HeroMedia() {
  const showVideo = !usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!showVideo) return;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== YOUTUBE_ORIGIN || typeof event.data !== 'string') return;
      let data: YouTubeMessage;
      try {
        data = JSON.parse(event.data) as YouTubeMessage;
      } catch {
        return;
      }
      const state =
        data.event === 'onStateChange'
          ? data.info
          : data.event === 'infoDelivery' && typeof data.info === 'object'
            ? data.info?.playerState
            : undefined;
      if (state === PLAYING) setPlaying(true);
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [showVideo]);

  const handleLoad = () => {
    // Ask the player to stream state updates to this window.
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'listening', id: 'bth-hero', channel: 'widget' }),
      YOUTUBE_ORIGIN,
    );
  };

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
        <iframe
          ref={frameRef}
          src={REEL_EMBED}
          title="2024 Demo Reel"
          allow="autoplay; encrypted-media; picture-in-picture"
          className={`${styles.video}${playing ? ` ${styles.videoVisible}` : ''}`}
          tabIndex={-1}
          onLoad={handleLoad}
        />
      )}
      <div className={styles.shadeVertical} />
      <div className={styles.shadeHorizontal} />
    </div>
  );
}
