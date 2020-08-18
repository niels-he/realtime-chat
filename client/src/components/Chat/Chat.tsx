import React, { FC, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Row, Col, Layout, Button, Input } from 'antd';
import Messages from '../Messages/Messages';

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Chat: FC = () => {
  const [state, stateSet] = useState({
    user: 'Jack',
    content: '',
  });
  const [postMessage] = useMutation(POST_MESSAGE);
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: '',
    });
  };
  return (
    <Layout>
      <Messages user={state.user} />
      <Row>
        <Col span={4} style={{ padding: 0 }}>
          <Input
            placeholder="User"
            value={state.user}
            onChange={(evt) =>
              stateSet({
                ...state,
                user: evt.target.value,
              })
            }
          />
        </Col>
        <Col span={16}>
          <Input
            placeholder="Content"
            value={state.content}
            onChange={(evt) =>
              stateSet({
                ...state,
                content: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col span={4} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: '100%' }}>
            Send
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default Chat;
