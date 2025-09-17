import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/style";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conservation, setConservation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUser, setOnlineUSer] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conservationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((resp) => {
            setMessages([...messages, resp.data.message]);
            updateLastMessage();
            setNewMessage("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    await axios
      .put(`${server}/conservation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((resp) => {
        console.log(resp.data.conservation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conservation/get-all-conservation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setConservation(resp.data.conservation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  useEffect(() => {
    if (seller) {
      const userId = seller._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUSer(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller._id);
    const online = onlineUser.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImages(file);

    imageSendHandler(file);
  };

  const imageSendHandler = async (e) => {
    const formData = new FormData();
    formData.append("images", e);
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conservationId", currentChat._id);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, formData)
        .then((resp) => {
          setImages();
          setMessages([...messages, resp.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conservation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };
  return (
    <div className="w-[90%] bg-white m-5 h-[79vh] rounded ">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins sticky top-0 bg-white z-30">
            All messages
          </h1>
          {conservation &&
            conservation.map((item, index) => (
              <MessageList
                data={item}
                index={index}
                key={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          setUserData={setUserData}
          online={onlineCheck}
          userData={userData}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate("");

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);
  console.log(online);

  useEffect(() => {
    setActiveStatus(online);

    const userId = data.members.find((user) => user !== me);

    const getUSer = async () => {
      try {
        const resp = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(resp.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUSer();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-2 px-3 ${
        active === index ? ` bg-[#0000000f]` : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url}`}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />

        {online ? (
          <div className="w-3 h-3 bg-green-400 rounded-full absolute top-0.5 right-0.5" />
        ) : (
          <div className="w-3 h-3 bg-[#000000e2] rounded-full absolute top-0.5 right-0.5" />
        )}
      </div>
      <div className="pl-3">
        <h1 className=" text-[18px]">{user?.name}</h1>
        <p className="text-[18px] text-[#0000008e]">
          {data.lastMessageId !== user?._id
            ? "You:"
            : (user?.name ? user.name.split(" ")[0] : "User") + ":"}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* MESSAGE HEADER */}

      <div className="w-full flex items-center justify-between bg-slate-200 p-3">
        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            className="w-[50px] h-[50px] rounded-full"
            alt=""
          />
          <div className="pl-3 ">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Active now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={25}
          onClick={() => setOpen(false)}
          cursor="pointer"
        />
      </div>

      {/* MESSAGES */}
      <div className="p-2 h-[59vh] overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <div
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              } `}
            >
              {item.sender !== sellerId && (
                <img
                  src=""
                  alt=""
                  className="w-[40px] h-[40px]  rounded-full mr-3"
                />
              )}
              {item.images && (
                <img
                  src={`${item.images}`}
                  className="w-[250px] h-[250px] object-cover rounded-[10px] mr-3"
                  alt=""
                />
              )}

              {item.text !== "" && (
                <div>
                  <div className="w-max bg-[#38c778] text-white h-min mt-1.5 p-1 rounded">
                    <p>{item.text}</p>
                  </div>
                  <p className="text-[12px] text-[#00000068] pt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* SEND MESSAGE  */}
      <form
        className="p-2 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%] cursor-pointer" size={20}>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery />
          </label>
        </div>
        <div className="w-[97%] ">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message"
            className={`${styles.input}`}
          />
          <input type="submit" value="send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-3 bottom-3 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ShopInbox;
