import Image from "next/image";
import Link from "next/link";

import DanPhoto from "@/public/dan_photo.jpg";
import style from "./page.module.css";

export default function Home() {
  return (
    <section>
      <h1>
        <div className={style.brandTitle}>Between The Heights</div>
        <div className={style.brandSubTitle}>Productions</div>
      </h1>
      <hr />
      <h2 className={style.danTitles}>Editing - Directing - Videography</h2>
      <div className={style.danProfile}>
        <div className={style.danImage}>
          <Image
            className={style.danImage}
            src={DanPhoto}
            alt="Daniel DuVall"
            fill
            placeholder="blur"
          />
        </div>
        <div className={style.danLinks}>
          <Link
            className={style.linkedin}
            href="https://www.linkedin.com/in/daniel-duvall-47384913b/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={style.linkText}>
              <div className={style.text}>LinkedIn</div>
              <div className={style.icon}>↗</div>
            </div>
          </Link>
          <Link
            className={style.youtube}
            href="https://www.youtube.com/channel/UCM9fIG9SMJaTTtRhKxxtVaA"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={style.linkText}>
              <div>YouTube</div>
              <div>↗</div>
            </div>
          </Link>
          <Link
            className={style.vimeo}
            href="https://vimeo.com/user48513860"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={style.linkText}>
              <div>Vimeo</div>
              <div>↗</div>
            </div>
          </Link>
        </div>
      </div>
      <hr />
      <div>
        <div style={{ paddingTop: "56.25%", position: "relative" }}>
          <iframe
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/M7YusauFAlU?si=7ND7keTm1iT3yVgc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p>
          Daniel DuVall is <i>(not a Horse, but)</i> a{" "}
          <a href="/productions">
            <b>film / video</b>
          </a>{" "}
          editor and director based in Southern California.
        </p>
        <p>
          Daniel received a Bachelor of Science in Digital Filmmaking & Video
          Production from the Art Institute of Pittsburgh, and has experience
          creating short films, music videos, web series, and branded commercial
          content. His music video for the song &quot;Uptown Party&quot; by The
          Faintest Glow was featured by &quot;Music From the 412&quot; in
          Pittsburgh, PA.
        </p>
      </div>
      <video autoPlay muted loop id="bth-home-reel">
        <source
          src="https://static.videezy.com/system/resources/previews/000/044/479/original/banana.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
