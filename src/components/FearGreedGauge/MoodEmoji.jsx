import React from "react";
import styles from "./MoodEmoji.module.scss";

function getEmoji(value) {
  if (value <= 25) return "😱";
  if (value <= 45) return "😬";
  if (value <= 55) return "😐";
  if (value <= 75) return "🙂";
  return "😎";
}

export default function MoodEmoji({ value }) {
  const emoji = getEmoji(value);
  return <div className={styles.emoji}>{emoji}</div>;
}
