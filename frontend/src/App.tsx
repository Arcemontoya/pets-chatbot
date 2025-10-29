import { useState } from "react";
import { Button, TextField } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "./App.css";

function App() {
  const [chatName, setChatName] = useState("");
  const [chats, setChats] = useState<{ chatId: string; chatName: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const { signOut, user } = useAuthenticator((context) => [context.user]);

  // Endpoint de la API (definido en tu archivo .env)
  const API_URL = import.meta.env.VITE_CHAT_API_URL;

  const createChat = async () => {
    if (!chatName) return;
    setLoading(true);

    try {
      // ✅ Nueva forma de obtener el token en Amplify v6+
      const { tokens } = await fetchAuthSession();
      const token = tokens?.idToken?.toString();

      if (!token) {
        throw new Error("No se pudo obtener el token del usuario autenticado.");
      }

      // Enviar solicitud al endpoint de la API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatName }),
      });

      const data = await response.json();

      if (response.ok) {
        setChats((prev) => [...prev, data]);
        setChatName("");
      } else {
        console.error("Error creando chat:", data);
      }
    } catch (error) {
      console.error("Error creando chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Vite + React Chat</h1>
        <div>
          <p style={{ marginRight: "1rem", display: "inline-block" }}>
            {user?.signInDetails?.loginId || user?.username}
          </p>
          <Button variation="primary" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="card">
        <TextField
          label="Nombre del chat"
          placeholder="Escribe un nombre"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <Button onClick={createChat} isLoading={loading}>
          Crear nuevo chat
        </Button>

        <h3>Chats creados:</h3>
        <ul>
          {chats.map((chat) => (
            <li key={chat.chatId}>
              {chat.chatName} (ID: {chat.chatId})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
