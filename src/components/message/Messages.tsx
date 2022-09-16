import React from "react";
import { observer } from "mobx-react";
import Map from "../../auxiliary/Map";
import Message from "./Message";
import MessageRow from "./MessageRow";
import messageStack from "./MessageStack";
import "./Message.scss";

const Messages = observer(() => {
  return (
    <>
      {messageStack.len !== 0 && (
        <div className="MessageStack__box">
          <Map
            data={messageStack.messages}
            renderItem={(item: Message, i: number) => (
              <MessageRow key={i.toString()}>
                <p>{item.message}</p>
              </MessageRow>
            )}
          />
        </div>
      )}
    </>
  );
});

export default Messages;
