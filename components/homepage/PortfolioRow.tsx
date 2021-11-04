import React, { useState } from "react";
import PortfolioItems from "./PortfolioItems";
import classes from "./PortfolioRow.module.css";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmazon,
  faApple,
  faTumblr,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  setDataState: (data: number) => void;
}
const PortfolioRow: React.FC<Props> = ({ setDataState }) => {
  const [activeState, setActiveState] = useState(0);
  return (
    <div className={classes.PortfolioRow}>
      <PortfolioItems
        title="Portfolio Value"
        value="$10,000"
        notSelectable={true}
        icon={<FontAwesomeIcon icon={faWallet} size="2x" />}
      />
      <PortfolioItems
        title="Amazon"
        value="$10,000"
        changeDataState={(data) => {
          setDataState(data);
          setActiveState(data);
        }}
        active={activeState === 0 && true}
        icon={<FontAwesomeIcon icon={faAmazon} size="2x" />}
      />
      <PortfolioItems
        title="Tesla"
        value="$10,000"
        changeDataState={(data) => {
          setDataState(data);
          setActiveState(data);
        }}
        icon={<FontAwesomeIcon icon={faTumblr} size="2x" />}
        active={activeState === 1 && true}
      />
      <PortfolioItems
        title="Apple"
        value="$10,000"
        changeDataState={(data) => {
          setDataState(data);
          setActiveState(data);
        }}
        icon={<FontAwesomeIcon icon={faApple} size="2x" />}
        active={activeState === 2 && true}
      />
    </div>
  );
};

export default PortfolioRow;
