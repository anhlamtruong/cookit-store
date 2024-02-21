const NoResults = ({ message }: { message?: string }) => {
  return (
    <div className="flex items-center justify-center h-full w-full text-red-400">
      {message ?? "No results found (っ °Д °;)っ"}
    </div>
  );
};

export default NoResults;
