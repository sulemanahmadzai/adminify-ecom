import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "When will my order arrive?",
    unread: 2,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Thank you for your help!",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Suleman ahmadzai",
    lastMessage: "When will my order arrive?",
    unread: 1000,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Moiz Mehmood",
    lastMessage: "Thank you for your help!",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Suleman ahmadzai",
    lastMessage: "When will my order arrive?",
    unread: 2,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Suleman ahmadzai",
    lastMessage: "When will my order arrive?",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Suleman ahmadzai",
    lastMessage: "When will my order arrive?",
    unread: 10,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  // Add more mock chats...
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    message: "When will my order arrive?",
    timestamp: "2024-03-20T10:00:00",
  },
  {
    id: 2,
    senderId: "admin",
    message: "Your order is being processed and will be shipped within 2 days.",
    timestamp: "2024-03-20T10:05:00",
  },
  // Add more mock messages...
];

function Chat() {
  const [chats] = useState(mockChats);
  // Use setMessages so we can update messages
  const [messages, setMessages] = useState(mockMessages);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");

  // Filter chats by search
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Send message handler
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(), // unique-ish
      senderId: "admin", // or your user ID
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add to messages state
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
          <Input
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4"
          />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors",
                    selectedChat?.id === chat.id
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => setSelectedChat(chat)}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{chat.name}</p>
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground px-2 rounded-full text-xs">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedChat ? selectedChat.name : "Select a chat"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          {selectedChat ? (
            <>
              <ScrollArea className="flex-1 h-[calc(100vh-24rem)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "max-w-[80%] p-4 rounded-lg",
                        message.senderId === "admin"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-accent"
                      )}
                    >
                      <p>{message.message}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex items-center space-x-2 mt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start chatting
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Chat;
