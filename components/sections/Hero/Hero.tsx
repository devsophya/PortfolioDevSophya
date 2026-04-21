"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Hero.module.css";
import MatrixRain from "./MatrixRain";
import ContributionGraph from "./ContributionGraph";

export default function Hero() {
  const t = useTranslations("hero");

  const title = t("title");

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.backgroundAnimation}>
        <MatrixRain />
        <Image
          src="/images/hero/sophya_cartoon_codando.svg"
          alt="Sophya Codando"
          width={700}
          height={700}
          priority
          className={styles.characterImage}
        />
      </div>

      <div className={styles.badgesContainer}>
        <a
          href="https://www.behance.net/sophyadamiazo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.badgeAlura}
        >
          <Image
            src="/images/hero/Behancee_logo.png"
            alt="Behance Profile"
            width={28}
            height={28}
            className={styles.behanceLogo}
          />
        </a>
        <a
          href="https://cursos.alura.com.br/user/damiazosophya"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.badgeAlura}
        >
          <Image
            src="/images/hero/Alura_logo.png"
            alt="Alura Profile"
            width={72}
            height={72}
            className={styles.aluraLogo}
          />
        </a>
      </div>

      <ContributionGraph />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
}
