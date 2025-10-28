import { useState } from "react";
import { Button } from "@aws-amplify/ui-react"; // Puedes usar los componentes de Amplify UI
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const { signOut, user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Vite + React</h1>
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
