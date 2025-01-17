import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import update from "immutability-helper";
import TopBar from "../../components/TopBar";
import MapPin from "./MapPin";

const ItemType = {
  PIN: "pin",
};

function DraggablePin({ id, index, movePin, title, editMode, pinNo }) {
  const [, ref] = useDrag({
    type: ItemType.PIN,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType.PIN,
    hover(item) {
      if (item.index !== index) {
        movePin(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop}>
      <MapPin title={title} editMode={editMode} pinNo={pinNo} dragRef={ref} />
    </div>
  );
}

function PinOrder() {
  const [pins, setPins] = useState([
    { id: 1, title: "Pin 1", pinNo: 1 },
    { id: 2, title: "Pin 2", pinNo: 2 },
    { id: 3, title: "Pin 3", pinNo: 3 },
  ]);

  const movePin = (fromIndex, toIndex) => {
    const updatedPins = update(pins, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, pins[fromIndex]],
      ],
    });
    setPins(updatedPins);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={isMobile ? { enableMouseEvents: true } : undefined}
    >
      {/* dummy */}
      <div>
        <TopBar state={"Change pins order"} />
        <div className="pinSpace">
          {pins.map((pin, index) => (
            <DraggablePin
              key={pin.id}
              id={pin.id}
              index={index}
              movePin={movePin}
              title={pin.title}
              editMode={true}
              pinNo={pin.pinNo}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default PinOrder;
