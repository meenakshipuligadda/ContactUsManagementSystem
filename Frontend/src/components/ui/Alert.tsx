import "./Alert.css";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

function Alert({ type, message }: AlertProps) {
  if (!message) return null;
  return <div className={`alert alert-${type}`}>{message}</div>;
}

export default Alert;
