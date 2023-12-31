import ReactDOM from "react-dom";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContent } from "./components/AppContent";
import "./index.scss";
import { trpc } from "./trpc";

const client = new QueryClient();

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
