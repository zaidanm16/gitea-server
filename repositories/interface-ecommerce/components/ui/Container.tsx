interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
};

export default Container;
