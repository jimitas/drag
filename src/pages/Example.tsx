import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

const ContainerStyle: React.CSSProperties = {
  width: 500,
  height: 500,
  backgroundColor: "silver",
};

const BoxStyle: React.CSSProperties = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

type Box = {
  id: string;
  top: number;
  left: number;
};

export const Example: React.FC = () => {
  const [box1, setBox1] = React.useState<Box>({ id: "box1", top: 20, left: 20 });
  const [box2, setBox2] = React.useState<Box>({ id: "box2", top: 100, left: 100 });
  const [box3, setBox3] = React.useState<Box>({ id: "box3", top: 200, left: 200 });


  
  const [collected1, drag1, dragPreview1] = useDrag(
    {
      type: "box",
      item: { id: box1.id, top: box1.top, left: box1.left },
    },
    [box1]
  );
  const [collected2, drag2, dragPreview2] = useDrag(
    {
      type: "box",
      item: { id: box2.id, top: box2.top, left: box2.left },
    },
    [box2]
  );
  const [collected3, drag3, dragPreview3] = useDrag(
    {
      type: "box",
      item: { id: box3.id, top: box3.top, left: box3.left },
    },
    [box3]
  );

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: Box, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        if (item.id === "box1") {
          setBox1({ id: item.id, top, left });
        } else if (item.id === "box2") {
          setBox2({ id: item.id, top, left });
        } else if (item.id==="box3"){
          setBox3({ id: item.id, top, left });
        }
        return undefined;
      },
    }),
    []
  );

  return (
    <div>
      <div ref={drop} style={ContainerStyle}>
        <div ref={drag1} style={{ ...BoxStyle, top: box1.top, left: box1.left }}>
          Drag me around1
        </div>
        <div ref={drag2} style={{ ...BoxStyle, top: box2.top, left: box2.left }}>
          Drag me around2
        </div>
        <div ref={drag3} style={{ ...BoxStyle, top: box3.top, left: box3.left }}>
          Drag me around3
        </div>
      </div>
    </div>
  );
};
