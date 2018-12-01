import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import RoomPreviews from './RoomPreviews';
import ChatRoom from './ChatRoom';
import Login from './Login';
import NewChats from './NewChats';
import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentAppView: 'login', // login -> previews -> newChat -> chatRoom
      currentUser: {},
      otherUsers: [],
      currentRoom: {},
      availableRooms: [],
      roomMap: [],
      user: {
        id: '',
        username: '',
      },
    };

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
    this.receiveCreateUser = this.receiveCreateUser.bind(this);
    this.receiveUserLogin = this.receiveUserLogin.bind(this);
    this.loadUserChat = this.loadUserChat.bind(this);
    this.goBack = this.goBack.bind(this);
    this.receiveNewChatView = this.receiveNewChatView.bind(this);
    this.receiveRoomPreviewsView = this.receiveRoomPreviewsView.bind(this);
    this.getNewChatUser = this.getNewChatUser.bind(this);
    this.connectToChatManager = this.connectToChatManager.bind(this);
  }

  getNewChatUser(user) {
    this.state.currentUser
      .createRoom({
        name: `${this.state.currentUser.name}, ${user.name}`,
        private: false,
        addUserIds: [user.id],
      })
      .then((room) => {
        const newRoom = {
          roomId: room.id,
          roomMembers: room.users,
          otherMembers: room.users.filter((member) => member.id !== String(this.state.user.id)),
        };

        this.setState((prevState) => ({
          roomMap: prevState.roomMap.concat([newRoom]),
          currentRoom: room,
          currentAppView: 'chatRoom',
        }));
      });
  }

  updateRoomMap() {
    this.state.availableRooms.forEach((room) => {
      Promise.all(
        room.userIds.map((userId) =>
          fetch(`/api/users/${userId}`).then((response) => response.json()),
        ),
      ).then((values) => {
        const roomId = room.id;
        const roomMembers = values;
        const otherMembers = roomMembers.filter(
          (member) => member.id !== String(this.state.user.id),
        );
        const { roomMap } = this.state;
        this.setState({ roomMap: roomMap.concat([{ roomId, roomMembers, otherMembers }]) });
      });
    });
  }

  connectToChatManager() {
    this.state.chatManager
      .connect({
        onAddedToRoom: (room) => {
          const roomData = { id: room.id, userIds: room.userIds, updatedAt: room.updatedAt };
          this.setState(
            (prevState) => ({
              availableRooms: prevState.availableRooms.concat(roomData),
            }),
            () => this.updateRoomMap(),
          );
        },
      })
      .then((currentUser) => {
        const otherUsers = currentUser.users.filter((user) => user.id !== currentUser.id);
        this.setState({
          currentUser,
          availableRooms: currentUser.rooms,
          otherUsers,
        });
        return currentUser;
      })
      .then((currentUser) => {
        if (this.state.availableRooms.length === 0) {
          currentUser.joinRoom({ roomId: 19375514 });
        }
        return currentUser;
      })
      .then((currentUser) => {
        this.updateRoomMap();
        return currentUser;
      })
      .then((currentUser) => {
        Promise.all(
          this.state.availableRooms.map((room) => {
            const { id } = room;
            return new Promise((resolve) => {
              currentUser.subscribeToRoom({
                roomId: id,
                hooks: {
                  onNewMessage: (message) => {
                    resolve(message.text);
                  },
                },
                messageLimit: 1,
              });
            }).then((lastMsg) => {
              if (!lastMsg) {
                lastMsg = '';
              }
              return Object.assign({}, room, { lastMsg });
            });
          }),
        ).then((availableRooms) => {
          availableRooms.sort((a, b) => {
            const newDate1 = new Date(a.updatedAt);
            const newDate2 = new Date(b.updatedAt);
            return newDate1 > newDate2 ? -1 : newDate1 < newDate2 ? 1 : 0;
          });
          this.setState({ availableRooms });
        });
      });
  }

  loadUserChat() {
    const userId = this.state.user.id.toString();
    const chatManager = new ChatManager({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      userId,
      tokenProvider: new TokenProvider({
        url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${
          process.env.CHATKIT_INSTANCE_ID
        }/token`,
      }),
    });
    this.setState(
      {
        chatManager,
      },
      () => this.connectToChatManager(),
    );
  }

  receiveHandleCurrentRoom(currentRoom) {
    this.setState({
      currentRoom,
      currentAppView: 'chatRoom',
    });
    this.connectToChatManager();
  }

  receiveNewChatView() {
    this.setState({
      currentAppView: 'newChat',
    });
  }

  receiveRoomPreviewsView() {
    this.setState({
      currentAppView: 'previews',
    });
  }

  receiveUserLogin(user) {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          this.setState(
            {
              user: {
                id: data.id,
                username: data.username,
              },
              currentAppView: 'previews',
            },
            () => this.loadUserChat(),
          );
        }
      });
  }

  receiveCreateUser(user) {
    fetch('/api/create-user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          this.setState(
            {
              user: {
                id: data.id,
                username: data.username,
              },
              currentAppView: 'previews',
            },
            () => this.loadUserChat(),
          );
        }
      });
  }

  goBack() {
    this.setState({ currentAppView: 'previews' });
    this.connectToChatManager();
  }

  render() {
    return (
      <div className="page">
        {this.state.currentAppView === 'login' && (
          <Login
            receiveCreateUser={this.receiveCreateUser}
            receiveUserLogin={this.receiveUserLogin}
          />
        )}
        {this.state.currentAppView === 'previews' && (
          <RoomPreviews
            roomMap={this.state.roomMap}
            rooms={this.state.availableRooms}
            receiveHandleCurrentRoom={this.receiveHandleCurrentRoom}
            receiveNewChatView={this.receiveNewChatView}
          />
        )}
        {this.state.currentAppView === 'newChat' && (
          <NewChats
            otherUsers={this.state.otherUsers}
            getNewChatUser={this.getNewChatUser}
            receiveRoomPreviewsView={this.receiveRoomPreviewsView}
          />
        )}
        {this.state.currentAppView === 'chatRoom' && (
          <ChatRoom
            roomMap={this.state.roomMap}
            goBack={this.goBack}
            user={this.state.user}
            currentUser={this.state.currentUser}
            currentRoom={this.state.currentRoom}
            connectToChatManager={this.connectToChatManager}
          />
        )}
      </div>
    );
  }
}

export default App;
