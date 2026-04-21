"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./AboutMe.module.css";

interface Education {
  institution: string;
  degree: string;
  period: string;
  logo: string;
}

export default function AboutMe() {
  const t = useTranslations("aboutMe");

  const education: Education[] = [
    {
      institution: "Universidade Cruzeiro do Sul",
      degree: t("education.usp.degree"),
      period: "2023 - 2026",
      logo: "/images/aboutMe/ImageCruzeiro.png",
    },
    {
      institution: "Líbano",
      degree: t("education.libano.ai"),
      period: "2025 - 2026",
      logo: "/images/aboutMe/ImageLibano.svg",
    },
    {
      institution: "Líbano",
      degree: t("education.libano.bi"),
      period: "2025 - 2026",
      logo: "/images/aboutMe/ImageLibano.svg",
    },
  ];

  const techsLeft = [
    { name: "React", icon: "/images/aboutMe/Techs/ImageReact.svg" },
    { name: "Next.js", icon: "/images/aboutMe/Techs/ImageNext.svg" },
    { name: "TypeScript", icon: "/images/aboutMe/Techs/ImageTypeScript.svg" },
    { name: "JavaScript", icon: "/images/aboutMe/Techs/ImageJavaScript.svg" },
    { name: "Angular", icon: "/images/aboutMe/Techs/ImageAngular.svg" },
    { name: "Figma", icon: "/images/aboutMe/Techs/ImageFigma.svg" },
    { name: "Tailwind", icon: "/images/aboutMe/Techs/ImageTailwind.svg" },
    { name: "Behance", icon: "/images/aboutMe/Techs/ImageBehance.webp" },
  ];

  const techsRight = [
    { name: "Docker", icon: "/images/aboutMe/Techs/ImageDocker.svg" },
    { name: "Git", icon: "/images/aboutMe/Techs/ImageGit.svg" },
    { name: "AWS", icon: "/images/aboutMe/Techs/ImageAWS.svg" },
    {
      name: "Azure DevOps",
      icon: "/images/aboutMe/Techs/ImageAzureDevOps.svg",
    },
    { name: "MongoDB", icon: "/images/aboutMe/Techs/ImageMongoDb.svg" },
    { name: "PostgreSQL", icon: "/images/aboutMe/Techs/ImagePostgresql.svg" },
    { name: "Node.js", icon: "/images/aboutMe/Techs/ImageNode.svg" },
    { name: "Single SPA", icon: "/images/aboutMe/Techs/ImageSingleSPA.png" },
    { name: "Java", icon: "/images/aboutMe/Techs/ImageJava.svg" },

  ];

  return (
    <section id="aboutme" className={styles.aboutMe}>
      <div className={styles.techStripLeft}>
        <div className={`${styles.techStripContent} ${styles.scrollUp}`}>
          {techsLeft.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className={styles.techBadge}>
              <Image src={tech.icon} alt={tech.name} width={24} height={24} />
              <span>{tech.name}</span>
            </div>
          ))}
          {techsLeft.map((tech, index) => (
            <div
              key={`${tech.name}-duplicate-${index}`}
              className={styles.techBadge}
            >
              <Image src={tech.icon} alt={tech.name} width={24} height={24} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.techStripRight}>
        <div className={`${styles.techStripContent} ${styles.scrollDown}`}>
          {techsRight.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className={styles.techBadge}>
              <Image src={tech.icon} alt={tech.name} width={24} height={24} />
              <span>{tech.name}</span>
            </div>
          ))}
          {techsRight.map((tech, index) => (
            <div
              key={`${tech.name}-duplicate-${index}`}
              className={styles.techBadge}
            >
              <Image src={tech.icon} alt={tech.name} width={24} height={24} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/aboutMe/cartoon_sophya_frente.svg"
              alt="Sophya Damiazo"
              width={500}
              height={500}
              className={styles.characterImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{t("title")}</h2>
            <div className={styles.languageBadges}>
              <div className={styles.languageBadge}>
                <span className={styles.languageName}>Português</span>
                <span className={styles.languageLevel}>C2</span>
              </div>
              <div className={styles.languageBadge}>
                <span className={styles.languageName}>English</span>
                <span className={styles.languageLevel}>B2-C1</span>
              </div>
            </div>
          </div>
          <p className={styles.description}>{t("description")}</p>

          <div className={styles.educationGrid}>
            {education.map((edu, index) => (
              <div key={index} className={styles.educationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardContent}>
                    <h4 className={styles.institution}>{edu.institution}</h4>
                    <p className={styles.degree}>{edu.degree}</p>
                    <p className={styles.period}>{edu.period}</p>
                  </div>
                  <div className={styles.logoWrapper}>
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      width={40}
                      height={40}
                      className={styles.institutionLogo}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
