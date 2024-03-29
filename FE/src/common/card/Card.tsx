import { Component, Show } from "solid-js";
type CardMediaContentType = {
  image: string | undefined;
  alt: string;
};
const CardComponent: Component<{
  cardContent: string | HTMLElement;
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
        <h4 class="card-title">{props.cardTitle}</h4>
        <p class="card-text">{props.cardContent}</p>
        {props.cardActionsContent}
      </div>
    </div>
  );
};

export default CardComponent;
