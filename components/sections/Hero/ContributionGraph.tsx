"use client";

import { useState } from "react";
import styles from "./ContributionGraph.module.css";

function generateContributions() {
  const weeks = 40;
  const daysPerWeek = 7;
  const data = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < daysPerWeek; day++) {
      const level = Math.floor(Math.random() * 5);
      data.push({ week, day, level });
    }
  }
  return data;
}

export default function ContributionGraph() {
  const [contributions] = useState(generateContributions);
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.wrapper}>
      <p className={styles.graphTitle}>
        Graph - @devsophya {currentYear} Github Contribution Graph
      </p>
      <a
        href="https://github.com/devsophya"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.graphContainer}
      >
        <div className={styles.graph}>
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className={`${styles.cell} ${
                styles[`level${contribution.level}`]
              }`}
              style={{
                gridColumn: contribution.week + 1,
                gridRow: contribution.day + 1,
              }}
            />
          ))}
        </div>
      </a>
    </div>
  );
}
