import { Component, Show } from "solid-js";
import styles from "./Card.module.css";
type CardMediaContentType = {
  image: string | undefined;
  alt: string;
};
const CardComponent: Component<{
  cardContent: string;
  cardTitle: string;
  cardActionsContent: HTMLElement | null;
  cardMediaContent?: CardMediaContentType;
}> = (props) => {
  return (
    <div class="card" style={{ width: "18rem" }}>
      <img
        src={props.cardMediaContent?.image}
        class="card-img-top"
        alt={props.cardMediaContent?.alt}
      />
      <div class="card-body">
        <h5 class="card-title">{props.cardTitle}</h5>
        <p class="card-text">{props.cardContent}</p>
        {props.cardActionsContent}
      </div>
    </div>
  );
};

export default CardComponent;
