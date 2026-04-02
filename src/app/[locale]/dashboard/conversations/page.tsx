"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Brain } from "lucide-react";

type Channel = "all" | "whatsapp" | "instagram";

interface Message {
  id: string;
  text: string;
  sender: "customer" | "ai";
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  channel: "whatsapp" | "instagram";
  time: string;
  unread: boolean;
  phone: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Anna Schmidt",
    lastMessage: "14:00 Uhr bitte!",
    channel: "whatsapp",
    time: "vor 5 Min.",
    unread: true,
    phone: "+49 151 1234567",
    messages: [
      { id: "1a", text: "Hallo, ich möchte einen Termin buchen", sender: "customer", time: "14:30" },
      { id: "1b", text: "Hallo Anna! Gerne! Wir haben morgen um 10:00 oder 14:00 Uhr noch freie Termine. Welche Zeit passt dir besser?", sender: "ai", time: "14:30" },
      { id: "1c", text: "14:00 Uhr bitte!", sender: "customer", time: "14:32" },
      { id: "1d", text: "Perfekt! Dein Termin ist bestätigt: Morgen um 14:00 Uhr. Bis dann!", sender: "ai", time: "14:32" },
    ],
  },
  {
    id: "2",
    name: "Max Weber",
    lastMessage: "Was kostet ein Haarschnitt?",
    channel: "instagram",
    time: "vor 12 Min.",
    unread: true,
    phone: "-",
    messages: [
      { id: "2a", text: "Hey, was kostet ein Haarschnitt bei euch?", sender: "customer", time: "14:20" },
      { id: "2b", text: "Hi Max! Ein Haarschnitt kostet bei uns ab 35 Euro. Möchtest du direkt einen Termin vereinbaren?", sender: "ai", time: "14:20" },
      { id: "2c", text: "Was kostet ein Haarschnitt?", sender: "customer", time: "14:22" },
    ],
  },
  {
    id: "3",
    name: "Julia Fischer",
    lastMessage: "Danke für den tollen Service!",
    channel: "whatsapp",
    time: "vor 30 Min.",
    unread: false,
    phone: "+49 170 9876543",
    messages: [
      { id: "3a", text: "Danke für den tollen Service!", sender: "customer", time: "14:00" },
      { id: "3b", text: "Vielen Dank, Julia! Wir freuen uns, dass es dir gefallen hat. Bis zum nächsten Mal!", sender: "ai", time: "14:00" },
    ],
  },
  {
    id: "4",
    name: "Tom Müller",
    lastMessage: "Haben Sie morgen noch Termine frei?",
    channel: "whatsapp",
    time: "vor 1 Std.",
    unread: false,
    phone: "+49 162 5551234",
    messages: [
      { id: "4a", text: "Haben Sie morgen noch Termine frei?", sender: "customer", time: "13:30" },
      { id: "4b", text: "Hallo Tom! Ja, morgen haben wir noch um 9:00, 11:30 und 15:00 Uhr freie Termine. Welcher passt dir am besten?", sender: "ai", time: "13:30" },
    ],
  },
];

export default function ConversationsPage() {
  const t = useTranslations("conversations");
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const [filter, setFilter] = useState<Channel>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filtered = mockConversations.filter((c) => {
    if (filter !== "all" && c.channel !== filter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const selected = mockConversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] gap-4">
      {/* Conversation list */}
      <Card className={`w-full md:w-80 lg:w-96 shrink-0 flex flex-col ${selected ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 border-b space-y-3">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            {(["all", "whatsapp", "instagram"] as Channel[]).map((ch) => (
              <Button
                key={ch}
                variant={filter === ch ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(ch)}
                className="text-xs"
              >
                {t(ch)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`w-full flex items-center gap-3 p-4 border-b text-left hover:bg-muted/50 transition-colors ${
                selectedId === conv.id ? "bg-muted/50" : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>{conv.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{conv.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {conv.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {conv.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    conv.channel === "whatsapp"
                      ? "text-green-600 border-green-200"
                      : "text-pink-600 border-pink-200"
                  }`}
                >
                  {conv.channel === "whatsapp" ? "WA" : "IG"}
                </Badge>
                {conv.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat view */}
      {selected ? (
        <Card className={`flex-1 flex flex-col ${!selected ? "hidden md:flex" : "flex"}`}>
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setSelectedId(null)}
            >
              &larr;
            </button>
            <Avatar>
              <AvatarFallback>{selected.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{selected.name}</p>
              <p className="text-xs text-muted-foreground">
                {selected.channel === "whatsapp" ? "WhatsApp" : "Instagram"} &middot; {selected.phone}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selected.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "ai" ? "justify-end" : ""}`}
              >
                {msg.sender === "customer" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {selected.name[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === "ai"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "ai" && (
                    <div className="mt-1 flex items-center gap-1 text-xs opacity-70">
                      <Brain className="h-3 w-3" />
                      {t("aiGenerated")}
                    </div>
                  )}
                  <div className={`text-xs mt-1 ${msg.sender === "ai" ? "opacity-70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </div>
                </div>
                {msg.sender === "ai" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder={t("typeMessage")}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setNewMessage("")}
              />
              <Button size="icon" onClick={() => setNewMessage("")}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="hidden md:flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">{t("noMessages")}</p>
        </Card>
      )}
    </div>
  );
}
