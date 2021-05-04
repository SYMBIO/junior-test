import React, { useCallback, useEffect, useRef, useState } from "react";
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {debounce} from 'throttle-debounce'
import Card, { CardProps } from "../Card/Card";
import styles from './Slider.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface SliderProps {
  cards: CardProps[];
}

const itemWidth = 340;

const Slider = ({ cards }: SliderProps) => {
  const [currentItem, setCurrentItem] = useState(0);

  const onNext = useCallback(() => {
    setCurrentItem((currentItem) =>
      Math.min(currentItem + 1, cards.length - 4)
    );
  }, []);

  const onPrevious = useCallback(() => {
    setCurrentItem((currentItem) => Math.max(currentItem - 1, 0));
  }, []);

  const scrollRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (scrollRef.current) {
      // window.scrollRef = scrollRef.current;
      scrollRef.current.scrollLeft = currentItem * itemWidth;
    }
  }, [currentItem]);

  const onScroll = useCallback(debounce(500, false, () => {
    if (scrollRef.current) {
      const newItem = Math.round(scrollRef.current.scrollLeft / itemWidth);
      setCurrentItem((currentItem) => newItem);
    }
  }), []);

  return (
    <div className={styles.slider}>
      {/*<style scoped>{`*/}
      {/*  .${styles.item}:nth-child(${currentItem + 4}) ~ .${styles.item} {*/}
      {/*    opacity: ${scrollRef.current?.scrollLeft === 0 ? 0 : 1};*/}
      {/*  }*/}
      {/*`}</style>*/}
      <div className={styles.scrollWrapper} ref={scrollRef} onScroll={onScroll}>
        <div className={styles.items}>
          {cards.map((card, i) => (
            <Card {...card} key={i} className={styles.item} />
          ))}
        </div>
      </div>
      <button className={styles.btnPrev} onClick={onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className={styles.btnNext} onClick={onNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Slider;
