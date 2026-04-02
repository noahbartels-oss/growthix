"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Brain, Phone, Smartphone, ArrowLeft } from "lucide-react";

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
    id: "1", name: "Anna Schmidt", lastMessage: "14:00 Uhr bitte!", channel: "whatsapp",
    time: "14:32", unread: true, phone: "+49 151 1234567",
    messages: [
      { id: "1a", text: "Hallo, ich möchte einen Termin buchen 💇‍♀️", sender: "customer", time: "14:30" },
      { id: "1b", text: "Hallo Anna! 👋 Gerne! Wir haben morgen um 10:00 oder 14:00 Uhr noch freie Termine. Welche Zeit passt dir besser?", sender: "ai", time: "14:30" },
      { id: "1c", text: "14:00 Uhr bitte!", sender: "customer", time: "14:32" },
      { id: "1d", text: "Perfekt! ✅ Dein Termin ist bestätigt: Morgen um 14:00 Uhr. Wir freuen uns auf dich!", sender: "ai", time: "14:32" },
    ],
  },
  {
    id: "2", name: "Max Weber", lastMessage: "Was kostet ein Haarschnitt?", channel: "instagram",
    time: "14:20", unread: true, phone: "-",
    messages: [
      { id: "2a", text: "Hey, was kostet ein Haarschnitt bei euch?", sender: "customer", time: "14:18" },
      { id: "2b", text: "Hi Max! Ein Haarschnitt kostet bei uns ab 35 €. Möchtest du direkt einen Termin vereinbaren?", sender: "ai", time: "14:18" },
      { id: "2c", text: "Was kostet ein Haarschnitt?", sender: "customer", time: "14:20" },
    ],
  },
  {
    id: "3", name: "Julia Fischer", lastMessage: "Danke für den tollen Service!", channel: "whatsapp",
    time: "14:00", unread: false, phone: "+49 170 9876543",
    messages: [
      { id: "3a", text: "Danke für den tollen Service! 🌟", sender: "customer", time: "14:00" },
      { id: "3b", text: "Vielen Dank, Julia! Das freut uns sehr 😊 Bis zum nächsten Mal!", sender: "ai", time: "14:00" },
    ],
  },
  {
    id: "4", name: "Tom Müller", lastMessage: "Haben Sie morgen noch Termine frei?", channel: "whatsapp",
    time: "13:30", unread: false, phone: "+49 162 5551234",
    messages: [
      { id: "4a", text: "Haben Sie morgen noch Termine frei?", sender: "customer", time: "13:30" },
      { id: "4b", text: "Hallo Tom! Ja, morgen haben wir noch um 9:00, 11:30 und 15:00 Uhr freie Plätze. Welcher passt dir?", sender: "ai", time: "13:30" },
    ],
  },
  {
    id: "5", name: "Lisa Braun", lastMessage: "Perfekt, bis dann!", channel: "whatsapp",
    time: "12:15", unread: false, phone: "+49 176 2223344",
    messages: [
      { id: "5a", text: "Ich möchte einen Balayage-Termin", sender: "customer", time: "12:10" },
      { id: "5b", text: "Hallo Lisa! Balayage dauert ca. 2–3 Stunden. Wir haben Donnerstag um 10:00 Uhr frei. Passt das?", sender: "ai", time: "12:10" },
      { id: "5c", text: "Ja, das passt!", sender: "customer", time: "12:14" },
      { id: "5d", text: "Super! Donnerstag 10:00 Uhr ist eingetragen ✅", sender: "ai", time: "12:14" },
      { id: "5e", text: "Perfekt, bis dann!", sender: "customer", time: "12:15" },
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
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selected = mockConversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4 -m-4 sm:-m-6 p-0">

      {/* ── Conversation list ─────────────────────────── */}
      <div className={`flex flex-col bg-card border-r border-border/50 w-full md:w-72 lg:w-80 shrink-0 ${selected ? "hidden md:flex" : "flex"}`}>
        {/* header */}
        <div className="px-4 pt-5 pb-3 border-b border-border/50 space-y-3">
          <h2 className="text-base font-semibold">{t("title")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-8 h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* filter tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
            {(["all", "whatsapp", "instagram"] as Channel[]).map((ch) => (
              <button
                key={ch}
                onClick={() => setFilter(ch)}
                className={`flex-1 text-xs py-1 rounded-md font-medium transition-all ${
                  filter === ch
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(ch)}
              </button>
            ))}
          </div>
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-border/40 text-left transition-colors ${
                selectedId === conv.id
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-muted/40"
              }`}
            >
              <div className="relative shrink-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={`text-xs font-semibold ${
                    selectedId === conv.id ? "bg-primary/20 text-primary" : "bg-muted"
                  }`}>
                    {conv.name[0]}
                  </AvatarFallback>
                </Avatar>
                {/* channel dot */}
                <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card flex items-center justify-center ${
                  conv.channel === "whatsapp" ? "bg-green-500" : "bg-gradient-to-br from-pink-500 to-purple-600"
                }`}>
                  {conv.channel === "whatsapp"
                    ? <Phone className="h-1.5 w-1.5 text-white" />
                    : <Smartphone className="h-1.5 w-1.5 text-white" />
                  }
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-sm truncate ${conv.unread ? "font-semibold" : "font-medium"}`}>
                    {conv.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread && (
                <span className="shrink-0 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat view ────────────────────────────────── */}
      {selected ? (
        <div className={`flex-1 flex flex-col bg-card ${!selected ? "hidden md:flex" : "flex"}`}>
          {/* chat header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/50 bg-card/80 backdrop-blur-sm">
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setSelectedId(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                {selected.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                  selected.channel === "whatsapp" ? "bg-green-500" : "bg-pink-500"
                }`} />
                {selected.channel === "whatsapp" ? "WhatsApp" : "Instagram"}
                {selected.phone !== "-" && ` · ${selected.phone}`}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1 rounded-full font-medium">
              <Brain className="h-3 w-3" />
              KI aktiv
            </div>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
            style={{ background: "radial-gradient(ellipse at top, rgba(124,58,237,0.03) 0%, transparent 60%)" }}
          >
            {selected.messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 animate-slide-right`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {msg.sender === "customer" && (
                  <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                    <AvatarFallback className="text-[10px] font-bold bg-muted">
                      {selected.name[0]}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex flex-col gap-0.5 max-w-[72%] ${msg.sender === "ai" ? "ml-auto items-end" : "items-start"}`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "ai"
                      ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1.5 text-[10px] text-muted-foreground px-1 ${msg.sender === "ai" ? "flex-row-reverse" : ""}`}>
                    <span>{msg.time}</span>
                    {msg.sender === "ai" && (
                      <span className="flex items-center gap-1 text-primary/70">
                        <Brain className="h-2.5 w-2.5" />
                        {t("aiGenerated")}
                      </span>
                    )}
                  </div>
                </div>

                {msg.sender === "ai" && (
                  <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                    <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* input */}
          <div className="px-4 py-3 border-t border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex gap-2 items-center">
              <Input
                placeholder={t("typeMessage")}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setNewMessage(""); } }}
                className="h-10 text-sm"
              />
              <Button
                size="icon"
                className="h-10 w-10 shrink-0 shadow-md shadow-primary/20"
                onClick={() => setNewMessage("")}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground text-center">
              <Brain className="inline h-2.5 w-2.5 mr-1" />
              KI beantwortet eingehende Nachrichten automatisch
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center text-muted-foreground">
            <MessageSquareIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Gespräch auswählen</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageSquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
