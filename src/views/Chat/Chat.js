import React, { useState, useEffect } from "react";
import {
  Chat, Channel, Thread, Window, ChannelList, ChannelHeader, ChannelListMessenger, MessageList, MessageSimple, MessageInput, withChannelContext,} from "stream-chat-react";
import {Card, CardHeader, CardBody, CardFooter, CardTitle, Table, Row, Col, Input, Button,} from "reactstrap";
import { StreamChat } from "stream-chat";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "stream-chat-react/dist/css/index.css";
import { Loading } from "../../components";
import "./index.css"
import TextField from "@material-ui/core/TextField";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardRounded";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, InputAdornment } from "@material-ui/core";
const chatClient = new StreamChat("4zs4u4w9qtyk");




//EVERYTHING ABOVE THIS STAYS. EVERYTHING NOT BOILERPLATE MUST GOOOOOOOOOOO
function ChatView() {
  const [channel, setChannel] = useState(null);
  const [newChat, setNewChat] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();
  const username = user.email.replace(/([^a-z0-9_-]+)/gi, "_");

//This is it. process.env.reactblah blah blah is
//REACT_APP_CHAT_USER=http://localhost:7000/messaging
//is there any example
//I copied Viral's code right below
//can you show me his example
//See? When I use his process.env.variable it works, but mine does not!

console.log("WOW:" + username)
const combo = username + ',' + user.nickname;
const getstuff = axios.post("https://chat-server-hermes.herokuapp.com/messaging", {
    combo,
});

  useEffect(() => {

    //Gets token from useEffect
    async function getToken() {
      // var combo = username+','+user.nickname

      setLoading(true);
      let token;
      try {
        console.log(username)
        console.log(user.nickname)
        const response = await axios.post(process.env.REACT_APP_CHAT_URL, {
          username,

        });
        token = response.data.token;
      } catch (err) {
        console.log(err);
        return;
      }

      //setUser defines WHO I AM
      chatClient.setUser(
        {
          id: username,
          name: user.nickname,
        },
        token
      );

      //for company in database...
      // const channel = chatClient.channel("messaging", "landing-group1");

      const filters = { members: { $in: [username] } };
      const sort = { last_message_at: -1 };
      let channels = chatClient.queryChannels(filters, sort);

      // console.log(channels)
      setChannel(channels);
      setLoading(false);
    }

    getToken();
  }, [setLoading, user.email, user.name, user.nickname, username]);

  if (loading || !user) {
    return <Loading />;
  }

  //We need to get the company of the worker
    //1. Route to backend to serve SQL request and return coworkers
  //We need to create DM's of every coworker
    //2. Create channels with specific member lists
    //HOW DO WE LINK BETWEEN THE USERNAME OF THE USER AND THE OAUTH USER?
  //We need to create channel filter for only the worker in question
    //3. Easy


  // fetch(`/messaging?name=${encodeURIComponent('jack')}`)
  //   .then(response => response.json())
  //   .then(state => setState(state));



  //Sends the message to the desired channel
  async function handleSubmit(evt) {
    evt.preventDefault();

    const conversation = chatClient.channel("messaging", "channel-name1", {
      name: "Founder Chat",
      image: "http://bit.ly/2O35mws",
      members: [newChat],
    });

    await conversation.create();
  }

  const filters = { type: 'team', members: { $in: [username] } };
  const sort = { last_message_at: -1 };
  if (channel) {
    const CustomChannelHeader = withChannelContext(
      class CustomChannelHeader extends React.PureComponent {
        render() {
          return (
            <Card>
              <p className="str-chat__header-livestream-left--title">
                {this.props.channel.data.name}
              </p>
              <p className="str-chat__header-livestream-left--members">
                {Object.keys(this.props.members).length} members,{" "}
                {this.props.watcher_count} online
              </p>
            </Card>
          );
        }
      }
    );

    return (
      <Card style={{ paddingTop: "125px" }}>

        <Row>
          <Chat client={chatClient} theme="team light">
            <Col xs={3}>
            <form onSubmit={handleSubmit} style={{ align: "right" }}>

        </form>
              <ChannelList
                filters={filters}
                sort={sort}
                List={ChannelListMessenger}
                style= {{width: "100%"}}
              />
            </Col>
            <Col xs={9}>
              <Channel>
                <Window>
                  <ChannelHeader />
                  <MessageList Message={MessageSimple} />

                  <MessageInput />
                </Window>
                <Thread Message={MessageSimple} />
              </Channel>
            </Col>
          </Chat>
        </Row>
      </Card>
    );
  }

  return null;
}

export default ChatView;
