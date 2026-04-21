"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import styles from "./Works.module.css";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  logo: string;
  descriptionKey: string;
  companyDescriptionKey: string;
  impactsKey: string[];
  keywordsKey: string[];
}

export default function Works() {
  const t = useTranslations("works");
  const locale = useLocale();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Scroll to the end (most recent experience) on mount
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, []);

  const getLocalizaDuration = (startDate: Date) => {
    const now = new Date();
    const months =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());

    if (months < 1)
      return locale === "pt"
        ? "< 1 mês"
        : locale === "es"
          ? "< 1 mes"
          : locale === "fr"
            ? "< 1 mois"
            : locale === "it"
              ? "< 1 mese"
              : locale === "ja"
                ? "< 1ヶ月"
                : locale === "zh"
                  ? "< 1个月"
                  : "< 1 mo";
    if (months === 1)
      return locale === "pt"
        ? "1 mês"
        : locale === "es"
          ? "1 mes"
          : locale === "fr"
            ? "1 mois"
            : locale === "it"
              ? "1 mese"
              : locale === "ja"
                ? "1ヶ月"
                : locale === "zh"
                  ? "1个月"
                  : "1 mo";
    if (months < 12) {
      const suffix =
        locale === "pt"
          ? "meses"
          : locale === "es"
            ? "meses"
            : locale === "fr"
              ? "mois"
              : locale === "it"
                ? "mesi"
                : locale === "ja"
                  ? "ヶ月"
                  : locale === "zh"
                    ? "个月"
                    : "mos";
      return `${months} ${suffix}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const yearSuffix =
      locale === "pt"
        ? years === 1
          ? "ano"
          : "anos"
        : locale === "es"
          ? years === 1
            ? "año"
            : "años"
          : locale === "fr"
            ? years === 1
              ? "an"
              : "ans"
            : locale === "it"
              ? years === 1
                ? "anno"
                : "anni"
              : locale === "ja"
                ? "年"
                : locale === "zh"
                  ? "年"
                  : years === 1
                    ? "yr"
                    : "yrs";
    if (remainingMonths === 0) return `${years} ${yearSuffix}`;
    return `${years}.${remainingMonths} ${yearSuffix}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    timelineRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const experiences: Experience[] = [
    {
      id: "novorumo",
      company: "Covre",
      role: t("novorumo.role"),
      period: t("novorumo.period"),
      duration: t("novorumo.duration"),
      location: "São Paulo, Brasil · Full-time",
      type: t("novorumo.type"),
      logo: "/images/works/ImageCovre.webp",
      descriptionKey: "novorumo.description",
      companyDescriptionKey: "novorumo.companyDescription",
      impactsKey: ["novorumo.impact1", "novorumo.impact2", "novorumo.impact3"],
      keywordsKey: [
        "novorumo.keyword1",
        "novorumo.keyword2",
        "novorumo.keyword3",
        "novorumo.keyword4",
        "novorumo.keyword5",
        "novorumo.keyword6",
        "novorumo.keyword7",
        "novorumo.keyword8",
      ],
    },
    {
      id: "zf",
      company: "Nuvox",
      role: t("zf.role"),
      period: t("zf.period"),
      duration: t("zf.duration"),
      location: "São Paulo, Brasil · Híbrida",
      type: t("zf.type"),
      logo: "/images/works/ImageNuvox.png",
      descriptionKey: "zf.description",
      companyDescriptionKey: "zf.companyDescription",
      impactsKey: ["zf.impact1", "zf.impact2"],
      keywordsKey: [
        "zf.keyword1",
        "zf.keyword2",
        "zf.keyword3",
        "zf.keyword4",
        "zf.keyword5",
        "zf.keyword6",
        "zf.keyword7",
        "zf.keyword8",
        "zf.keyword9",
        "zf.keyword10",
        "zf.keyword11",
        "zf.keyword12",
        "zf.keyword13",
        "zf.keyword14",
        "zf.keyword15",
        "zf.keyword16",
        "zf.keyword17",
        "zf.keyword18",
        "zf.keyword19",
        "zf.keyword20",
        "zf.keyword21",
        "zf.keyword22",
        "zf.keyword23",
        "zf.keyword24",
        "zf.keyword25",
        "zf.keyword26",
        "zf.keyword27",
      ],
    },
    {
      id: "ituran",
      company: "Develcode",
      role: t("ituran.role"),
      period: t("ituran.period"),
      duration: t("ituran.duration"),
      location: "São Paulo, Brasil · Remota",
      type: t("ituran.type"),
      logo: "/images/works/ImageDevelcode.png",
      descriptionKey: "ituran.description",
      companyDescriptionKey: "ituran.companyDescription",
      impactsKey: ["ituran.impact1", "ituran.impact2"],
      keywordsKey: [
        "ituran.keyword1",
        "ituran.keyword2",
        "ituran.keyword3",
        "ituran.keyword4",
        "ituran.keyword5",
        "ituran.keyword6",
        "ituran.keyword7",
        "ituran.keyword8",
        "ituran.keyword9",
        "ituran.keyword10",
        "ituran.keyword11",
        "ituran.keyword12",
        "ituran.keyword13",
        "ituran.keyword14",
        "ituran.keyword15",
        "ituran.keyword16",
        "ituran.keyword17",
        "ituran.keyword18",
        "ituran.keyword19",
        "ituran.keyword20",
        "ituran.keyword21",
        "ituran.keyword22",
        "ituran.keyword23",
        "ituran.keyword24",
        "ituran.keyword25",
        "ituran.keyword26",
        "ituran.keyword27",
        "ituran.keyword28",
        "ituran.keyword29",
        "ituran.keyword30",
      ],
    },
    {
      id: "localiza",
      company: "MiniCentral Games",
      role: t("localiza.role"),
      period: t("localiza.period"),
      duration: t("localiza.duration"),
      location: "São Paulo, Brasil · Remota",
      type: t("localiza.type"),
      logo: "/images/works/ImageMiniCentral.jpg",
      descriptionKey: "localiza.description",
      companyDescriptionKey: "localiza.companyDescription",
      impactsKey: ["localiza.impact1", "localiza.impact2"],
      keywordsKey: [
        "localiza.keyword1",
        "localiza.keyword2",
        "localiza.keyword3",
        "localiza.keyword4",
        "localiza.keyword5",
        "localiza.keyword6",
        "localiza.keyword7",
        "localiza.keyword8",
        "localiza.keyword9",
        "localiza.keyword10",
        "localiza.keyword11",
        "localiza.keyword12",
        "localiza.keyword13",
        "localiza.keyword14",
        "localiza.keyword15",
        "localiza.keyword16",
        "localiza.keyword17",
        "localiza.keyword18",
        "localiza.keyword19",
        "localiza.keyword20",
        "localiza.keyword21",
        "localiza.keyword22",
        "localiza.keyword23",
        "localiza.keyword24",
        "localiza.keyword25",
        "localiza.keyword26",
        "localiza.keyword27",
      ],
    },
    {
      id: "g2",
      company: "G2",
      role: t("g2.role"),
      period: t("g2.period"),
      duration: getLocalizaDuration(new Date(2025, 8, 1)),
      location: "São Paulo, Brasil · Remota",
      type: t("g2.type"),
      logo: "/images/works/ImageG2.jpg",
      descriptionKey: "g2.description",
      companyDescriptionKey: "g2.companyDescription",
      impactsKey: ["g2.impact1", "g2.impact2"],
      keywordsKey: [
        "g2.keyword1",
        "g2.keyword2",
        "g2.keyword3",
        "g2.keyword4",
        "g2.keyword5",
        "g2.keyword6",
      ],
    },
  ];

  return (
    <section id="works" className={styles.works}>
      <div className={styles.container}>
        <div className={styles.experienceCounter}>
          <span className={styles.counterNumber}>+3</span>
          <span className={styles.counterLabel}>{t("yearsOfExperience")}</span>
        </div>

        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div
          className={styles.timeline}
          ref={timelineRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.timelineLine}></div>

          {experiences.map((exp, index) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.experienceCard}>
                <div className={styles.durationBadge}>{exp.duration}</div>
                <div className={styles.logoWrapper}>
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={80}
                    height={80}
                    className={styles.companyLogo}
                  />
                </div>
                <div className={styles.experienceInfo}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                </div>
                <p className={styles.period}>{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
