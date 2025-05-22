export const LineBreak = ({ text }: { text?: string }) => {
  if (!text) return null;
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </>
  );
};
