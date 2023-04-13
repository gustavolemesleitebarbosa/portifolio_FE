
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import * as React from 'react';

export function Email({name,email, message }) {
  const nameTemplate = `from ${name}`;
  // const emailTemplate = `the sender email is: ${email}`;
  // const messageTemplate = `message is: ${message}`;

  return (
    <Html lang="en">
         <Text>{nameTemplate}</Text>;
         {/* <Text>{emailTemplate}</Text>;
      <Text>{messageTemplate}</Text>; */}
    </Html>
  );
}