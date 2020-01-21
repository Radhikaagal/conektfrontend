import React from "react";
import { Form, Button } from "react-bootstrap";
const Miniformprofile = props => (
  <div>
    <Form onSubmit={props.gettext}>
    <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="usname"
        placeholder="new username"
        defaultValue={props.username}
      />
      <Form.Label>Bio</Form.Label>
      <Form.Control
        type="text"
        name="bio"
        placeholder="new bio"
        defaultValue={props.bio}
      />
      <Button type="submit" variant="dark">
        Done
      </Button>
    </Form>
  </div>
);

export default Miniformprofile;
