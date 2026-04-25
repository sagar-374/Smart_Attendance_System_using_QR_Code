import React, { useEffect, useState } from "react";
import api from "../api/api";

function TestBackend() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/test")
      .then(res => setMsg(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h2>{msg}</h2>;
}

export default TestBackend;
