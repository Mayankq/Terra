import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import {PauseCircleIcon} from "./PauseCircleIcon";
import {NextIcon} from "./NextIcon";
import {PreviousIcon} from "./PreviousIcon";
import {RepeatOneIcon} from "./RepeatOneIcon";
import {ShuffleIcon} from "./ShuffleIcon";

export default function Customer({link, para}) {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
  isBlurred
  className="border-none bg-background/60 dark:bg-default-100/50 cad"
  shadow="sm"
>
  <CardBody>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          shadow="md"
          src={link}
          width={200} // Set a fixed width or use a percentage
        />
      </div>
      <div className="flex-grow" style={{padding:"5px 5px 5px 10px"}}>
        {/* Content here will now be aligned to the right of the image */}
         <p>{para}</p>
      </div>
    </div>
  </CardBody>
</Card>
  );
}
