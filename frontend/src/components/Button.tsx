interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button style={{ padding: "10px 20px", margin: "10px" }} onClick={onClick}>
      {children}
    </button>
  );
}
