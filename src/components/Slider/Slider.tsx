import React from "react";
import Card, { CardProps } from "../Card/Card";
import styles from "./Slider.module.scss";

export interface SliderProps {
  cards: CardProps[];
}

const Slider = ({ cards }: SliderProps) => (
  <div className={styles.slider}>
    {cards.map((card) => (
      <Card {...card} />
    ))}
  </div>
);

export default Slider;
