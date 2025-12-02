import { client, xml } from "@xmpp/client";

const xmpp = client({
  service: "xmpp://jabber.at:5222",
  domain: "jabber.at",
  username: "myuser",
  password: "mypass",
});
