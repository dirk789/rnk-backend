import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Spin />
  </div>
);

export { Loading };
