import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/components/dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default App;
