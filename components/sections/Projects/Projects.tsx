"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import Image from "next/image";
import styles from "./Projects.module.css";

interface Project {
  id: string;
  name: string;
  descriptionKey: string;
  url: string;
  image: string;
  tags: string[];
}

export default function Projects() {
  const t = useTranslations("projects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartXRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragDeltaRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 1024 ? 1 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const projects: Project[] = [
    {
      id: "minicentralgames",
      name: "MiniCentral Games",
      descriptionKey: "minicentralgames.description",
      url: "https://minicentralgames.com.br/",
      image: "/images/projects/ImageMiniCentralGames.svg",
      tags: ["Games", "Desktop", "Mobile", "Social Games"],
    },
    {
      id: "gofoodapi",
      name: "GoFood API",
      descriptionKey: "gofoodapi.description",
      url: "https://github.com/devsophya/GoFood-API",
      image: "/images/projects/GoFoodAPI.png",
      tags: ["Java", "Spring Boot", "Mongo DB", "API REST"],
    },
    {
      id: "estequio",
      name: "Estequio",
      descriptionKey: "estequio.description",
      url: "https://estequio.com.br/",
      image: "/images/projects/ESTEQUIO - Prototipo Logo 2.svg",
      tags: ["Educação", "Gamificação", "Química", "Inclusão"],
    },
    {
      id: "workouttrackerdashboard",
      name: "Workout Tracker Dashboard",
      descriptionKey: "workouttrackerdashboard.description",
      url: "https://www.behance.net/gallery/231598775/Workout-Tracker-Dashboard",
      image: "/images/projects/WorkoutTrackerDashboard.png",
      tags: ["UI/UX", "Figma", "Dashboard", "Design"],
    },
    {
      id: "homehub",
      name: "Home Hub",
      descriptionKey: "homehub.description",
      url: "https://github.com/devsophya/Single-SPA-orquestrando-micro-front-ends",
      image: "/images/projects/HomeHub.png",
      tags: ["TypeScript", "Figma", "MFE", "Single SPA", "EJS"],
    },
    {
      id: "ignitefeed",
      name: "Ignite Feed",
      descriptionKey: "ignitefeed.description",
      url: "https://github.com/devsophya/Fundamentos-do-React.js",
      image: "/images/projects/IgniteFeed.png",
      tags: ["TypeScript", "Figma", "React", "JavaScript"],
    },
  ];

  const pages: Project[][] = [];
  for (let i = 0; i < projects.length; i += itemsPerPage) {
    pages.push(projects.slice(i, i + itemsPerPage));
  }

  const maxIndex = Math.max(pages.length - 1, 0);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Only left button should initiate dragging on mouse.
    if (e.button !== 0) return;

    isPointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    setDragOffset(0);
    activePointerIdRef.current = e.pointerId;
    isDraggingRef.current = false;
    setIsDragging(false);

    // Prevent native text selection / link-image drag interfering with our carousel drag.
    e.preventDefault();
  };

  const handleDragMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const delta = e.clientX - dragStartXRef.current;

    const activationThreshold = 8;
    if (!isDraggingRef.current && Math.abs(delta) >= activationThreshold) {
      isDraggingRef.current = true;
      setIsDragging(true);

      try {
        // Capture only after drag activation so normal taps/clicks on <a> still navigate.
        e.currentTarget.setPointerCapture(activePointerIdRef.current ?? e.pointerId);
      } catch {
        // no-op
      }
    }

    if (!isDraggingRef.current) {
      dragDeltaRef.current = 0;
      return;
    }

    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    handleDragMove(e);
  };

  const finishDrag = () => {
    if (!isPointerDownRef.current) return;

    isPointerDownRef.current = false;
    setDragOffset(0);

    // If we never activated dragging, treat as a normal click/tap.
    if (!isDraggingRef.current) {
      dragDeltaRef.current = 0;
      activePointerIdRef.current = null;
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    const threshold = 48;
    const delta = dragDeltaRef.current;
    dragDeltaRef.current = 0;
    activePointerIdRef.current = null;

    if (delta > threshold && canPrev) {
      handlePrev();
    } else if (delta < -threshold && canNext) {
      handleNext();
    }
  };

  const handlePointerUp = () => finishDrag();
  const handlePointerCancel = () => finishDrag();

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isDraggingRef.current || Math.abs(dragDeltaRef.current) > 10) {
      event.preventDefault();
    }
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.carouselWrapper}>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous project"
          >
            ‹
          </button>

          <div
            className={`${styles.carouselViewport} ${isDragging ? styles.dragging : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              }}
            >
              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className={styles.carouselSlide}>
                  {page.map((project) => (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectCard}
                      onClick={handleCardClick}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className={styles.projectImage}
                          draggable={false}
                        />
                        <div className={styles.overlay}>
                          <span
                            className={styles.visitButton}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("visitSite")} →
                          </span>
                        </div>
                      </div>

                      <div className={styles.projectContent}>
                        <h3 className={styles.projectName}>{project.name}</h3>
                        <p className={styles.projectDescription}>
                          {t(project.descriptionKey)}{" "}
                          {project.id === "estequio" && (
                            <a
                              href="https://minicentralgames.com.br/"
                              className={styles.miniCentralLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              MiniCentral Games
                            </a>
                          )}
                          {project.id === "estequio" && "."}
                        </p>

                        <div className={styles.tags}>
                          {project.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.carouselButton}
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next project"
          >
            ›
          </button>
        </div>

        <div className={styles.carouselDots}>
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              className={`${styles.carouselDot} ${pageIndex === currentIndex ? styles.activeDot : ""}`}
              onClick={() => setCurrentIndex(pageIndex)}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
